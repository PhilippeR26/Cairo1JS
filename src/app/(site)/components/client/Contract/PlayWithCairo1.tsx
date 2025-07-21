import { useEffect, useState } from 'react';
import { Contract, InvokeFunctionResponse, type GetTransactionReceiptResponse } from "starknet";

import { useStoreBlock } from "../Block/blockContext";
import { useStoreWallet } from '../ConnectWallet/walletContext';

import { Text, Center, Spinner, Box, Button } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { test1Abi } from "../../../contracts/abis/test1";
import TransactionStatus from '../Transaction/TransactionStatus';
import { addrTESTCONTRACT } from '@/type/constants';

const contractAddress = addrTESTCONTRACT;

export default function PlayWithCairo1() {
    // wallet context
    const walletAccountFromContext = useStoreWallet(state => state.myWalletAccount);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // Component context
    const [balance, setBalance] = useState<number>(0);
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [_transactionResult, setTransactionResult] = useState<GetTransactionReceiptResponse | undefined>(undefined);

    const [cairo1Contract, _setcairo1Contract] = useState<Contract>(new Contract(test1Abi, contractAddress, walletAccountFromContext));

    async function increaseBalance() {
        console.log("increase-Cairo1ReadContract=", cairo1Contract.functions);
        const myCall = cairo1Contract.populate("increase_counter", [10]);
        console.log("Call=", myCall);
        walletAccountFromContext?.execute(myCall)
            .then(async (resp: InvokeFunctionResponse) => {
                console.log("increaseBalance txH =", resp.transaction_hash);
                setTransactionHash(resp.transaction_hash);
                setTransactionResult(await walletAccountFromContext.waitForTransaction(resp.transaction_hash));
            })
            .catch((e: any) => { console.log("error increase balance =", e) });
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
        , [blockFromContext.block_number, cairo1Contract]); // balance updated at each block


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
                                    variant="surface"
                                    mb="2"
                                    px="4"
                                    fontWeight='bold'
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
