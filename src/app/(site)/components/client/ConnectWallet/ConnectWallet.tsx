"use client";

import { useStoreWallet } from './walletContext';
import { Box, Button, Center, Text } from "@chakra-ui/react";
//import { connect } from '@starknet-io/get-starknet';
import { WALLET_API, type StarknetWindowObject } from '@starknet-io/types-js';
import { validateAndParseAddress, wallet, WalletAccount, constants as SNconstants } from 'starknet';
import { myFrontendProviders } from '@/utils/constants';
import { useFrontendProvider } from '../provider/providerContext';
import WrongWallet from '../WrongWallet';
import { useState } from 'react';
import { connect } from 'starknetkit';
import { ArgentMobileConnector } from 'starknetkit/argentMobile';

export default function ConnectWallet() {
    const [isError, setError] = useState<boolean>(false);
    const [isAXM, setIsAXM] = useState<string>("");
    const [responseW, setResponseW] = useState<string>("");

    const myWallet = useStoreWallet(state => state.StarknetWalletObject);
    const setMyWallet = useStoreWallet(state => state.setMyStarknetWalletObject);

    const myWalletAccount = useStoreWallet(state => state.myWalletAccount);
    const setMyWalletAccount = useStoreWallet(state => state.setMyWalletAccount);

    const setChain = useStoreWallet(state => state.setChain);
    const setAddressAccount = useStoreWallet(state => state.setAddressAccount);

    const isConnected = useStoreWallet(state => state.isConnected);
    const setConnected = useStoreWallet(state => state.setConnected);

    const myFrontendProviderIndex = useFrontendProvider(state => state.currentFrontendProviderIndex);
    const setCurrentFrontendProviderIndex = useFrontendProvider(state => state.setCurrentFrontendProviderIndex);

    const setWalletApi = useStoreWallet(state => state.setWalletApiList);


    async function selectW() {
        // setError(false);
        // const myWalletSWO = await connect({ modalMode: "alwaysAsk" });
        // if (myWalletSWO) {
        //     const isValid = await checkCompatibility(myWalletSWO);
        //     setError(!isValid);
        //     if (isValid) { await handleSelectedWallet(myWalletSWO); }
        // }
        // if (typeof window === "undefined") {
        //     return false
        // }

        // if (!window?.starknet_argentX) {
        //     return false
        // }

        // const starknetMobile =
        //     window?.starknet_argentX as unknown as StarknetWindowObject & {
        //         isInAppBrowser: boolean
        //     };
        // const reduced={...starknetMobile, icon:"e"};
        // console.log(reduced);
        // setResponseW(JSON.stringify(reduced));
        // setIsAXM(starknetMobile?.isInAppBrowser ? "true" : "false");
        // console.log(starknetMobile?.isInAppBrowser);
        const { wallet } = await connect({});
        const reduced={...wallet, icon:"e"};
         console.log(reduced);
         setResponseW(JSON.stringify(reduced));

    }

    const checkCompatibility = async (myWalletSWO: WALLET_API.StarknetWindowObject) => {
        // verify compatibility of wallet with the new API of get-starknet v4
        let isCompatible: boolean = false;
        try {
            await myWalletSWO.request({ type: "wallet_supportedSpecs" });
            isCompatible = true;
        } catch {
            (err: any) => { console.log("Wallet compatibility failed.") };
        }
        return isCompatible;
    }

    const handleSelectedWallet = async (selectedWallet: WALLET_API.StarknetWindowObject) => {
        console.log("Trying to connect wallet=", selectedWallet);
        setMyWallet(selectedWallet); // zustand
        setMyWalletAccount(new WalletAccount(myFrontendProviders[2], selectedWallet));

        const result = await wallet.requestAccounts(selectedWallet);
        if (typeof (result) == "string") {
            console.log("This Wallet is not compatible.");
            return;
        }
        console.log("Current account addr =", result);
        if (Array.isArray(result)) {
            const addr = validateAndParseAddress(result[0]);
            setAddressAccount(addr); // zustand
        }
        const isConnectedWallet: boolean = await wallet.getPermissions(selectedWallet).then((res: any) => (res as WALLET_API.Permission[]).includes(WALLET_API.Permission.ACCOUNTS));
        setConnected(isConnectedWallet); // zustand
        if (isConnectedWallet) {
            const chainId = (await wallet.requestChainId(selectedWallet)) as string;
            setChain(chainId);
            setCurrentFrontendProviderIndex(chainId === SNconstants.StarknetChainId.SN_MAIN ? 0 : 2);
            console.log("change Provider index to :", chainId === SNconstants.StarknetChainId.SN_MAIN ? 0 : 2);
        }
        // ********** TODO : replace supportedSpecs by api versions when available in SNJS & wallets
        setWalletApi(await wallet.supportedSpecs(selectedWallet));
    }


    return (
        <>
            <Button
                ml="4"
                textDecoration="none !important"
                outline="none !important"
                boxShadow="none !important"
                onClick={() => selectW()}
            >
                Connect ArgentX mobile Wallet
            </Button>
            {isError && <WrongWallet></WrongWallet>}
            <Text align='left' >
                <br></br>
                <br></br>
                responseW={responseW}
                <br></br>
                isAXM={isAXM}
            </Text>
        </>
    )
}
