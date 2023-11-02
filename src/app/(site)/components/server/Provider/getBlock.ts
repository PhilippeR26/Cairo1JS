"use server";

import { GetBlockResponse } from "starknet";
import { useStoreBackend } from "../backEndStarknetContext";
import { DataBlock, dataBlockInit } from "../blockContext";

export async function getBlockBackend(): Promise<DataBlock> {
    const providerBackend = useStoreBackend.getState().providerBackend;
    console.log("prov=",providerBackend);
    console.log("stateBack=",useStoreBackend.getState());
    if (!providerBackend) { 
        console.log("no provider");
        return dataBlockInit 
    };
    const resp: GetBlockResponse = await providerBackend.getBlock("latest");
    if (!resp) { throw new Error("providerBackend fails to get block.") };
    const block: DataBlock = {
        timeStamp: resp.timestamp,
        blockNumber: resp.block_number,
        blockHash: resp.block_hash,
        gasPrice: resp.gas_price ?? "0x00"
    }
    console.log("block =",block);
    return block;
}