"use client";

import { Center, Button } from "@chakra-ui/react";
import DisplayBlockChain from "./Block/DisplayBlockchain";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import { useStoreWallet } from "./ConnectWallet/walletContext";
import WalletDisplay, { StateWallet } from "./ConnectWallet/DisplayWallet";
import PlayWithCairo1 from "./Contract/PlayWithCairo1";
import { useAccount, useConnect, useDisconnect, useProvider } from "@starknet-react/core";


export function DisplayConnected() {
    const isConnected = useStoreWallet(state => state.isConnected);
    const addressAccount = useStoreWallet(state => state.address);
    const chainId = useStoreWallet(state => state.chain);
    const { disconnect } = useDisconnect({});


    const stateWallet: StateWallet = {
        addressAccount: addressAccount,
        chainId: chainId,
        isConnected: isConnected
    }

    const { provider } = useProvider();
    console.log("DisplayConnected.tsx=", { provider });
    const { connect, connectors, error } = useConnect({});
    const { address } = useAccount();
    console.log("DisplayConnected.tsx=", { connect, connectors });
    console.log("DisplayConnected.tsx=", { address });

    return (
        <>
            {!isConnected ? (
                <>
                    <Center>

                        <ConnectWallet></ConnectWallet>
                    </Center>
                    <Center>
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
                            onClick={() => {
                                useStoreWallet.setState({ isConnected: false });
                                disconnect;
                            }}
                        >
                            {addressAccount
                                ? `Your wallet : ${addressAccount?.slice(0, 7)}...${addressAccount?.slice(-4)} is connected`
                                : "No Account"}
                        </Button>
                    </Center>
                    <br />
                    <WalletDisplay walletData={stateWallet} ></WalletDisplay>
                    <DisplayBlockChain ></DisplayBlockChain>
                    <PlayWithCairo1></PlayWithCairo1>
                </>
            )
            }
        </>
    )
}