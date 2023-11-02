"use server";

import { ProviderInterface, RpcProvider } from "starknet";
import { useStoreBackend } from "../backEndStarknetContext";

export async function setProviderBackend() {
    if (!process.env.PROVIDER) {
        throw new Error("No backend provider defined.");
    }
    const prov=process.env.PROVIDER;
    console.log("prov env =",prov);
    useStoreBackend.setState({counter: 20});
    console.log("counterA=",useStoreBackend.getState().counter);
    useStoreBackend.setState({providerBackend: new RpcProvider({ nodeUrl: prov })});
    console.log("prov env2 =",useStoreBackend.getState().providerBackend);
}