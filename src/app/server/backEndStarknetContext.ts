import { create } from "zustand";
import {  ProviderInterface, AccountInterface } from "starknet";

export interface BackendState {
    providerBackend:ProviderInterface|undefined,
    //setProviderBackend:(provider:ProviderInterface) =>void,

    accountBackend:AccountInterface|undefined,
    //setAccountBackend:(account:AccountInterface) =>void,
    counter:number,
}

export const useStoreBackend = create<BackendState>()(set => ({
    providerBackend:undefined ,
    //setProviderBackend:(provider:ProviderInterface)=>{set(state=>({providerBackend:provider}))},
    accountBackend:undefined ,
    //setAccountBackend:(account:AccountInterface)=>{set(state=>({accountBackend:account}))},
    accountW:undefined ,
    counter:10,
}));
