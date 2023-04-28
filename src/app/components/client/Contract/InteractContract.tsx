import { use, useEffect, useMemo, useState } from 'react';
import { Provider, ProviderInterface, RpcProvider, constants, GetBlockResponse } from "starknet";

import { useStoreBlock, DataBlock, dataBlockInit } from "../Block/blockContext";
import { useStoreWallet } from '../../Wallet/walletContext';

import GetBalance from "./GetBalance";
import PlayWithCairo1 from "./PlayWithCairo1";

import { Text, Button, Spinner, Center } from "@chakra-ui/react";
import styles from '../../../page.module.css'



// Test contrat already deployed in testnet:
const addrETH = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
const addrTEST = "0x07394cBe418Daa16e42B87Ba67372d4AB4a5dF0B05C6e554D158458Ce245BC10";

export default function InteractContract() {
    // wallet context
    const providerSN = useStoreWallet(state => state.provider);

    // read block
    const blockFromContext = useStoreBlock(state => state.dataBlock);
    const setBlockData = useStoreBlock((state) => state.setBlockData);
    const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>(undefined);

    useEffect(() => {
        const tim = setInterval(() => {
            providerSN?.getBlock("latest").then((resp: GetBlockResponse) => {
                setBlockData({
                    timeStamp: resp.timestamp,
                    blockHash: resp.block_hash,
                    blockNumber: resp.block_number,
                    gasPrice: resp.gas_price ?? ""
                }
                )
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
            setBlockData(dataBlockInit);
        }
    }
        , []);


    return (
        <>
            {!blockFromContext.blockNumber ? (
                <Center>

                    <Spinner color="blue" size="sm" />  _Fetching data ...
                </Center>
            ) :
                (
                    <>
                        <Text className={styles.text1}>BlockNumber = {blockFromContext.blockNumber} timerId = {timerId ? "Set" : "Not set"} </Text>
                        <Text className={styles.text1}>BlockHash = {blockFromContext.blockHash}  </Text>
                        <Text className={styles.text1}>BlockTimeStamp = {blockFromContext.timeStamp}  </Text>
                        <Text className={styles.text1}>BlockGasprice = {blockFromContext.gasPrice}  </Text>
                        <GetBalance tokenAddress={addrETH} ></GetBalance>
                        <GetBalance tokenAddress={addrTEST} ></GetBalance>
                        <Text className={styles.text1}>Balance of Cairo 1 contract :  </Text>
                        <PlayWithCairo1></PlayWithCairo1>

                        <br />
                    </>
                )
            }
        </>

    )
}