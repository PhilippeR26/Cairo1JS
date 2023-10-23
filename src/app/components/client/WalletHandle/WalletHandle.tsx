import { useEffect, useState } from 'react';
import { GetBlockResponse, constants as SNconstants } from "starknet";
import { AccountChangeEventHandler, NetworkChangeEventHandler } from "get-starknet-core";

import { useStoreBlock, dataBlockInit } from "../Block/blockContext";
import { useStoreWallet } from '../../Wallet/walletContext';
import * as constants from "../../../../type/constants";



import { Text, Spinner, Center, Divider, Box, SimpleGrid, Button, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import React from 'react';
import RpcWalletCommand from './RpcWalletCommand';

function sendRequest(command: constants.CommandWallet, param: any) {

    return (
        <>
        </>
    )
}

export default function WalletHandle() {
    // wallet context
    const providerSN = useStoreWallet(state => state.provider);
    const wallet = useStoreWallet(state => state.wallet);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [respChangedAccount, setRespChangedAccount] = useState<string>("");
    const [respChangedNetwork, setRespChangedNetwork] = useState<string>("...");
    useEffect(
        () => {
            const handleAccount: AccountChangeEventHandler = (accounts: string[]) => { setRespChangedAccount(accounts[0]) };
            wallet?.on("accountsChanged", handleAccount);

            const handleNetwork: NetworkChangeEventHandler = (network: string | undefined) => {
                if (!!network) { setRespChangedNetwork(network) };
            }
            wallet?.on("networkChanged", handleNetwork);

            return () => {
                wallet?.off("accountsChanged", () => {});
                wallet?.off('networkChanged', () => {});
            }
        },
        []

    )

    function getTime():string {
        const date=new Date();
        return date.toLocaleTimeString();
    }

    return (
        <>
            <Center>'Invoke/declare/deploy account' recommended in Devnet in a fork of testnet</Center>
            <SimpleGrid minChildWidth="250px" spacing="20px" paddingBottom="20px">
                <Box bg="pink.200" color='black' borderWidth='1px' borderRadius='lg'>
                    <Center> Last accountsChanged event : </Center>
                    <Center>Time: {getTime()} </Center>
                    <Center>Response: {!!respChangedAccount? respChangedAccount.slice(0, 20) + "..." : "undefined"} </Center>
                </Box>
                <Box bg="pink.200" color='black' borderWidth='1px' borderRadius='lg'>
                    <Center> Last networkChanged event : </Center>
                    <Center>Time: {getTime()} </Center>
                    <Center>Response: {respChangedNetwork} </Center>
                </Box>
            </SimpleGrid>
            <SimpleGrid minChildWidth="305px" spacing="20px" paddingBottom="20px">
                <Box color='black' borderWidth='0px' borderRadius='lg'>
                    <Center> <Button bg='blue.300'>wallet_requestAccounts</Button> </Center>
                </Box>
                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_watchAsset}
                    param={constants.addrxASTR}
                    symbol={"xASTR"}
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_switchStarknetChain}
                    param={SNconstants.StarknetChainId.SN_MAIN}
                />

                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_addStarknetChain}
                    param={"ZORG"}
                    symbol={"ZORG"}
                />
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
                    <Center>.icon : {wallet?.icon.slice(0, 30)} </Center>
                </Box>
                <Box bg="green.200" color='black' borderWidth='1px' borderRadius='lg'>
                    <Center>.selectedAddress : {wallet?.selectedAddress?.slice(0, 20) + "..."} </Center>
                    <Center>.chainId : {!!(wallet?.chainId) ? wallet.chainId : "undefined"} </Center>
                    <Center>.isConnected : {!!(wallet?.isConnected) ? wallet.isConnected.toString() : "undefined"} </Center>
                </Box>
            </SimpleGrid>
        </>

    )
}

function useMyWallet(arg0: (state: any) => any) {
    throw new Error('Function not implemented.');
}
