"use client";

import { Text, Center, Spinner, } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import { useAccount, useBalance } from '@starknet-react/core';

type Props = { tokenAddress: `0x${string}` };

export default function GetBalance({ tokenAddress }: Props) {
    const { address } = useAccount();
    const { data } = useBalance({
        token: tokenAddress,
        address,
        watch: true,
    });
    const balance = data?.formatted;
    const symbol = data?.symbol;

    return (
        <>
            {
                typeof balance == "undefined" ? (
                    <>
                        <Center>
                            <Spinner color="blue" size="sm" mr={4} />  Fetching data ...
                        </Center>
                    </>
                ) : (
                    <>
                        <Text className={styles.text1}>Balance = {balance} {symbol} </Text>
                    </>
                )
            }
        </>
    )
}
