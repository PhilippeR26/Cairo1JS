
import { create } from "zustand";
import { ServerProviderNextJS } from "@/app/ServerProvider/ServerProvider";

export interface ProviderState {
    providerServer: ServerProviderNextJS | undefined,
}

export const useStoreProvider = create<ProviderState>()((set) => ({
    providerServer: undefined,
    setProviderServer: ()=>{set(state=>({providerServer:new ServerProviderNextJS()}))}
}));
