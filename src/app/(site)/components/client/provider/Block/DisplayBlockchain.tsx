"use client";

import {useStoreProvider} from "../../provider/providerContext";

import { useEffect, useState } from 'react';
import { GetBlockResponse, shortString } from "starknet";

import { useStoreBlock, dataBlockInit, DataBlock } from "./blockContext";

import GetBalance from "../../Contract/GetBalance";

import { Text, Spinner, Center, Divider, Box } from "@chakra-ui/react";
import styles from "@/app/(site)/page.module.css"
import * as constants from '@/type/constants';
import { getBlockBackend, getChainIdBackend } from '@/app/server/provider/backendProvider';

// Test a Cairo 1 contrat already deployed in testnet:
export default function DisplayBlockChain() {
    // wallet context
    //const providerBackend = useStoreBackend(state => state.providerBackend);

    // read block
    const blockFromContext = useStoreBlock(state => state.dataBlock);
    const setBlockData = useStoreBlock((state) => state.setBlockData);

    const providerServer = useStoreProvider(state => state.providerServer);

    const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>(undefined);
    const [chainId, setChainId] = useState<string>("unknown");

    async function catchBlock() {
        let bloc: DataBlock;
        try {
            bloc = await getBlockBackend();
        } catch (error) {
            bloc = {
                timeStamp: 0,
                blockHash: "Error",
                blockNumber: 0,
                gasPrice: "Error"
            }
        }
        setBlockData(bloc);
        let chId: string;
        try {
            chId = shortString.decodeShortString(await providerServer.getChainId());
        } catch (error) { chId = "Error" }
        setChainId(chId);
    }

    useEffect(() => {
        catchBlock()
        const tim = setInterval(() => {
            catchBlock()
            console.log("timerId=", tim);
        }
            , 5000 //ms
        );
        setTimerId(() => tim);

        console.log("startTimer", tim);

        return () => {
            clearInterval(tim);
            console.log("stopTimer", tim)
            setBlockData(dataBlockInit);
        }
    }
        , []);


    return (
        <>
            <Box bg='gray.300' color='black' borderWidth='1px' borderRadius='lg'>
                {!blockFromContext.blockNumber ? (
                    <Center>
                        <Spinner color="blue" size="sm" mr={4} />  Fetching data ...
                    </Center>
                ) :
                    (
                        <>
                            <Text className={styles.text1}>Last block number = {blockFromContext.blockNumber} timerId = {timerId ? "Set" : "Not set"} </Text>
                            <Text className={styles.text1}>BlockHash = {blockFromContext.blockHash}  </Text>
                            <Text className={styles.text1}>BlockTimeStamp = {blockFromContext.timeStamp}  </Text>
                            <Text className={styles.text1}>BlockGasprice = {blockFromContext.gasPrice}  </Text>
                            <Divider borderColor='gray.800'></Divider>
                            <Text className={styles.text1}>Chain Id = {chainId}  </Text>
                        </>
                    )
                }
            </Box>
            {!!blockFromContext.blockNumber &&
                <Box bg='yellow.300' color='black' borderWidth='1px' borderRadius='lg'>
                    <Center> Updated each new block :</Center>
                    <GetBalance tokenAddress={constants.addrETH} ></GetBalance>
                    <Divider borderColor='gray.600'></Divider>
                    <GetBalance tokenAddress={constants.addrTEST} ></GetBalance>

                </Box>
            }

        </>

    )
}