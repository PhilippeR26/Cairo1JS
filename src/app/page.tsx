"use server";

import Image from 'next/image'
import styles from './page.module.css'
import { Center } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'

import starknetjsImg from "../public/Images/StarkNet-JS_logo.png";
import { DisplayConnected } from './components/client/DisplayConnected';
import LowerBanner from './components/client/LowerBanner';

export default async function Page() {

    return (
        <ChakraProvider>
            <div>
                <p className={styles.bgText}>
                    Test get-starknet v4.0.7 with starknet.js v7.0.1
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


