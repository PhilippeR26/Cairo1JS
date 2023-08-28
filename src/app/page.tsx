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

import { Account, cairo, constants, Contract, encode, Provider, shortString, typedData, WeierstrassSignatureType } from "starknet";
import { StarknetWindowObject, connect } from "get-starknet";

import starknetjsImg from '../../public/Images/StarkNet-JS_logo.png';
import { erc20Abi } from "./contracts/abis/ERC20abi"

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

    const handleSignEIP712 = async () => {
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
            console.log("signature =", signature, "\nResult =", res);
        }
    }

    const handleMultiCall = async () => {
        if (accountFromContext && wallet) {
            const contractTST = new Contract(erc20Abi, "0x1e8294b01f549d27e135dbe54d30704ee4d3a6c6f9007e14e78010fc77e6c1d", wallet?.provider);
            contractTST.connect(accountFromContext);
            const transaction1 = contractTST.populate("mint", {
                to: "0x060606d9fb329755e3849bc98d6aa284e946d92791f535f1cb0bd76b89d6a47d",
                amount: cairo.uint256(100)
            });
            const transaction2 = contractTST.populate("mint", {
                to: "0x069a9f965e3c8d7d84007904f3d872d90d075d156b1fc57624e560cf9a9c7f70",
                amount: cairo.uint256(100)
            });
            const th = await accountFromContext.execute([transaction1, transaction2]);
            await wallet.provider.waitForTransaction(th.transaction_hash);
            console.log("Minted x2.");
        }
    }

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
                                    <Button
                                        ml="4"
                                        textDecoration="none !important"
                                        outline="none !important"
                                        boxShadow="none !important"
                                        onClick={() => {
                                            handleMultiCall();
                                        }}
                                    >
                                        Execute MultiCall
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


