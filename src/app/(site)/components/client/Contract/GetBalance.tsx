"use client";

import { useEffect, useState } from 'react';
import { Contract, uint256, shortString } from "starknet";

import { useStoreBlock } from "../Block/blockContext";

import { Text, Center, Spinner, } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { erc20Abi } from "../../../contracts/abis/ERC20abi"
import { useStoreWallet } from "../ConnectWallet/walletContext";;

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
    const providerW = useStoreWallet(state => state.providerW);
    const contract = new Contract(erc20Abi, tokenAddress, providerW);

    async function callERC20(contractAddress: string, functionCall: string, param?: string): Promise<any> {
        const providerW = useStoreWallet(state => state.providerW);
    
    
        const contract = new Contract(erc20Abi, contractAddress, providerW);
        console.log("ERC20 func =",functionCall,", param =",param);
        let resp: any;
        if (!param) {
            resp = await contract[functionCall]();
        } else {
            resp = await contract[functionCall](param);
        }
        console.log("ERC20 result =",resp)
        return resp;
    }

    useEffect(() => {
        contract.call("decimals")
            .then((resp: any) => {
                console.log("resDecimals=", resp);
                setDecimals(Number(resp));
            })
            .catch((e: any) => { console.log("error getDecimals=", e) });

        contract.symbol()
            .then((resp: any) => {
                const res2 = shortString.decodeShortString(resp);
                console.log("ressymbol=", res2);
                setSymbol(res2);
            })
            .catch((e: any) => { console.log("error getSymbol=", e) });
    }
        , []);

    useEffect(() => {
        contract.balanceOf(accountAddress)
            .then((resp: any) => {
                const res3 = Number(resp);
                console.log("res3=", res3);
                setBalance(res3 / Math.pow(10, decimals));
            }
            )
            .catch((e: any) => { console.log("error balanceOf=", e) });
    }
    , [blockFromContext.block_number, decimals]); // balance updated at each block


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const resp3 = await callERC20(tokenAddress, "balanceOf", accountAddress);
    //         //const res2 = resp3.balance;
    //         //const res3 = Number(uint256.uint256ToBN(res2));
    //         const res3=resp3;
    //         console.log("res3=", res3);
    //         setBalance(res3 / Math.pow(10, decimals));
    //     }
    //     fetchData().catch(console.error);
    // }
    //     , [blockFromContext.block_number, decimals]); // balance updated at each block

    return (
        <>
            {
                typeof (balance) !== "bigint" ? (
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