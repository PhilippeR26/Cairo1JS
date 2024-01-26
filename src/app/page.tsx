"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { Center, Spinner, Text, Button, Divider, Box, Tabs, TabList, Tab, TabPanels, TabPanel, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, StackDivider } from '@chakra-ui/react';
import { MdBuild } from "react-icons/md"
import InteractContract from './components/client/Contract/InteractContract';
import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import { useStoreWallet } from './components/Wallet/walletContext';


import { Permission, StarknetChainId, StarknetWindowObject, } from "./core/StarknetWindowObject";
//import { connect } from "get-starknet";

import starknetJsImg from '../../public/Images/StarkNet-JS_logo.png';
import WalletHandle from './components/client/WalletHandle/WalletHandle';
import { scanObjectForWallets } from './core/wallet/scan';
import { isWalletObj } from './core/wallet/isWalletObject';
import { callRequest } from './components/client/WalletHandle/callRequest';
import { isBooleanObject } from 'util/types';
import { formatAddress } from '@/utils/utils';
import SelectWallet from './components/client/WalletHandle/SelectWallet';
import WalletAccount from './components/client/WalletHandle/WalletAccount';
import { encode, shortString } from 'starknet';
import { useFrontendProvider } from './components/client/provider/providerContext';

export default function Page() {

    const displaySelectWalletUI = useStoreWallet(state => state.displaySelectWalletUI);
    const setSelectWalletUI = useStoreWallet(state => state.setSelectWalletUI);

    const addressAccountFromContext = useStoreWallet(state => state.address);
    const setAddressAccount = useStoreWallet(state => state.setAddressAccount);

    const myFrontendProviderIndex = useFrontendProvider(state => state.currentFrontendProviderIndex);
    const setCurrentFrontendProviderIndex = useFrontendProvider(state => state.setCurrentFrontendProviderIndex);

    const myWallet = useStoreWallet(state => state.wallet);
    const setMyWallet = useStoreWallet(state => state.setMyWallet);

    const chainFromContext = useStoreWallet(state => state.chain);
    const setChain = useStoreWallet(state => state.setChain);

    const accountFromContext = useStoreWallet(state => state.account);
    const setAccount = useStoreWallet(state => state.setAccount);

    const providerFromContext = useStoreWallet(state => state.provider);
    const setProvider = useStoreWallet(state => state.setProvider);

    const isConnected = useStoreWallet(state => state.isConnected);
    const setConnected = useStoreWallet(state => state.setConnected);





    return (
        <ChakraProvider>
            <div>
                <p className={styles.bgText}>
                    Test experimental wallet with starknet.js v6.0.0-Beta.10
                </p>
                <Center>
                    <Image src={starknetJsImg} alt='starknet.js' width={150} />
                </Center>
                <div>
                    {!isConnected ? (
                        <>
                            <Center>
                                <Button
                                    ml="4"
                                    textDecoration="none !important"
                                    outline="none !important"
                                    boxShadow="none !important"
                                    marginTop={3}
                                    onClick={() => setSelectWalletUI(true)}
                                >
                                    Connect a Wallet
                                </Button>
                                {displaySelectWalletUI ? <SelectWallet></SelectWallet> : null}

                            </Center>
                        </>
                    ) : (
                        <>
                            <Center>
                                <Button
                                    ml="4"
                                    textDecoration="none !important"
                                    outline="none !important"
                                    boxShadow="none !important"
                                    marginTop={3}
                                    onClick={() => {
                                        setConnected(false);
                                        setSelectWalletUI(false)
                                    }}
                                >
                                    {addressAccountFromContext
                                        ? `Your wallet : ${addressAccountFromContext?.slice(0, 7)}...${addressAccountFromContext?.slice(-4)} is connected`
                                        : "No Account"}
                                </Button>
                            </Center>
                            <br />
                            <Tabs variant="enclosed" colorScheme='facebook' size="lg" isFitted >
                                <TabList >
                                    <Tab> BlockChain</Tab>
                                    <Tab>Wallet API</Tab>
                                    <Tab>WalletAccount</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Box bg='pink.200' color='black' borderWidth='1px' borderRadius='md'>
                                            <p className={styles.text1}>
                                                address = {addressAccountFromContext}<br />
                                                chain = {chainFromContext!=""? shortString.decodeShortString(chainFromContext):""}
                                                <br />
                                                provider = my frontend provider for {Object.keys(StarknetChainId)[myFrontendProviderIndex] 
                                                 }
                                                <br />
                                                isConnected={isConnected ? "Yes" : "No"}

                                            </p>
                                        </Box>
                                        {!!providerFromContext &&
                                            <InteractContract ></InteractContract>}
                                    </TabPanel>
                                    <TabPanel>
                                        <p></p>
                                        <WalletHandle></WalletHandle>
                                    </TabPanel>
                                    <TabPanel>
                                        <WalletAccount></WalletAccount>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </>
                    )
                    }
                </div>
            </div >
        </ChakraProvider>
    )
}


