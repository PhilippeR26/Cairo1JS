"use server";

import { ProviderInterface, RpcProvider } from "starknet";
import { useStoreBackend } from "./backEndStarknetContext";
import { revalidatePath } from "next/cache";

const a:string="test1";

export async function setProviderBackend2() {
    console.log("Executing setProviderBackend");
    if (!process.env.PROVIDER_URL) {
        throw new Error("No backend provider defined.");
    }
    const prov=process.env.PROVIDER_URL;
    console.log("prov env =",prov," var a =",a);
    useStoreBackend.setState({counter: 20});
    console.log("counterA=",useStoreBackend.getState().counter);
    useStoreBackend.setState({providerBackend: new RpcProvider({ nodeUrl: prov })});
    console.log("prov env2 =",useStoreBackend.getState().providerBackend);
    // revalidatePath("/");
}