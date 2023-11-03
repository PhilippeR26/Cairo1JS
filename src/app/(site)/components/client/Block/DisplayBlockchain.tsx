"use client";

import { useEffect, useState } from 'react';
import { GetBlockResponse } from "starknet";

import { useStoreBlock, dataBlockInit } from "./blockContext";
import { useStoreBackend } from '../../../../server/backEndStarknetContext';

import GetBalance from "../Contract/GetBalance";

import { Text, Spinner, Center, Divider, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import * as constants from '@/type/constants';
import { getBlockBackend, getChainId } from '@/app/server/provider/providerBackend';

// Test a Cairo 1 contrat already deployed in testnet:
export default function DisplayBlockChain() {
    // wallet context
    //const providerBackend = useStoreBackend(state => state.providerBackend);

    // read block
    const blockFromContext = useStoreBlock(state => state.dataBlock);
    const setBlockData = useStoreBlock((state) => state.setBlockData);
    const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>(undefined);
    const [chainId, setChainId] = useState<string>("unknown");

    async function catchBlock() {
            setBlockData(await getBlockBackend());
            setChainId(await getChainId());
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
                            <Divider></Divider>
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