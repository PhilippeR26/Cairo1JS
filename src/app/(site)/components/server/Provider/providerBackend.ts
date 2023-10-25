"use server";

import { ProviderInterface, RpcProvider } from "starknet";

export async function providerBackend(): Promise<ProviderInterface> {
    if (!process.env.PROVIDER) {
        throw new Error("No backend provider defined.");
    }
    return new RpcProvider({ nodeUrl: process.env.PROVIDER });
}