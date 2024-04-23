import { useEffect, useState } from 'react';
import { Account, Contract, DeclareContractResponse, InvokeFunctionResponse,RPC,constants } from "starknet";

import { useStoreBlock } from "../Block/blockContext";
import { useStoreWallet } from '../ConnectWallet/walletContext';

import { Text, Button, Center, Spinner, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { test1Abi } from "../../../contracts/abis/test1";
import TransactionStatus from '../Transaction/TransactionStatus';

const contractAddress = "0x6713161c85c2063aaf601690daa2bf9362b8aa00266e246b3839a92c878b5f7";

export default function PlayWithCairo1() {
    // wallet context
    const accountWalletFromContext = useStoreWallet(state => state.accountW);
    const providerW = useStoreWallet(state => state.providerW);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // Component context
    const [balance, setBalance] = useState<number>(0);
    const [transactionHash, setTransactionHash] = useState<string>("");

    const [cairo1ReadContract, setcairo1Contract] = useState<Contract>(new Contract(test1Abi, contractAddress, providerW));

    useEffect(() => {
        cairo1ReadContract.get_balance()
            .then((resp: bigint) => {
                console.log("resp =", resp)
                setBalance(Number(resp));
            })
            .catch((e: any) => { console.log("error get_balance =", e) });
        return () => { }
    }
        , [blockFromContext.block_number]); // balance updated at each block

    function increaseBalance() {
        console.log("increase-Cairo1ReadContract=", cairo1ReadContract.functions);
        const call = cairo1ReadContract.populate("increase_counter", [10]);
        console.log("Call=", call);
        accountWalletFromContext?.execute(call, undefined, {version:3})
            .then((resp: InvokeFunctionResponse) => {
                console.log("increaseBalance txH =", resp.transaction_hash)
                setTransactionHash(resp.transaction_hash);
            })
            .catch((e: any) => { console.log("error increase balance =", e) });
    }

    return (
        <Box bg='mediumaquamarine' color='black' borderWidth='1px' borderRadius='md' paddingBottom='3px'>
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
                                        increaseBalance();
                                    }}
                                >
                                    Increase balance (+10)
                                </Button>
                            </Center>
                        </div>
                        {!!transactionHash && (
                            <Box bg='green.300' color='black' borderWidth='1px' borderColor='green.800' borderRadius='md' p={1} marginTop={2}>
                                <Text className={styles.text1}>Transaction version 3.</Text>
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
