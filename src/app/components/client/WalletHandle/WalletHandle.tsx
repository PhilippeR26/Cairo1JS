import React from 'react';
import { useEffect, useState } from 'react';
import { Text, Spinner, Center, Divider, Box, SimpleGrid, Button, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip } from "@chakra-ui/react";
import { GetBlockResponse, constants as SNconstants, shortString } from "starknet";
import { AccountChangeEventHandler, NetworkChangeEventHandler } from "@/app/core/StarknetWindowObject";

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
                console.log("accounts=", accounts);
                if (!!accounts) {
                    const textAddr = formatAddress(accounts as unknown as string)
                    setRespChangedAccount(textAddr);
                };
                setTime1(getTime());
            };
            wallet?.on("accountsChanged", handleAccount);

            const handleNetwork: NetworkChangeEventHandler = (network: string | undefined) => {
                console.log("network=", network);
                if (!!network) { setRespChangedNetwork(network) };
                setTime2(getTime());
            }
            wallet?.on("networkChanged", handleNetwork);

            return () => {
                console.log("unsubscribe to events.");
                if (!!wallet) {
                    wallet.off("accountsChanged", () => {});
                    console.log("events OFF");
                    wallet.off('networkChanged', () => {});
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
                    command={constants.CommandWallet.wallet_watchAsset}
                    param={constants.addrxASTR}
                    symbol={"xASTR"}
                />
                <RpcWalletCommand
                    command={constants.CommandWallet.wallet_switchStarknetChain}
                    param={SNconstants.StarknetChainId.SN_MAIN} // none are working
                // param="SN_MAIN"
                // param="mainnet-alpha"
                // param={shortString.encodeShortString("mainnet-alpha")}
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
