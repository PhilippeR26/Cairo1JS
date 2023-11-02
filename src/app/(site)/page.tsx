"use server";

import Image from 'next/image'
import styles from './page.module.css'
import { Center, Spinner, Text, Button, Divider, Box } from '@chakra-ui/react';
import InteractContract from './components/client/Contract/InteractContract';
import { ChakraProvider } from '@chakra-ui/react'
import { useStoreWallet } from './components/client/ConnectWallet/walletContext';
import { useStoreBackend } from './components/server/backEndStarknetContext';

import { encode, Provider } from "starknet";
import { StarknetWindowObject, connect } from "get-starknet";

import starknetjsImg from "../../public/Images/StarkNet-JS_logo.png";
import { SpecialButton } from './components/client/SpecialButton';
import ConnectWallet from './components/client/ConnectWallet/ConnectWallet';
import DisplayBlockChain from './components/client/Block/DisplayBlockchain';
import { DisplayConnected } from './components/client/DisplayConnected';
import { setProviderBackend } from './components/server/Provider/setProviderBackend';

export default async function Page() {

    // Connect Argent-X or Braavos wallet
    // const addressAccount = useStoreWallet(state => state.addressAccount);
    // const accountW = useStoreWallet(state => state.accountW);
    // const wallet = useStoreWallet(state => state.wallet);
    // const isConnected = useStoreWallet(state => state.isConnected);
    // const chainFromContext = useStoreWallet(state => state.chain);

    // // from server
    // const providerBackend=useStoreBackend(state=>state.providerBackend);

    await setProviderBackend();
    console.log("state back=",useStoreBackend.getState());

    return (
        
        <ChakraProvider>
            <div>
                <p className={styles.bgText}>
                    Test get-starknet v3.0.1 with starknet.js v5.21.0
                </p>
                <Center>
                    <Image src={starknetjsImg} alt='starknet.js' width={150} height={150} />
                </Center>
                <p className={styles.bgText}>
                    Please connect to testnet network
                </p>
                <div>
                    <DisplayConnected></DisplayConnected>

                </div>
            </div >
        </ChakraProvider>
    )
}


