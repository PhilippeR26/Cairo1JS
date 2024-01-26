import { Permission, StarknetChainId, StarknetWindowObject } from "@/app/core/StarknetWindowObject";
import { Box, Button, Center, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, StackDivider, VStack, useDisclosure } from "@chakra-ui/react";
import { useStoreWallet } from "../../Wallet/walletContext";
import { useFrontendProvider } from "../provider/providerContext";
import { useEffect } from "react";
import { scanObjectForWallets } from "@/app/core/wallet/scan";
import { isWalletObj } from "@/app/core/wallet/isWalletObject";
import { useState } from "react";
import { Response, callRequest } from "./callRequest";
import { formatAddress } from "@/utils/utils";

export default function SelectWallet() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const myWallet = useStoreWallet(state => state.wallet);
    const setMyWallet = useStoreWallet(state => state.setMyWallet);

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