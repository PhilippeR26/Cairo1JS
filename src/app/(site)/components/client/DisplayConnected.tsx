"use client";

import { Center, Button } from "@chakra-ui/react";
import { useStoreWallet } from "./ConnectWallet/walletContext";
import SelectWallet from "./ConnectWallet/SelectWallet";
import PlayWithCairo1 from "./Contract/PlayWithCairo1";
import DisplayBlockChain from "./Block/DisplayBlockchain";
import WalletDisplay, { type StateWallet } from "./ConnectWallet/WalletDisplay";

export function DisplayConnected() {
    const isConnected = useStoreWallet(state => state.isConnected);
    const setConnected = useStoreWallet(state => state.setConnected);

    const addressAccount = "0x123345634563464356";

    const displaySelectWalletUI = useStoreWallet(state => state.displaySelectWalletUI);
    const setSelectWalletUI = useStoreWallet(state => state.setSelectWalletUI);

    // Temporary. To be able to build.
    const stateWallet:StateWallet={addressAccount:"0x01",chainId:"0x54aa",isConnected:true};

    return (
        <>
            {!isConnected ? (
                <>
                    <Center>
                        <Button
                            variant="surface"
                            textDecoration="none !important"
                            fontWeight='bold'
                            outline="none !important"
                            boxShadow="none !important"
                            mt={3}
                            px={5}
                            onClick={() => setSelectWalletUI(true)}
                        // onClick={() => handleConnect330Click()}
                        >
                            Connect a Wallet
                        </Button>
                        {displaySelectWalletUI && <SelectWallet></SelectWallet>}
                    </Center>
                </>
            ) : (
                <>
                    <Center>
                        <Button
                            variant="surface"
                            textDecoration="none !important"
                            fontWeight='bold'
                            outline="none !important"
                            boxShadow="none !important"
                            mt={3}
                            px={5}
                            onClick={() => {
                                setConnected(false);
                                setSelectWalletUI(false)
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