"use server";

import Image from 'next/image'
import styles from './page.module.css'
import { Center, Spinner, Text, Button, Divider, Box } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import starknetjsImg from "../../public/Images/StarkNet-JS_logo.png";
import { DisplayConnected } from './components/clientComponents/DisplayConnected';

export default async function Page() {
    return (

        <ChakraProvider>
            <div>
                <p className={styles.bgText}>
                    Test get-starknet v3.0.1 with Starknet.js v5.24.3
                </p>
                <Center>
                    using a provider located in the server
                    </Center>
                <Center>
                    <Image src={starknetjsImg} alt='starknet.js' width={150} />
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


