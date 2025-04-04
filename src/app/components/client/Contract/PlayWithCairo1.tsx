import { useEffect, useState } from 'react';
import { CallData, Contract, InvokeFunctionResponse, RpcProvider, type Abi, type DeployContractUDCResponse, type GetTransactionReceiptResponse } from "starknet";

import { useStoreBlock } from "../Block/blockContext";
import { useStoreWallet } from '../ConnectWallet/walletContext';

import { Text, Button, Center, Spinner, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { test1Abi } from "../../../contracts/abis/test1";
import TransactionStatus from '../Transaction/TransactionStatus';
import { addrTESTCONTRACT } from '@/type/constants';
import { useFrontendProvider } from '../provider/providerContext';
import { myFrontendProviders } from '@/utils/constants';

const contractAddress = addrTESTCONTRACT;

export default function PlayWithCairo1() {
    const contractClass = "0x025a178bc9ace058ab1518392780610665857dfde111e1bed4d69742451bc61c" as const;
    // wallet context
    const walletAccountFromContext = useStoreWallet(state => state.myWalletAccount);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // provider context
    const currentFrontendProviderIndex = useFrontendProvider(state => state.currentFrontendProviderIndex);
    const readProvider = myFrontendProviders[currentFrontendProviderIndex];

    // Component context
    const [balance, setBalance] = useState<number>(0);
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [_transactionResult, setTransactionResult] = useState<GetTransactionReceiptResponse | undefined>(undefined);

    const [cairo1Contract, _setCairo1Contract] = useState<Contract>(new Contract(test1Abi, contractAddress, walletAccountFromContext));
    const [contractAbi, setContractAbi] = useState<Abi>([""]);

    async function deployContract() {
        console.log("deploy in progress...");
        if (walletAccountFromContext){
            const contractCallData=new CallData(contractAbi);
            const constructorCalldata=contractCallData.compile(
                "constructor",{
                    creator:"0x123456",
                    factory: "0x4567",
                    title: "Zorg is back",
                    description: "e-beggar",
                    ip_metadata:"addr/addr2",
                    signers:["0x456","567"],
                }
            );
            walletAccountFromContext.deployContract({
                classHash: contractClass,
                constructorCalldata: constructorCalldata
                }).then(
                    async (resp: DeployContractUDCResponse) => {
                        console.log("deploy performed with txH =", resp.classHash);
                        console.log("deployed at =", resp.address);
                        setTransactionHash(resp.transaction_hash);
                        setTransactionResult(await walletAccountFromContext.waitForTransaction(resp.transaction_hash));
                    }
                )
                .catch((e: any) => { console.log("error deploy =", e) });

        }
     }

    useEffect(() => {
        cairo1Contract.get_balance()
            .then((resp: bigint) => {
                console.log("resp =", resp)
                setBalance(Number(resp));
            })
            .catch((e: any) => { console.log("error get_balance =", e) });
        return () => { }
    }
        , [blockFromContext.block_number]); // balance updated at each block

    useEffect(() => {
        readProvider.getClassByHash(contractClass)
            .then((resp) => {
                console.log("resp abi =", resp.abi)
                setContractAbi(resp.abi as Abi);
            })
            .catch((e: any) => { console.log("error get abi =", e) });
        return () => { }

    }
        , []
    )


    return (
        <Box
            bg='mediumaquamarine'
            color='black'
            borderWidth='1px'
            borderRadius='md'
            paddingBottom='3px'
            marginBottom={20}
        >
            {
                !balance ? (
                    <Center>
                        <Spinner color="blue" size="sm" />  _Fetching data ...
                    </Center>
                ) : (
                    <>
                        <div>
                            <Text className={styles.text1}>Balance = {balance} tokens</Text>
                            <Center>
                                <Button
                                    ml="4"
                                    textDecoration="none !important"
                                    outline="none !important"
                                    boxShadow="none !important"
                                    bg='green.100'
                                    onClick={() => {
                                        deployContract();
                                    }}
                                >
                                    deploy contract
                                </Button>
                            </Center>
                        </div>
                        {!!transactionHash && (
                            <Box bg='green.300' color='black' borderWidth='1px' borderColor='green.800' borderRadius='md' p={1} margin={2}>

                                <TransactionStatus transactionHash={transactionHash}></TransactionStatus>
                            </Box>
                        )
                        }
                    </>
                )
            }
        </Box>
    )
}
