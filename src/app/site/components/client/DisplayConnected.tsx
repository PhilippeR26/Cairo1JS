"use client";

import { Center, Button, Box } from "@chakra-ui/react";
import DisplayBlockChain from "./Block/DisplayBlockchain";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import { useStoreWallet } from "./ConnectWallet/walletContext";
// import { SpecialButton } from "./SpecialButton";

// import styles from './page.module.css'
import PlayWithCairo1 from "./Contract/PlayWithCairo1";


export function DisplayConnected() {
    const isConnected = useStoreWallet(state => state.isConnected);
    const accountW = useStoreWallet(state => state.accountW);
    const addressAccount = useStoreWallet(state => state.addressAccount);
    const chainId = useStoreWallet(state => state.chainId);
    const stateWallet: StateWallet = {
        addressAccount: addressAccount,
        chainId: chainId,
        isConnected: isConnected
    }
    // const providerB=await providerBackend();

    return (
        <>
            {!isConnected ? (
                <>
                    <Center>
                        <ConnectWallet></ConnectWallet>
                    </Center>
                    <Center>
                        {/* <SpecialButton ></SpecialButton > */}
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
                            }}
                        >
                            {accountW
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