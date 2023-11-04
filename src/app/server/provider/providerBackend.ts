"use server";

import { GetBlockResponse, RpcProvider } from "starknet";
import { useStoreBackend } from "../backEndStarknetContext";
import { DataBlock, dataBlockInit } from "../../(site)/components/client/Block/blockContext";
import { revalidatePath, revalidateTag } from 'next/cache'


if (!process.env.PROVIDER_URL) {
    throw new Error("No backend provider defined.");
}
const prov=process.env.PROVIDER_URL;
const providerBackend= new RpcProvider({ nodeUrl: prov })


export async function getBlockBackend(): Promise<DataBlock> {
    
    const resp: GetBlockResponse = await providerBackend.getBlock("latest");
    if (!resp) { throw new Error("providerBackend fails to get block.") };
    const block: DataBlock = {
        timeStamp: resp.timestamp,
        blockNumber: resp.block_number,
        blockHash: resp.block_hash,
        gasPrice: resp.gas_price ?? "not defined in this block",
    }
    revalidatePath("/"); // clear cache and update result
    return block;
}

export async function getChainId(): Promise<string> {
    const resp:string  = await providerBackend.getChainId();
    if (!resp) { throw new Error("providerBackend fails to get chain id.") };
    // keep cache active, as should not change.
    // revalidatePath("/");
    return resp;
}