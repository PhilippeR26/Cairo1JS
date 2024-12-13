"use client";

import GetBalance from "../token/GetBalance";
import { Center, Divider, Box } from "@chakra-ui/react";
import * as constants from '@/utils/constants';
import { useAccount } from '@starknet-react/core';

export default function DisplayBalances() {
    const { isConnected } = useAccount();

    return (
        <>
            {isConnected &&
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