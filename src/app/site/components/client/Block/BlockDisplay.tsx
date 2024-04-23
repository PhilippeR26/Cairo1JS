//"use client";

import { useEffect, useState } from 'react';
import { ProviderInterface, GetBlockResponse } from "starknet";
import { useStoreBlock } from "./blockContext";
import { Text, Divider } from "@chakra-ui/react";
import styles from '../../../page.module.css'

type Props = { providerSN: ProviderInterface };

export default function BlockDisplay({ providerSN }: Props) {
    const blockFromContext = useStoreBlock(state => state.dataBlock);
    const setBlockData = useStoreBlock((state) => state.setBlockData);
    const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>(undefined);

    useEffect(() => {
        const tim = setInterval(() => {
            providerSN.getBlock("latest").then((resp: GetBlockResponse) => {
                if (resp.status !== "PENDING") {
                    setBlockData({
                        timestamp: resp.timestamp,
                        block_hash: resp.block_hash,
                        block_number: resp.block_number,
                        l1_gas_price: resp.l1_gas_price 
                    }
                    )
                }
            })
                .catch((e) => { console.log("error getBloc=", e) })
            console.log("timerId=", tim);
        }
            , 5000 //ms
        );
        setTimerId(() => tim);

        console.log("startTimer", tim);

        return () => {
            clearInterval(tim);
            console.log("stopTimer", tim)
        }
    }
        , []);

    return (
        <>
            {
                !blockFromContext.block_number ? (
                    <Text>Fetching in progres ... </Text>
                ) : (
                    <>
                        <Text className={styles.text1}>BlockNumber = {blockFromContext.block_number} timerId = {timerId ? "Set" : "Not set"} </Text>
                        <Text className={styles.text1}>BlockHash = {blockFromContext.block_hash}  </Text>
                        <Text className={styles.text1}>BlockTimeStamp = {blockFromContext.timestamp}  </Text>
                        <Text className={styles.text1}>BlockGasprice = {JSON.stringify(blockFromContext.l1_gas_price)}  </Text>
                        <Divider></Divider>
                    </>
                )}
        </>

    )
}