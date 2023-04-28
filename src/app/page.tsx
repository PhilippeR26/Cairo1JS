"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { Center, Spinner, Text, Button } from '@chakra-ui/react';
import BlockDisplay from './components/client/Block/BlockDisplay';
import InteractContract from './components/client/Contract/InteractContract';
import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import { useStoreWallet } from './components/Wallet/walletContext';


import { AccountInterface, Contract, shortString, json, ProviderInterface, encode, GetBlockResponse } from "starknet";
import { StarknetWindowObject, connect } from "get-wallet-starknet";

import { contratSierra } from "./contracts/test_type1_sierra";



export default function Page() {

    // Connect Argent-X or Braavos wallet
    const [isConnected, setConnected] = useState(false);
    const [wallet, setWallet] = useState<StarknetWindowObject | null>(null);
    const addressAccountFromContext = useStoreWallet(state => state.address);
    const setAddressAccount = useStoreWallet(state => state.setAddressAccount);
    const chainFromContext = useStoreWallet(state => state.chain);
    const setChain = useStoreWallet(state => state.setChain);
    const accountFromContext = useStoreWallet(state => state.account);
    const setAccount = useStoreWallet(state => state.setAccount);
    const providerFromContext = useStoreWallet(state => state.provider);
    const setProvider = useStoreWallet(state => state.setProvider);

    const handleConnectClick = async () => {
        const wallet = await connect({ modalMode: "alwaysAsk", modalTheme: "dark" });
        await wallet?.enable({ starknetVersion: "v5" } as any);
        setWallet(wallet);
        const addr = encode.addHexPrefix(encode.removeHexPrefix(wallet?.selectedAddress ?? "0x").padStart(64, "0"));
        setAddressAccount(addr);
        setConnected(!!wallet?.isConnected);
        if (wallet?.account) {
            setAccount(wallet.account);
        }
        if (wallet?.isConnected) {
            setChain(wallet.chainId); // not provided by Braavos
            setProvider(wallet.provider);
        }
    }



    // function IncreaseBalance() { }

    // async function getBalance(account: AccountInterface): Promise<string> {
    //     const compiledTest = contratSierra;
    //     const myTestContract = new Contract(compiledTest.abi, ContractAddress, account);
    //     const balance = await myTestContract.get_balance({
    //         parseRequest: false,
    //         parseResponse: false,
    //     });
    //     console.log("balance =", balance);
    //     return BigInt(balance).toString(10);
    // }


    return (
        <ChakraProvider>
            <div>

                <p className={styles.bgText}>
                    Test get-wallet-starknet with starknet.js v5.8.0
                    <br />
                    Please connect to testnet
                </p>

                <div>

                    {
                        !isConnected ? (
                            <Center>
                                <Button
                                    ml="4"
                                    textDecoration="none !important"
                                    outline="none !important"
                                    boxShadow="none !important"
                                    onClick={() => {
                                        handleConnectClick();
                                    }}
                                >
                                    Connect Wallet
                                </Button>
                            </Center>
                        ) : (
                            <>
                                <Center>
                                    <Button
                                        ml="4"
                                        textDecoration="none !important"
                                        outline="none !important"
                                        boxShadow="none !important"
                                        onClick={() => {
                                            setConnected(false);
                                        }}
                                    >
                                        {accountFromContext
                                            ? `Your wallet : ${addressAccountFromContext?.slice(0, 7)}...${addressAccountFromContext?.slice(-4)} is connected`
                                            : "No Account"}
                                    </Button>
                                </Center>
                                <br />
                                <p className={styles.text1}>
                                    address = {addressAccountFromContext}<br />
                                    chain = {chainFromContext}<br />
                                    isConnected={isConnected ? "Yes" : "No"}<br />
                                    account.address ={accountFromContext?.address}
                                </p>
                                <br />
                                {providerFromContext &&
                                    <InteractContract ></InteractContract>
                                }

                                {/* Balance = {getBalance(account!)} */}

                            </>
                        )
                    }


                </div>


            </div >
        </ChakraProvider>
    )
}


