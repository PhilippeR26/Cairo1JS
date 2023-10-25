import { useEffect, useState } from 'react';
import { GetBlockResponse } from "starknet";

import { useStoreBlock, dataBlockInit } from "../../server/blockContext";
import { useStoreWallet } from '../ConnectWallet/walletContext';

import GetBalance from "./GetBalance";
import PlayWithCairo1 from "./PlayWithCairo1";

import { Text, Spinner, Center, Divider, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'

// Test a Cairo 1 contrat already deployed in testnet:
const addrETH = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
const addrTEST = "0x07394cBe418Daa16e42B87Ba67372d4AB4a5dF0B05C6e554D158458Ce245BC10";

export default function InteractContract() {
    // wallet context
    const providerSN = useStoreWallet(state => state.provider);

    // read block
    const blockFromContext = useStoreBlock(state => state.dataBlock);
    const setBlockData = useStoreBlock((state) => state.setBlockData);
    const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>(undefined);

    function catchBlock() {
        providerSN?.getBlock("latest").then((resp: GetBlockResponse) => {
            // console.log("end getBloc");
            setBlockData({
                timeStamp: resp.timestamp,
                blockHash: resp.block_hash,
                blockNumber: resp.block_number,
                gasPrice: resp.gas_price ?? ""
            }
            )
        })
            .catch((e) => { console.log("error getBloc=", e) })
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
            {!!blockFromContext.blockNumber &&
                <Box bg='mediumaquamarine' color='black' borderWidth='3px' borderColor='green.800' borderRadius='xl' p={2}>
                    <>
                        <Text textAlign='center' fontSize={20}>Balance of Cairo 1 🦀 contract :  </Text>
                        <PlayWithCairo1></PlayWithCairo1>
                    </>
                </Box>
            }
        </>

    )
}