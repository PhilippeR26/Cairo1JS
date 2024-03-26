import { Permission, StarknetChainId } from "get-starknet/packages/core/src/main";
import {  StarknetWindowObject } from "get-starknet/packages/core/src/main";
import { Box, Button, Center, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, StackDivider, VStack, useDisclosure } from "@chakra-ui/react";
import { useStoreWallet } from "../../Wallet/walletContext";
import { useFrontendProvider } from "../provider/providerContext";
import { useEffect } from "react";
import { scanObjectForWallets } from "get-starknet/packages/core/src/wallet/scan";
import { isWalletObj } from "get-starknet/packages/core/src/wallet/isWalletObject";
import { useState } from "react";
import { Response, callRequest } from "./callRequest";
import { formatAddress } from "@/utils/utils";
import { WalletAccount } from "starknet";
import { myFrontendProviders } from "@/utils/constants";

// export interface StarknetWalletProvider extends StarknetWindowObject {}


export default function SelectWallet() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const myWallet = useStoreWallet(state => state.walletObject);
    const setMyWallet = useStoreWallet(state => state.setMyWalletObject);
    
    const myWalletAccount = useStoreWallet(state => state.myWalletAccount);
    const setMyWalletAccount = useStoreWallet(state => state.setMyWalletAccount);
    const myFrontendProviderIndex = useFrontendProvider(state => state.currentFrontendProviderIndex);
    const setCurrentFrontendProviderIndex = useFrontendProvider(state => state.setCurrentFrontendProviderIndex);

    const isConnected = useStoreWallet(state => state.isConnected);
    const setConnected = useStoreWallet(state => state.setConnected);

    const displaySelectWalletUI = useStoreWallet(state => state.displaySelectWalletUI);
    const setSelectWalletUI = useStoreWallet(state => state.setSelectWalletUI);

    const setChain = useStoreWallet(state => state.setChain);
    const setAddressAccount = useStoreWallet(state => state.setAddressAccount);

    const [walletList, setWalletList] = useState<StarknetWindowObject[]>([]);

    const handleSelectedWallet = async (wallet: StarknetWindowObject) => {
        console.log("Trying to connect wallet=", wallet);
        setMyWallet(wallet); // zustand
        setMyWalletAccount(new WalletAccount(myFrontendProviders[2], wallet));

        const result = await callRequest({ type: "wallet_requestAccounts" });
        if (typeof (result) == "string") {
            console.log("This Wallet is not compatible.");
            setSelectWalletUI(false);
            return;
        }
        console.log("Current account addr =", result);
        if (Array.isArray(result)) {
            const addr = formatAddress(result[0]);
            setAddressAccount(addr); // zustand
        }
        const isConnectedWallet: boolean = await callRequest({ type: "wallet_getPermissions" }).then(res => (res as Permission[])?.includes(Permission.Accounts));
        setConnected(isConnectedWallet); // zustand
        if (isConnectedWallet) {
            const chainId = (await callRequest({ type: "wallet_requestChainId" })) as string;
            setChain(chainId);
            setCurrentFrontendProviderIndex((Object.values(StarknetChainId) as string[]).indexOf(chainId));
            console.log("change Provider index to :",myFrontendProviderIndex);
        }
        setSelectWalletUI(false);
        // console.log("End of handleSelectedWallet", isConnected);
    }

    useEffect(
        () => {
            console.log("Launch select wallet window.");
            const wallets: StarknetWindowObject[] = scanObjectForWallets(window, isWalletObj);
            setWalletList(wallets);
            onOpen();
            return () => { }
        },
        []
    )

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setSelectWalletUI(false);
                onClose()
            }}
            closeOnOverlayClick={true}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize='lg' fontWeight='bold'>
                    Select a wallet.
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={3}
                        align='stretch'
                    >
                        {
                            walletList.map((wallet: StarknetWindowObject, index: number) => {
                                const iconW: string = typeof (wallet.icon) == "string" ? wallet.icon : wallet.icon.light;
                                return <>
                                    <Button id={"wId" + index.toString()}
                                        leftIcon={<Image src={iconW} width={30} />}
                                        onClick={() => {
                                            handleSelectedWallet(wallet);
                                            onClose()
                                        }} >{wallet.name + ' ' + wallet.version}
                                    </Button>
                                </>
                            })

                        }
                    </VStack>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}