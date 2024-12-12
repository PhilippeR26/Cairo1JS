"use client";

import { create } from "zustand";
import { ProviderInterface, AccountInterface, type WalletAccount } from "starknet";
import { WALLET_API } from "@starknet-io/types-js";
import type { Connector } from "@starknet-react/core";

export interface Wallet_state {
    StarknetWalletObject: WALLET_API.StarknetWindowObject | undefined,
    setMyStarknetWalletObject: (wallet: WALLET_API.StarknetWindowObject) => void,
    address: string,
    setAddressAccount: (address: string) => void,
    chain: string,
    setChain: (chain: string) => void,
    myWalletAccount: WalletAccount | undefined;
    setMyWalletAccount: (myWAccount: WalletAccount) => void;
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
    connectorsContext:Connector[],
    setConnectorsContext: (connectors:Connector[])=>void,
}

export const useStoreWallet = create<Wallet_state>()(set => ({
    StarknetWalletObject: undefined,
    setMyStarknetWalletObject: (wallet: WALLET_API.StarknetWindowObject) => { set(_state => ({ StarknetWalletObject: wallet })) },
    address: "",
    setAddressAccount: (address: string) => { set(_state => ({ address })) },
    chain: "",
    setChain: (chain: string) => { set(_state => ({ chain: chain })) },
    myWalletAccount: undefined,
    setMyWalletAccount: (myWAccount: WalletAccount) => { set(_state => ({ myWalletAccount: myWAccount })) },
    account: undefined,
    setAccount: (account: AccountInterface) => { set(_state => ({ account })) },
    provider: undefined,
    setProvider: (provider: ProviderInterface) => { set(_state => ({ provider: provider })) },
    isConnected: false,
    setConnected: (isConnected: boolean) => { set(_state => ({ isConnected })) },
    displaySelectWalletUI: false,
    setSelectWalletUI: (displaySelectWalletUI: boolean) => { set(_state => ({ displaySelectWalletUI })) },
    walletApiList: [],
    setWalletApiList: (walletApi: string[]) => { set(_state => ({ walletApiList: walletApi })) },
    selectedApiVersion: "default",
    setSelectedApiVersion: (selectedApiVersion: string) => { set(_state => ({ selectedApiVersion })) },
    connectorsContext:[],
    setConnectorsContext: (connectors:Connector[])=>{set(_state => ({connectorsContext:connectors}))},
}));
