import { useState } from 'react';
import { type Call } from "starknet";

import { Text, Button, Center, Spinner, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { test1Abi } from "../../../contracts/abis/counter-abi";
import TransactionStatus from '../Transaction/TransactionStatus';
import { addrTestContract } from '@/utils/constants';
import { useContract, useReadContract, useSendTransaction } from '@starknet-react/core';

export default function PlayWithCairo1() {
    const [transactionHash, setTransactionHash] = useState<string>("");

    const { contract } = useContract({ abi: test1Abi, address: addrTestContract });
    const { sendAsync, data, status, isSuccess } = useSendTransaction({ calls: [] });

    async function increaseBalance() {
        if (contract) {
            const myCall: Call = contract.populate("increase_counter", [10]);
            const response = await sendAsync([myCall]);
            console.log({ response, data, status, isSuccess });
            setTransactionHash(response.transaction_hash);
        }
    }

    const { data: balance } = useReadContract({
        address: addrTestContract,
        abi: test1Abi,
        functionName: "get_balance",
        args: [],
        watch: true,
    });
    console.log({ balance });


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
                                    px={2}
                                    variant={'surface'}
                                    fontWeight='bold'
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
                            <Box
                                bg='green.300'
                                color='black'
                                borderWidth='1px'
                                borderColor='green.800'
                                borderRadius='md'
                                p={1}
                                margin={2}
                            >
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
