"use client";
// DAPP Demo of Starknet, with Next.js
// CTRL+SHIFT+I for the debug

import Image from 'next/image'
import styles from './page.module.css'
import { Center, Spinner, Text, Button, Divider, Box } from '@chakra-ui/react';
import InteractContract from './components/client/Contract/InteractContract';
import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import { useStoreWallet } from './components/Wallet/walletContext';

import { constants, encode, Provider, shortString, typedData, WeierstrassSignatureType } from "starknet";
import { StarknetWindowObject, connect } from "get-starknet";

import starknetjsImg from '../../public/Images/StarkNet-JS_logo.png';
import { sign } from 'crypto';

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

    // Component context

    const handleConnectClick = async () => {
        const wallet = await connect({ modalMode: "alwaysAsk", modalTheme: "light" });
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
            setProvider(wallet.provider); // ********** for serial
            console.log(wallet.provider);
            // setProvider(new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } })); // ************* debug in devnet *********
        }
    }

    const handleSignEIP712=async()=>{
        const typedDataValidate: typedData.TypedData = {
            domain: {
                chainId: "Starknet Mainnet",
                name: "Dappland",
                version: "1.0",
            },
            message: {
                dappKey: "10kswap",
                rating: 5,
            },
            primaryType: "Message1",
            types: {
                Message1: [
                    {
                        name: "dappKey",
                        type: "string",
                    },
                    {
                        name: "rating",
                        type: "felt",
                    },
                ],
                StarkNetDomain: [
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "chainId",
                        type: "string",
                    },
                    {
                        name: "version",
                        type: "string",
                    },
                ],
            },
        }; 
        if (accountFromContext) {
        const signature = await accountFromContext.signMessage(typedDataValidate) as WeierstrassSignatureType;
    const res = await accountFromContext.verifyMessage(typedDataValidate, signature);
    console.log("signature =",signature,"\nResult =",res);
    }}

    return (
        <ChakraProvider>
            <div>
                <p className={styles.bgText}>
                    Test get-starknet v3.0.1 with starknet.js v5.17.0
                </p>
                <Center>
                    <Image src={starknetjsImg} alt='starknet.js' width={150} height={150} />
                </Center>
                <p className={styles.bgText}>
                    Please connect to testnet network
                </p>
                <div>
                    {!isConnected ? (
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
                            <Box bg='pink.200' color='black' borderWidth='1px' borderRadius='md'>
                                <p className={styles.text1}>
                                    address = {addressAccountFromContext}<br />
                                    chain = {chainFromContext}<br />
                                    isConnected={isConnected ? "Yes" : "No"}<br />
                                    account.address ={accountFromContext?.address}
                                </p>
                            </Box>
                            <Box bg='blue.200' color='black' borderWidth='2px' borderRadius='md'>
                                <Center>
                                    <Button
                                        ml="4"
                                        textDecoration="none !important"
                                        outline="none !important"
                                        boxShadow="none !important"
                                        onClick={() => {
                                            handleSignEIP712();
                                        }}
                                    >
                                        Sign EIP712
                                    </Button>
                                </Center>
                                <p className={styles.text1}>
                                    test
                                </p>
                            </Box>
                            {!!providerFromContext &&
                                <InteractContract ></InteractContract>}
                        </>
                    )
                    }
                </div>
            </div >
        </ChakraProvider>
    )
}


