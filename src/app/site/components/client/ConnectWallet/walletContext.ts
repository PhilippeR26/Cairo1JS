
import { create } from "zustand";
import {  ProviderInterface, AccountInterface, RpcProvider } from "starknet";
import { StarknetWindowObject } from "get-wallet-starknet-ui";

export interface WalletState {
    providerW:RpcProvider|undefined,
    myProvider:RpcProvider,
    addressAccount:string,
    chainId:string,
    accountW:AccountInterface|undefined,
    isConnected:boolean,
    wallet:StarknetWindowObject|null,
}

export const useStoreWallet = create<WalletState>()((set) => ({
    providerW:undefined,
    myProvider: new RpcProvider({ nodeUrl: "https://starknet-testnet.public.blastapi.io/rpc/v0.5" }),
    addressAccount:"" ,
    chainId:"" ,
    accountW:undefined ,
    isConnected:false ,
    wallet:null ,
}));
