import { useEffect, useState } from 'react';
import { GetBlockResponse } from "starknet";

import { useStoreBlock, dataBlockInit } from "../Block/blockContext";
    import { useStoreWallet } from '../../Wallet/walletContext';


import { Text, Spinner, Center, Divider, Box, SimpleGrid, Button } from "@chakra-ui/react";
import styles from '../../../page.module.css'

export default function WalletHandle() {
    // wallet context
    const providerSN = useStoreWallet(state => state.provider);
    const wallet = useStoreWallet(state => state.wallet);



    return (
        <>
            <Center>'Invoke/declare/deploy account' recommended in Devnet in a fork of testnet</Center>
            <SimpleGrid minChildWidth="250px" spacing="20px" paddingBottom="20px">
                <Box bg="pink.200" color='black' borderWidth='1px' borderRadius='lg'>
                    <Center> Last accountsChanged event : </Center>
                    <Center>Time: N/A </Center>
                    <Center>Response: N/A </Center>
                </Box>
                <Box bg="pink.200" color='black' borderWidth='1px' borderRadius='lg'>
                    <Center> Last networkChanged event : </Center>
                    <Center>Time: N/A </Center>
                    <Center>Response: N/A </Center>
                </Box>
            </SimpleGrid>
            <SimpleGrid minChildWidth="305px" spacing="20px" paddingBottom="20px">
                <Box color='black' borderWidth='0px' borderRadius='lg'>
                    <Center> <Button bg='blue.300'>wallet_requestAccounts</Button> </Center>
                </Box>
                <Box color='black' borderWidth='0px' borderRadius='lg'>
                    <Center><Button bg='blue.300'>wallet_watchAsset TST token</Button></Center>
                </Box>
                <Box color='black' borderWidth='0px' borderRadius='lg'>
                    <Center><Button bg='blue.300'>wallet_addStarknetChain ZORG</Button></Center>
                </Box>
                <Box color='black' borderWidth='0px' borderRadius='lg'>
                    <Center><Button bg='blue.300'>starknet_addInvokeTransaction</Button></Center>
                </Box>
                <Box color='black' borderWidth='0px' borderRadius='lg'>
                    <Center><Button bg='blue.300'>starknet_addDeclareTransaction</Button></Center>
                </Box>
                <Box color='black' borderWidth='0px' borderRadius='lg'>
                    <Center><Button bg='blue.300'>starknet_addDeployAccountTransaction</Button></Center>
                </Box>
                <Box color='black' borderWidth='0px' borderRadius='lg'>
                    <Center><Button bg='blue.300'>starknet_signTypedData</Button></Center>
                </Box>
            </SimpleGrid>
            <SimpleGrid minChildWidth="320px" spacing="20px" paddingBottom="20px">
                <Box bg="green.200" color='black' borderWidth='1px' borderRadius='lg'>
                    <Center>.id : {wallet?.id}</Center>
                    <Center>.name : {wallet?.name} </Center>
                    <Center>.version : {wallet?.version} </Center>
                    <Center>.icon : {wallet?.icon.slice(0,30)} </Center>
                </Box>
                <Box bg="green.200" color='black' borderWidth='1px' borderRadius='lg'>
                    <Center>.selectedAddress : {wallet?.selectedAddress?.slice(0,20)+"..."} </Center>
                    <Center>.chainId : {wallet?.chainId} </Center>
                    <Center>.isConnected : {!!wallet?.isConnected} </Center>
                </Box>
            </SimpleGrid>
        </>

    )
}

function useMyWallet(arg0: (state: any) => any) {
    throw new Error('Function not implemented.');
}
