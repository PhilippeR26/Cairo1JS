import type { StarknetWindowObject as SNWO } from "get-starknet-core";
type StarknetWindowObject = typeof SNWO;




//import  { Permission  } from "get-starknet-core";
//   import  { Permission as PERM } from "get-starknet-core";
//  type Permission=typeof PERM;

import { Box, Button, Center, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, StackDivider, VStack, useDisclosure } from "@chakra-ui/react";
import { useStoreWallet } from "../../Wallet/walletContext";
import { useEffect } from "react";
import { useState } from "react";
import { Response, callRequest } from "./callRequest";
import { formatAddress } from "@/utils/utils";
import { isWalletObj, scanObjectForWallets } from "@/core/scanWallet";

enum Permission {
    Accounts = "accounts",
}

export default function SelectWallet() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const myWallet = useStoreWallet(state => state.wallet);
    const setMyWallet = useStoreWallet(state => state.setMyWallet);

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
        console.log("wallet permissioned");
        setConnected(isConnectedWallet); // zustand
        if (isConnected) {
            const chainId = await callRequest({ type: "wallet_requestChainId" });
            setChain(`${chainId}`);
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