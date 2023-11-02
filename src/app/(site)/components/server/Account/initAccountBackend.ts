"use server";

import { Account, ProviderInterface, RpcProvider } from "starknet";
import { useStoreBackend } from "../backEndStarknetContext";

export async function initAccountBackend(address:string): Promise<Account> {
    const providerBackEnd = useStoreBackend(state => state.providerBackend);  
    if (!providerBackEnd) {throw new Error("new account backend : missing provider backend")} 
    const fakePK="0x123456789";// private key unknown by DAPP 
    return new Account(providerBackEnd,address,fakePK); // can not be used if signature needed (bacause pk is fake)
}