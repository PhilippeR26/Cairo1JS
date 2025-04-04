"use client";

import { useEffect, useState } from 'react';
import {  json} from "starknet";
import { useStoreBlock, dataBlockInit, type DataBlock } from "./blockContext";
import GetBalance from "../Contract/GetBalance";
import { Text, Spinner, Center, Divider, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import * as constants from '@/type/constants';
import { useFrontendProvider } from '../provider/providerContext';
import { myFrontendProviders } from '@/utils/constants';
  
export default function DisplayBlockChain() {

    // read block
    const blockFromContext = useStoreBlock(state => state.dataBlock);
    const setBlockData = useStoreBlock((state) => state.setBlockData);
    const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>(undefined);
    const [_, setChainId] = useState<string>("unknown");
    const myProviderIndex= useFrontendProvider(state=>state.currentFrontendProviderIndex);
    const myProvider=myFrontendProviders[myProviderIndex];

    async function catchBlock() {
        if(!!myProvider){
            const bl=await myProvider.getBlock("latest") ;
            const dataBlock:DataBlock={
                block_hash:bl.block_hash,
                block_number:bl.block_number,
                timestamp:bl.timestamp,
                l1_gas_price: bl.l1_gas_price
            };
            setBlockData(dataBlock);
            setChainId(await myProvider.getChainId());
        }
    }

    useEffect(() => {
        catchBlock()
        const tim = setInterval(() => {
            catchBlock()
            console.log("timerId=", tim);
        }
            , 10000 //ms
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
                    <Divider borderColor='gray.600'></Divider>
                    <GetBalance tokenAddress={constants.addrSTRK} ></GetBalance> 

                </Box>
            }

        </>

    )
}