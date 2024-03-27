"use client";
import { create } from "zustand";
import { ProviderInterface, AccountInterface, type WalletAccount } from "starknet";
import {  StarknetWindowObject } from "get-starknet/packages/core";

// import { StarknetWindowObject } from "@/app/core/StarknetWindowObject";

export interface WalletState {
    walletObject: StarknetWindowObject | undefined,
    setMyWalletObject: (wallet: StarknetWindowObject) => void,
    address: string,
    setAddressAccount: (address: string) => void,
    chain: string,
    setChain: (chain: string) => void,
    myWalletAccount: WalletAccount|undefined;
    setMyWalletAccount: (myWAccount:WalletAccount)=>void;
    account: AccountInterface | undefined,
    setAccount: (account: AccountInterface) => void,
    provider: ProviderInterface | undefined,
    setProvider: (provider: ProviderInterface) => void,
    isConnected: boolean,
    setConnected: (isConnected: boolean) => void,
    displaySelectWalletUI: boolean,
    setSelectWalletUI: (displaySelectWalletUI: boolean) => void,
}

export const useStoreWallet = create<WalletState>()(set => ({
    walletObject: undefined,
    setMyWalletObject: (wallet: StarknetWindowObject) => { set(state => ({ walletObject: wallet })) },
    address: "",
    setAddressAccount: (address: string) => { set(state => ({ address })) },
    chain: "",
    setChain: (chain: string) => { set(state => ({ chain: chain })) },
    myWalletAccount: undefined,
    setMyWalletAccount: (myWAccount: WalletAccount) => { set(state => ({ myWalletAccount: myWAccount })) },
    account: undefined,
    setAccount: (account: AccountInterface) => { set(state => ({ account })) },
    provider: undefined,
    setProvider: (provider: ProviderInterface) => { set(state => ({ provider: provider })) },
    isConnected: false,
    setConnected: (isConnected: boolean) => { set(state => ({ isConnected })) },
    displaySelectWalletUI: false,
    setSelectWalletUI: (displaySelectWalletUI: boolean) => { set(state => ({ displaySelectWalletUI })) },
}));
