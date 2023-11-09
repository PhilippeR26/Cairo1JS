
import { create } from "zustand";
import { ServerProviderNextJS } from "@/app/(site)/Classes/ServerProvider/ServerProvider";
import { Account } from "starknet";
import { ServerSignerNextJS } from "@/app/(site)/Classes/ServerSigner/ServerSigner";

export interface ServerState {
    providerServer: ServerProviderNextJS | undefined,
    account0S: Account | undefined,
    account1S: Account | undefined,
    signer0S: ServerSignerNextJS | undefined,
    signer1S: ServerSignerNextJS | undefined,
}

export const useStoreServer = create<ServerState>()((set) => ({
    providerServer: undefined,
    setProviderServer: ()=>{set(state=>({providerServer:new ServerProviderNextJS()}))},
    account0S: undefined,
    account1S: undefined,
    signer0S: undefined,
    signer1S: undefined,
}));
