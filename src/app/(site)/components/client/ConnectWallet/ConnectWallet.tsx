"use client";

import { useStoreWallet } from './walletContext';
import { Button, Center } from "@chakra-ui/react";
import { useAccount, useDisconnect } from "@starknet-react/core";
import SelectWallet from './SelectWallet';

export default function ConnectWallet() {
    const displaySelectWalletUI = useStoreWallet(state => state.displaySelectWalletUI);
    const setSelectWalletUI = useStoreWallet(state => state.setSelectWalletUI);

    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();


    return (
        <>
            {!isConnected ? (
                <>
                    <Button
                        ml="4"
                        textDecoration="none !important"
                        outline="none !important"
                        boxShadow="none !important"
                        onClick={() => {
                            console.log("a");
                            setSelectWalletUI(true)
                        }}
                    >
                        Connect Wallet
                    </Button>
                    {displaySelectWalletUI && <SelectWallet></SelectWallet>}
                </>
            ) : (
                <>
                    {address ?
                        <Center>
                            <Button
                                ml="4"
                                textDecoration="none !important"
                                outline="none !important"
                                boxShadow="none !important"
                                marginTop={3}
                                onClick={() => {
                                    disconnect();
                                    setSelectWalletUI(false)
                                }}
                            >
                                {`Your wallet : ${address?.slice(0, 7)}...${address?.slice(-4)} is connected`
                                }
                            </Button>
                        </Center>
                        : "No address"
                    }
                </>
            )
            }
        </>
    )
}
