"use server";

import Image from 'next/image'
import styles from './page.module.css'
import { Center, Text } from '@chakra-ui/react';

import starknetJsImg from "../../public/Images/StarkNet-JS_logo.png";
import starknetReactImg from "../../public/Images/starknet-react.png";
import { DisplayConnected } from './components/client/DisplayConnected';
import LowerBanner from './components/client/LowerBanner';

export default async function Page() {

    return (
            <div>
                <p className={styles.bgText}>
                    Test starknet-react v3.6.2 with starknet.js v6.20.3
                </p>
                <Center>
                    <Image src={starknetReactImg} alt='starknet.js' height={150} /> 
                    <Text px={4}></Text>
                    <Image src={starknetJsImg} alt='starknet.js' height={150} />
                </Center>
                <p className={styles.bgText}>
                    Please connect to Sepolia Testnet network
                </p>
                <div>
                    <DisplayConnected></DisplayConnected>
                </div>
                <LowerBanner></LowerBanner>
            </div >
    )
}

