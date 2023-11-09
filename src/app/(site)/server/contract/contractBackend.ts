"use server";

import { Contract, GetBlockResponse, RpcProvider } from "starknet";
import { DataBlock, dataBlockInit } from "../../components/clientComponents/provider/Block/blockContext";
import { revalidatePath, revalidateTag } from 'next/cache'
import { erc20Abi } from "../../contracts/abis/ERC20abi"


if (!process.env.PROVIDER_URL) {
    throw new Error("No backend provider defined.");
}
const prov = process.env.PROVIDER_URL;
const providerBackend = new RpcProvider({ nodeUrl: prov })


export async function callERC20(contractAddress: string, functionCall: string, param?: string): Promise<any> {
    const contractBackend = new Contract(erc20Abi, contractAddress, providerBackend);

    const resp = await contractBackend[functionCall]([param ?? null]);
    revalidatePath("/"); // clear cache and update result
    return resp;
}
