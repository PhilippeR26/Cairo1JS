
import { create } from "zustand";
import { ProviderInterface, AccountInterface, Account } from "starknet";
import { StarknetWindowObject } from "get-starknet";
import { ServerProviderNextJS } from "@/app/(site)/Classes/ServerProvider/ServerProvider";
import { ServerSignerNextJS } from "@/app/(site)/Classes/ServerSigner/ServerSigner";

export interface WalletState {
    providerW: ProviderInterface | undefined,
    providerServer: ServerProviderNextJS | undefined,
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
