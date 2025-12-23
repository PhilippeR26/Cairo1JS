"use client";

import { Center, Button } from "@chakra-ui/react";
import { useStoreWallet } from "./ConnectWallet/walletContext";
import SelectWallet from "./ConnectWallet/SelectWallet";
import PlayWithCairo1 from "./Contract/PlayWithCairo1";
import DisplayBlockChain from "./Block/DisplayBlockchain";
import WalletDisplay from "./ConnectWallet/WalletDisplay";
import DisplayEvents from "./ConnectWallet/DisplayEvents";
import { WalletConnectModal } from "@starknet-io/get-starknet-ui";
import { useConnect, StarknetWalletApi } from "@starknet-io/get-starknet-ui";


export function DisplayConnected() {
    const {
        address: addressAccount,
        chain: chainId,
        displaySelectWalletUI,
        setSelectWalletUI,
    } = useStoreWallet(state => state);
    const { connected } = useConnect();

    // const stateWallet: StateWallet = {
    //     addressAccount: addressAccount,
    //     chainId: chainId,
    //     isConnected: connected
    // }


    return (
        <>
        <Center>
            <WalletConnectModal />
        </Center>
        {connected && <>
            <WalletDisplay  ></WalletDisplay>
                    <DisplayBlockChain ></DisplayBlockChain>
                    <DisplayEvents></DisplayEvents>
                    <PlayWithCairo1></PlayWithCairo1>
            </>
            }
            </>
    )
}