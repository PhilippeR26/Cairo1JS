
import { create } from "zustand";
import {  ProviderInterface, AccountInterface } from "starknet";
import { StarknetWindowObject } from "get-starknet";

export interface WalletState {
    addressAccount:string,
    //setAddressAccount:(address:string) =>void,
    chainId:string,
    //setChain:(chain:string) =>void,
    accountW:AccountInterface|undefined,
    //setAccountW:(accountW:AccountInterface) =>void,
    isConnected:boolean,
    //setConnected:(connected:boolean)=>void,
    wallet:StarknetWindowObject|null,
    //setWallet:(wallet:StarknetWindowObject|null)=>void,
}

export const useStoreWallet = create<WalletState>()((set) => ({
    addressAccount:"" ,
    //setAddressAccount:(addressAccount:string)=>{set(state=>({addressAccount:addressAccount}))},
    chainId:"" ,
    //setChain:(chain:string)=>{set(state=>({chain:chain}))},
    accountW:undefined ,
    //setAccountW:(accountW:AccountInterface)=>{set(state=>({accountW:accountW}))},
    isConnected:false ,
    //setConnected:(connected:boolean)=>{set(state=>({isConnected:connected}))},
    wallet:null ,
    //setWallet:(wallet:StarknetWindowObject|null)=>{set(state=>({wallet:wallet}))},
}));
