import React from 'react';
import { useEffect, useState } from 'react';
import { Text, Spinner, Center, Divider, Box, SimpleGrid, Button, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip } from "@chakra-ui/react";
import { GetBlockResponse, constants as SNconstants, shortString } from "starknet";
import { AccountChangeEventHandler, NetworkChangeEventHandler } from "get-starknet-core";
import {  StarknetChainId } from "get-starknet-core";

import { useStoreBlock, dataBlockInit } from "../Block/blockContext";
import { useStoreWallet } from '../../Wallet/walletContext';
import * as constants from "../../../../utils/constants";
import styles from '../../../page.module.css'
import RpcWalletCommand from './RpcWalletCommand';
import { formatAddress } from '@/utils/utils';

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
    const [respChangedAccount, setRespChangedAccount] = useState<string>("N/A");
    const [respChangedNetwork, setRespChangedNetwork] = useState<string>("N/A");
    const [time1, setTime1] = useState<string>("N/A");
    const [time2, setTime2] = useState<string>("N/A");
    useEffect(
        () => {
            console.log("subscribe to events.");
            const handleAccount: AccountChangeEventHandler = (accounts: string[] | undefined) => {
                console.log("accounts change subscription=", accounts);
                if (accounts?.length) {
                    const textAddr = formatAddress(accounts[0])
                    setRespChangedAccount(textAddr);
                };
                setTime1(getTime());
            };
            wallet?.on("accountsChanged", handleAccount);

            const handleNetwork: NetworkChangeEventHandler = (chainId?: StarknetChainId, accounts?: string[]) => {
                console.log("network change subscription=", chainId);
                if (!!chainId) { setRespChangedNetwork(chainId) };
                setTime2(getTime());
            }
            wallet?.on("networkChanged", handleNetwork);

            return () => {
                console.log("unsubscribe to events.");
                if (!!wallet) {
                    wallet.off("accountsChanged", handleAccount);
                    console.log("events OFF");
                    wallet.off('networkChanged', handleNetwork);
                }
            }
        },
        []

    )

    function getTime(): string {
        const date = new Date();
        return date.toLocaleTimeString();
    }

    return (
        <>
            <Center></Center>
            <SimpleGrid minChildWidth="250px" spacing="20px" paddingBottom="20px">
                <Box bg="pink.200" color='black' borderWidth='1px' borderRadius='lg'>
                    <Center> Last accountsChanged event : </Center>
                    <Center>Time: {time1} </Center>
                    <Center>Response: {!!respChangedAccount ? respChangedAccount.slice(0, 20) + "..." : "undefined"} </Center>
                </Box>
                <Box bg="pink.200" color='black' borderWidth='1px' borderRadius='lg'>
                    <Center> Last networkChanged event : </Center>
                    <Center>Time: {time2} </Center>
                    <Center>Response: {respChangedNetwork} </Center>
                </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth="305px" spacing="20px" paddingBottom="20px">
                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_requestAccounts}
                    param=""
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_requestChainId}
                    param=""
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_watchAsset}
                    param={"0x62376175ba2ddc307b30813312d8f09796f777b8c24dd327a5cdd65c3539fba"}
                    symbol={"snjs6"}
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_switchStarknetChain}
                    param={SNconstants.StarknetChainId.SN_MAIN} 
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_addStarknetChain}
                    param="ZORG"
                />

                <RpcWalletCommand
                    command={constants.CommandWallet.starknet_addInvokeTransaction}
                    param="10"
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.starknet_addDeclareTransaction}
                    param="Object"
                    tip="Declare only once the same contract. Change contract in DAPP code each time."
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.starknet_addDeployAccountTransaction}
                    param="Object"
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.starknet_signTypedData}
                    param="Object"
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.starknet_supportedSpecs}
                    param=""
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_getPermissions}
                    param=""
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_deploymentData}
                    param=""
                />
            </SimpleGrid>

            <SimpleGrid minChildWidth="320px" spacing="20px" paddingBottom="20px">
                <Box bg="green.200" color='black' borderWidth='1px' borderRadius='lg'>
                    <Center>.id : {wallet?.id}</Center>
                    <Center>.name : {wallet?.name} </Center>
                    <Center>.version : {wallet?.version} </Center>
                    <Center>.icon : {typeof (wallet?.icon) === "string" ? wallet?.icon.slice(0, 30) : "day " + wallet?.icon.light.slice(0, 30) + " | " + wallet?.icon.dark.slice(0, 30)} </Center>
                </Box>
                {/*<Box bg="green.200" color='black' borderWidth='1px' borderRadius='lg'>*/}
                {/*    <Center>.selectedAddress : {wallet?.selectedAddress?.slice(0, 20) + "..."} </Center>*/}
                {/*    <Center>.chainId : {!!(wallet?.chainId) ? wallet.chainId : "undefined"} </Center>*/}
                {/*    <Center>.isConnected : {!!(wallet?.isConnected) ? wallet.isConnected.toString() : "undefined"} </Center>*/}
                {/*</Box>*/}
            </SimpleGrid>
        </>

    )
}

function useMyWallet(arg0: (state: any) => any) {
    throw new Error('Function not implemented.');
}