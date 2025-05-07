"use client";

import { create } from "zustand";
import { ProviderInterface, AccountInterface, type WalletAccountV5 } from "starknet";
// import { WALLET_API } from "@starknet-io/types-js";
import type { WalletWithStarknetFeatures } from "getSnStandard/features";

export interface Wallet_state {
    walletWSF: WalletWithStarknetFeatures | undefined,
    setWalletWSF: (wallet: WalletWithStarknetFeatures) => void,
    address: string,
    setAddressAccount: (address: string) => void,
    chain: string,
    setChain: (chain: string) => void,
    myWalletAccount: WalletAccountV5 | undefined;
    setMyWalletAccount: (myWAccount: WalletAccountV5) => void;
    account: AccountInterface | undefined,
    setAccount: (account: AccountInterface) => void,
    provider: ProviderInterface | undefined,
    setProvider: (provider: ProviderInterface) => void,
    isConnected: boolean,
    setConnected: (isConnected: boolean) => void,
    displaySelectWalletUI: boolean,
    setSelectWalletUI: (displaySelectWalletUI: boolean) => void,
    walletApiList: string[],
    setWalletApiList: (version: string[]) => void,
    selectedApiVersion: string,
    setSelectedApiVersion: (version: string) => void,

}

export const useStoreWallet = create<Wallet_state>()(set => ({
    walletWSF: undefined,
    setWalletWSF: (wallet: WalletWithStarknetFeatures) => { set({ walletWSF: wallet }) },
    address: "",
    setAddressAccount: (address: string) => { set({ address }) },
    chain: "",
    setChain: (chain: string) => { set({ chain }) },
    myWalletAccount: undefined,
    setMyWalletAccount: (myWAccount: WalletAccountV5) => { set({ myWalletAccount: myWAccount }) },
    account: undefined,
    setAccount: (account: AccountInterface) => { set({ account }) },
    provider: undefined,
    setProvider: (provider: ProviderInterface) => { set({ provider }) },
    isConnected: false,
    setConnected: (isConnected: boolean) => { set({ isConnected }) },
    displaySelectWalletUI: false,
    setSelectWalletUI: (displaySelectWalletUI: boolean) => { set({ displaySelectWalletUI }) },
    walletApiList: [],
    setWalletApiList: (walletApi: string[]) => { set({ walletApiList: walletApi }) },
    selectedApiVersion: "default",
    setSelectedApiVersion: (selectedApiVersion: string) => { set({ selectedApiVersion }) },
}));
