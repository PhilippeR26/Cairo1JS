"use server";

import Image from 'next/image'
import styles from './page.module.css'
import { Center, Text } from '@chakra-ui/react';

import starknetjsImg from "../public/Images/StarkNet-JS_logo.png";
import { DisplayConnected } from './components/client/DisplayConnected';
import LowerBanner from './components/client/LowerBanner';

export default async function Page() {

    return (
        <div>
            <p className={styles.bgText}>
                Test get-starknet v5.0.0 with starknet.js v9.1.0
            </p>
            <Center>
                <Image src={starknetjsImg} alt='starknet.js' width={150} />
            </Center>
            <Text
                pt={1}
                textStyle={"xl"}
                textAlign={'center'}
                fontWeight={'bold'}
                fontFamily={'helvetica'}
            >
                Please connect to Sepolia Testnet network
            </Text>
            <DisplayConnected></DisplayConnected>
            <LowerBanner></LowerBanner>
        </div >
    )
}


