"use client";
import { create } from "zustand";
import { GetBlockResponse, Provider,RpcProvider, ProviderInterface, AccountInterface } from "starknet";

export interface WalletState {
    address:string,
    setAddressAccount:(address:string) =>void,
    chain:string,
    setChain:(chain:string) =>void,
    account:AccountInterface|undefined,
    setAccount:(account:AccountInterface) =>void,
    provider:ProviderInterface|undefined,
    setProvider:(provider:ProviderInterface) =>void,
}

export const useStoreWallet = create<WalletState>()(set => ({
    address:"" ,
    setAddressAccount:(address:string)=>{set(state=>({address:address}))},
    chain:"" ,
    setChain:(chain:string)=>{set(state=>({chain:chain}))},
    account:undefined ,
    setAccount:(account:AccountInterface)=>{set(state=>({account:account}))},
    provider:undefined ,
    setProvider:(provider:ProviderInterface)=>{set(state=>({provider:provider}))},
}));
