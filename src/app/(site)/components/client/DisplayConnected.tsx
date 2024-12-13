"use client";

import { Center } from "@chakra-ui/react";
import DisplayBlockChain from "./Block/DisplayBlockchain";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import WalletDisplay, { StateWallet } from "./ConnectWallet/DisplayWallet";
import PlayWithCairo1 from "./Contract/PlayWithCairo1";
import { useAccount, useNetwork } from "@starknet-react/core";
import DisplayBalances from "./token/DisplayBalances";


export function DisplayConnected() {
    const { chain } = useNetwork();
    const { address, isConnected, connector } = useAccount();
    const stateWallet: StateWallet = {
        addressAccount: address ?? "",
        chainId: chain.name,
        isConnected: isConnected ?? false,
        connector
    }

    return (
        <>
            <Center>
                <ConnectWallet></ConnectWallet>
            </Center>
            {address && (
                <>
                    <br />
                    <WalletDisplay walletData={stateWallet} ></WalletDisplay>
                    <DisplayBlockChain ></DisplayBlockChain>
                    <DisplayBalances></DisplayBalances>
                    <PlayWithCairo1></PlayWithCairo1>
                </>
            )
            }
        </>
    )
}