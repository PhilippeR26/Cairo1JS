
import { create } from "zustand";
import {  ProviderInterface, AccountInterface } from "starknet";
import { StarknetWindowObject } from "get-starknet";

export interface WalletState {
    providerW:ProviderInterface|undefined,
    addressAccount:string,
    chainId:string,
    accountW:AccountInterface|undefined,
    isConnected:boolean,
    wallet:StarknetWindowObject|null,
}

export const useStoreWallet = create<WalletState>()((set) => ({
    providerW:undefined,
    addressAccount:"" ,
    chainId:"" ,
    accountW:undefined ,
    isConnected:false ,
    wallet:null ,
}));
