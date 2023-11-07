
import { create } from "zustand";
import { ProviderInterface, AccountInterface } from "starknet";
import { StarknetWindowObject } from "get-starknet";
import { ServerProvider } from "@/app/ServerProvider/ServerProvider";

export interface WalletState {
    providerW: ProviderInterface | undefined,
    providerServer: ServerProvider | undefined,
    addressAccount: string,
    chainId: string,
    accountW: AccountInterface | undefined,
    isConnected: boolean,
    wallet: StarknetWindowObject | null,
}

export const useStoreWallet = create<WalletState>()((set) => ({
    providerW: undefined,
    providerServer: undefined,
    addressAccount: "",
    chainId: "",
    accountW: undefined,
    isConnected: false,
    wallet: null,
}));
