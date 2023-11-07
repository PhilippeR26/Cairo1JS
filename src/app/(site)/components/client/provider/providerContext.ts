
import { create } from "zustand";
import { ServerProvider } from "@/app/ServerProvider/ServerProvider";

export interface ProviderState {
    providerServer: ServerProvider | undefined,
}

export const useStoreProvider = create<ProviderState>()((set) => ({
    providerServer: undefined,
    setProviderServer: ()=>{set(state=>({providerServer:new ServerProvider()}))}
}));
