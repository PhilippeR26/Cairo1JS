"use server";

import { GetBlockResponse, RpcProvider, constants } from "starknet";
import { DataBlock, dataBlockInit } from "../../(site)/components/client/provider/Block/blockContext";
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from "next/server";
import { ApiErr } from "@/app/utils/ApiErr";
import { error } from "console";
import { initBackProvider } from "./initProvider";

// Receive and process requests from the frontend ServerProvider class.


const providerBackend = initBackProvider();

export async function getChainIdBackend(): Promise<constants.StarknetChainId> {
    let resp:constants.StarknetChainId;
    try {
        resp = (await providerBackend.getChainId()) as constants.StarknetChainId;
        console.log("*aaaa***** Ok get chainId.");
    } catch (error) {
        console.log("bug in get chainId");
        throw new ApiErr(401, "providerBackend-chainId.", error as string);
    }
    // keep cache active, as should not change.
    // revalidatePath("/");
    return resp;
}

export async function getBlockBackend(): Promise<DataBlock> {

    const resp: GetBlockResponse = await providerBackend.getBlock("latest");
    if (!resp) { throw new ApiErr(402, "providerBackend fails to get block.") };
    const block: DataBlock = {
        timeStamp: resp.timestamp,
        blockNumber: resp.block_number,
        blockHash: resp.block_hash,
        gasPrice: resp.gas_price ?? "not defined in this block",
    }
    revalidatePath("/"); // clear cache and update result
    return block;
}

