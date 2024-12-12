"use client";

import { useStoreWallet } from './walletContext';
import { Button, Center } from "@chakra-ui/react";
import { WALLET_API } from '@starknet-io/types-js';
import { validateAndParseAddress, wallet, WalletAccount, constants as SNconstants } from 'starknet';
import { myFrontendProviders } from '@/utils/constants';
import { useFrontendProvider } from '../provider/providerContext';
import WrongWallet from '../WrongWallet';
import { useState } from 'react';
import { useAccount, useConnect, useProvider } from "@starknet-react/core";
import SelectWallet from './SelectWallet';

export default function ConnectWallet() {
    const [isError, setError] = useState<boolean>(false);

    const displaySelectWalletUI = useStoreWallet(state => state.displaySelectWalletUI);
    const setSelectWalletUI = useStoreWallet(state => state.setSelectWalletUI);

    const isConnected = useStoreWallet(state => state.isConnected);
    const setConnected = useStoreWallet(state => state.setConnected);

    const setMyWallet = useStoreWallet(state => state.setMyStarknetWalletObject);

    const setMyWalletAccount = useStoreWallet(state => state.setMyWalletAccount);

    const setChain = useStoreWallet(state => state.setChain);
    const setAddressAccount = useStoreWallet(state => state.setAddressAccount);

    const setCurrentFrontendProviderIndex = useFrontendProvider(state => state.setCurrentFrontendProviderIndex);

    const setWalletApi = useStoreWallet(state => state.setWalletApiList);

    const { provider } = useProvider();
    console.log("ConnectWallet.tsx=", { provider });
    const { connect, connectors, error } = useConnect({});
    const { address } = useAccount();
    console.log("ConnectWallet.tsx=", { connect, connectors });
    console.log("ConnectWallet.tsx=", { address });


    // async function selectW() {
    //     setError(false);
    //     //  connect();
    //     // if (myWalletSWO) {
    //     //     const isValid = await checkCompatibility(myWalletSWO);
    //     //     setError(!isValid);
    //     //     if (isValid) { await handleSelectedWallet(myWalletSWO); }
    //     // }
    // }

    // const checkCompatibility = async (myWalletSWO: WALLET_API.StarknetWindowObject) => {
    //     // verify compatibility of wallet with the new API of get-starknet v4
    //     let isCompatible: boolean = false;
    //     try {
    //         await myWalletSWO.request({ type: "wallet_supportedSpecs" });
    //         isCompatible = true;
    //     } catch {
    //         (_err: any) => { console.log("Wallet compatibility failed.") };
    //     }
    //     return isCompatible;
    // }

    // const handleSelectedWallet = async (selectedWallet: WALLET_API.StarknetWindowObject) => {
    //     console.log("Trying to connect wallet=", selectedWallet);
    //     setMyWallet(selectedWallet); // zustand
    //     setMyWalletAccount(new WalletAccount(myFrontendProviders[2], selectedWallet));

    //     const result = await wallet.requestAccounts(selectedWallet);
    //     if (typeof (result) == "string") {
    //         console.log("This Wallet is not compatible.");
    //         return;
    //     }
    //     console.log("Current account addr =", result);
    //     if (Array.isArray(result)) {
    //         const addr = validateAndParseAddress(result[0]);
    //         setAddressAccount(addr); // zustand
    //     }
    //     const isConnectedWallet: boolean = await wallet.getPermissions(selectedWallet).then((res: any) => (res as WALLET_API.Permission[]).includes(WALLET_API.Permission.ACCOUNTS));
    //     setConnected(isConnectedWallet); // zustand
    //     if (isConnectedWallet) {
    //         const chainId = (await wallet.requestChainId(selectedWallet)) as string;
    //         setChain(chainId);
    //         setCurrentFrontendProviderIndex(chainId === SNconstants.StarknetChainId.SN_MAIN ? 0 : 2);
    //         console.log("change Provider index to :", chainId === SNconstants.StarknetChainId.SN_MAIN ? 0 : 2);
    //     }
    //     // ********** TODO : replace supportedSpecs by api versions when available in SNJS & wallets
    //     setWalletApi(await wallet.supportedSpecs(selectedWallet));
    // }


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
                                    setConnected(false);
                                    setSelectWalletUI(false)
                                }}
                            >
                                {address
                                    ? `Your wallet : ${address?.slice(0, 7)}...${address?.slice(-4)} is connected`
                                    : "No Account"}
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
