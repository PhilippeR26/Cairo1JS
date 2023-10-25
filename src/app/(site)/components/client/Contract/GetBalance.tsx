"use client";

import { useEffect, useState } from 'react';
import { Contract, uint256, shortString } from "starknet";

import { useStoreBlock } from "../../server/blockContext";

import { Text, Center, Spinner, } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { useStoreBackend } from '../../server/backEndStarknetContext';
import VisualWrapper from '../../server/VisualWrapper';
import { callERC20 } from '../../server/Contract/callERC20';
import { useStoreWallet } from '../ConnectWallet/walletContext';

type Props = { tokenAddress: string };

export default function GetBalance({ tokenAddress }: Props) {
    // wallet context
    // const providerBackend = useStoreBackend(state => state.providerBackend);
    // const accountBackend = useStoreBackend(state => state.accountBackend);

    //if (!!accountBackend) {}

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);
    const accountAddress = useStoreWallet((state) => state.addressAccount);

    const [balance, setBalance] = useState<number | undefined>(undefined);
    const [decimals, setDecimals] = useState<number>(18)
    const [symbol, setSymbol] = useState<string>("");

    //const myContract = new Contract(erc20Abi, tokenAddress, providerBackend);
    useEffect(() => {
        const fetchData = async () => {

            const resp1 = await callERC20(tokenAddress, "decimals");
            const res1 = resp1.decimals;
            console.log("resDecimals=", res1);
            setDecimals(Number(res1));

            const resp2 = await callERC20(tokenAddress, "symbol");
            const res2 = shortString.decodeShortString(resp2.symbol);
            console.log("ressymbol=", res2);
            setSymbol(res2);
        }
        fetchData().catch(console.error);
    }
        , []);

    useEffect(() => {
        const fetchData = async () => {
            const resp3 = await callERC20(tokenAddress, "balanceOf", accountAddress);
            const res2 = resp3.balance;
            const res3 = Number(uint256.uint256ToBN(res2));
            console.log("res3=", res3);
            setBalance(res3 / Math.pow(10, decimals));
        }
        fetchData().catch(console.error);
    }
        , [blockFromContext.blockNumber, decimals]); // balance updated at each block

    return (
        <VisualWrapper name="GetBalance" rsc>
            {
                typeof (balance) !== "number" ? (
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
        </VisualWrapper>

    )
}