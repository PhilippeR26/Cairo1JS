"use client";

import { useEffect, useState } from 'react';
import { GetBlockResponse, RPC, json } from "starknet";

import { useStoreBlock, dataBlockInit, type DataBlock } from "./blockContext";

import GetBalance from "../Contract/GetBalance";

import { Text, Spinner, Center, Divider, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import * as constants from '@/type/constants';
import { useStoreWallet } from '../ConnectWallet/walletContext';

// Test a Cairo 1 contract already deployed in testnet:
export default function DisplayBlockChain() {
    // wallet context
    //const providerBackend = useStoreBackend(state => state.providerBackend);

    // read block
    const blockFromContext = useStoreBlock(state => state.dataBlock);
    const setBlockData = useStoreBlock((state) => state.setBlockData);
    const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>(undefined);
    const [chainId, setChainId] = useState<string>("unknown");
    const providerW= useStoreWallet(state=>state.providerW);

    async function catchBlock() {
        if(!!providerW){
            //console.log("catchBlock");
            // const bl=await providerW.getBlockWithTxHashes("latest") as RPC.RPCSPEC07.SPEC.BLOCK_WITH_TX_HASHES;
            // const dataBlock:DataBlock={
            //     block_hash:bl.block_hash,
            //     block_number:bl.block_number,
            //     timestamp:bl.timestamp,
            //     l1_gas_price: bl.l1_gas_price
            // };
            const dataBlock:DataBlock={
                block_hash:"0x01",
                block_number:600,
                timestamp:800,
                l1_gas_price: {price_in_fri:"0x45", price_in_wei:"0x6"}
            };
            //console.log("datablock =",dataBlock);
            setBlockData(dataBlock);
            setChainId(await providerW.getChainId());
        }
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
                {!blockFromContext.block_number ? (
                    <Center>
                        <Spinner color="blue" size="sm" mr={4} />  Fetching data ...
                    </Center>
                ) :
                    (
                        <>
                            <Text className={styles.text1}>Last block number = {blockFromContext.block_number} timerId = {timerId ? "Set" : "Not set"} </Text>
                            <Text className={styles.text1}>BlockHash = {blockFromContext.block_hash}  </Text>
                            <Text className={styles.text1}>BlockTimeStamp = {blockFromContext.timestamp}  </Text>
                            <Text className={styles.text1}>BlockGasprice = {json.stringify( blockFromContext.l1_gas_price)}  </Text>
                            <Divider></Divider>
                        </>
                    )
                }
            </Box>
            {!!blockFromContext.block_number &&
                <Box bg='yellow.300' color='black' borderWidth='1px' borderRadius='lg'>
                     <Center> Updated each new block :</Center>
                    <GetBalance tokenAddress={constants.addrETH} ></GetBalance>
                   {/* <Divider borderColor='gray.600'></Divider>
                    <GetBalance tokenAddress={constants.addrTEST} ></GetBalance> */}

                </Box>
            }

        </>

    )
}