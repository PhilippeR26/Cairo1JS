"use client";

import { useEffect, useState } from 'react';
import { CairoBytes31, Contract, num, shortString } from "starknet";
import { Text, Center, Spinner } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import { erc20Abi } from "../../../contracts/abis/ERC20abi"
import { useFrontendProvider } from '../provider/providerContext';
import { USDCircleAbi } from '@/app/contracts/abis/USDCircleAbi';
import { myFrontendProviders } from '@/utils/constants';
import { useStoreWallet } from '../ConnectWallet/walletContext';


type Props = { tokenAddress: string, accountAddress: string };

export default function GetBalance({ tokenAddress, accountAddress }: Props) {

    // block context
    const [balance, setBalance] = useState<number | undefined>(undefined);
    const [decimals, setDecimals] = useState<number>(18)
    const [symbol, setSymbol] = useState<string>("");
    const [counter, setCounter] = useState<bigint>(0n);

    const myProviderIndex = useFrontendProvider(state => state.currentFrontendProviderIndex);
    const myProvider = myFrontendProviders[myProviderIndex];
    const contract = new Contract({ abi: erc20Abi, address: tokenAddress, providerOrAccount: myProvider });

    useEffect(() => {
        contract.call("decimals")
            .then((resp: any) => {
                console.log("resDecimals=", resp);
                setDecimals(Number(resp));
            })
            .catch((e: any) => { console.log("error getDecimals=", e) });

        let symbol: string = "---";
        contract.symbol()
            .then((res2: bigint) => {
                symbol = num.toHex(res2);
                console.log("resSymbol=", symbol);
                if (symbol === "0x0") { // try abi with ByteArray response
                    console.log("try with ByteArray response...");
                    const contract2 = new Contract({
                        abi: USDCircleAbi,
                        address: tokenAddress,
                        providerOrAccount: myProvider
                    });
                    contract2.symbol()
                        .then((res3: string) => {
                            symbol = res3;
                            console.log("symbol for", contract.address, " (ByteArray) is", symbol);
                            setSymbol(symbol);

                        })
                        .catch((e: any) => { console.log("error getSymbol (ByteArray)=", e) });
                } else {
                    symbol = new CairoBytes31(symbol).decodeUtf8();
                    if (symbol === "USDC") { symbol = "USDC.e" }
                    setSymbol(symbol);

                }
            })
            .catch((e: any) => {
                console.log("error getSymbol (felt)=", e);
            });
        setSymbol(symbol);    }
        , []);

    useEffect(() => {
        contract.balanceOf(accountAddress)
            .then((resp: any) => {
                const res3 = Number(resp);
                setBalance(res3 / Math.pow(10, decimals));
            }
            )
            .catch((e: any) => { console.log("error balanceOf=", e) });
    }
        , [counter, decimals]); // balance updated each 24s

    useEffect(() => {
        const tim = setInterval(() => {
            setCounter((prevCount) => prevCount + 1n);
        }
            , 24_000 //ms
        );
        console.log("startTimer", tim);

        return () => {
            clearInterval(tim);
            console.log("stopTimer", tim)
        }
    }
        , []);


    return (
        <>
            {
                typeof balance == "undefined" ? (
                    <>
                        <Center>
                            <Spinner color="blue" size="sm" mr={4} />
                            Fetching data ...
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