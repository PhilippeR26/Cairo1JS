"use client";

import { create } from "zustand";
export interface Wallet_state {
    displaySelectWalletUI: boolean,
    setSelectWalletUI: (displaySelectWalletUI: boolean) => void,
};

export const useStoreWallet = create<Wallet_state>()(set => ({
    displaySelectWalletUI: false,
    setSelectWalletUI: (displaySelectWalletUI: boolean) => { set(_state => ({ displaySelectWalletUI })) },
}));
