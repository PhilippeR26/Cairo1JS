"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { Center, Spinner, Text, Button, Divider, Box, Tabs, TabList, Tab, TabPanels, TabPanel, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, StackDivider } from '@chakra-ui/react';
import InteractContract from './components/client/Contract/InteractContract';
import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import { useStoreWallet } from './components/Wallet/walletContext';
//import { connect } from "get-starknet";
import starknetJsImg from '../../public/Images/StarkNet-JS_logo.png';
import WalletHandle from './components/client/WalletHandle/WalletHandle';
import SelectWallet from './components/client/WalletHandle/SelectWallet';
import LowerBanner from './components/client/LowerBanner';

export default function Page() {

    const displaySelectWalletUI = useStoreWallet(state => state.displaySelectWalletUI);
    const setSelectWalletUI = useStoreWallet(state => state.setSelectWalletUI);

    const addressAccountFromContext = useStoreWallet(state => state.address);
    const setAddressAccount = useStoreWallet(state => state.setAddressAccount);

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
                    Test experimental Braavos/ArgentX wallets
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
                                    <Tab>Wallet</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Box bg='pink.200' color='black' borderWidth='1px' borderRadius='md'>
                                            <p className={styles.text1}>
                                                address = {addressAccountFromContext}<br />
                                                chain = {chainFromContext}<br />
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
                                </TabPanels>
                            </Tabs>

                        </>
                    )
                    }
                </div>
                <LowerBanner></LowerBanner>
            </div >
        </ChakraProvider>
    )
}


