"use server";

import { Abi, Account, Contract, RpcProvider, constants } from "starknet";
import { erc20Abi } from "../../(site)/contracts/abis/ERC20abi"


export async function callERC20(contractAddress: string, functionCall: string, param?: string): Promise<any> {
    if (!process.env.PROVIDER_URL) {
        throw new Error("No backend provider defined.");
    }
    const prov = process.env.PROVIDER_URL;
    const providerBackend = new RpcProvider({ nodeUrl: prov })

    const contractBackend = new Contract(erc20Abi, contractAddress, providerBackend);
    // console.log("ERC20 func =",functionCall,", param =",param);
    let resp: any;
    if (!param) {
        resp = await contractBackend[functionCall]();
    } else {
        resp = await contractBackend[functionCall](param);
    }
    // console.log("ERC20 result =",resp)
    return resp;
}