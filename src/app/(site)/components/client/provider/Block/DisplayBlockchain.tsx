"use client";

import { useStoreProvider } from "../../provider/providerContext";

import { useEffect, useState } from 'react';
import { BlockStatus, BlockTag, GetBlockResponse, shortString } from "starknet";

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
        let block: DataBlock;
        // console.log("DisplayBlockChain-providerServer", providerServer);
        try {
            const bloc: GetBlockResponse = typeof providerServer === "undefined" ?
                {
                    timestamp: 0,
                    block_hash: "undefined",
                    block_number: 0,
                    new_root: "undefined",
                    parent_hash: "undefined",
                    status: BlockStatus.PENDING,
                    transactions: [],
                    gas_price: "undefined",
                    sequencer_address: "undefined",
                    starknet_version: "undefined",
                    transaction_receipts: "undefined",
                }
                :
                await providerServer.getBlock(BlockTag.latest);
            // onsole.log("bloc=", bloc);
            block = {
                timeStamp: bloc.timestamp,
                blockHash: bloc.block_hash as string,
                blockNumber: bloc.block_number,
                gasPrice: bloc.gas_price ?? "Not defined in this block."
            }
            // console.log("block =",block);
        } catch (error) {
            block = {
                timeStamp: 0,
                blockHash: "Error",
                blockNumber: 0,
                gasPrice: "Error"
            }
        }
        setBlockData(block);

        
    }

    async function getChaId() {
        let chId: string;
        try {
            chId = typeof providerServer === "undefined" ?
                "Error."
                :
                shortString.decodeShortString(await providerServer.getChainId());
        } catch (error) { chId = "Error" }
        setChainId(chId);
    }

    useEffect(() => {
        getChaId();
        catchBlock();
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