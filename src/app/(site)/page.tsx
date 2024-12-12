"use client";

import Image from 'next/image'
import styles from './page.module.css'
import { Center } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import { sepolia } from "@starknet-react/chains"

import starknetjsImg from "../../public/Images/StarkNet-JS_logo.png";
import { DisplayConnected } from './components/client/DisplayConnected';
import LowerBanner from './components/client/LowerBanner';
import { StarknetProvider } from './components/client/Starknet-provider';
import { publicProvider, StarknetConfig, useAccount, useConnect, useProvider } from '@starknet-react/core';

export default function Page() {
    const { provider } = useProvider();
    console.log("page.tsx=", { provider });
    const { connect, connectors, error } = useConnect({});
    const { address } = useAccount();
    console.log("page.tsx=", { connect, connectors });
    console.log("page.tsx=", { address });

    return (
        <ChakraProvider>
            <div>
                <p className={styles.bgText}>
                    Test starknet-react v3.6.2 with starknet.js v6.20.3
                </p>
                <Center>
                    <Image src={starknetjsImg} alt='starknet.js' width={150} />
                </Center>
                <p className={styles.bgText}>
                    Please connect to Sepolia Testnet network
                </p>
                <div>
                    <DisplayConnected></DisplayConnected>
                </div>
                <LowerBanner></LowerBanner>
            </div >
        </ChakraProvider>
    )
}

