"use client";

import { useStoreWallet } from './walletContext';
import { Center } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
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
                  variant="surface"
                  ml={4}
                  px={5}
                  fontWeight='bold'
                  
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
                                variant="surface"
                                ml={4}
                                px={5}
                                fontWeight='bold'
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
