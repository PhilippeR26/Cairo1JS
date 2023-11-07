"use server";

import { Abi, Account, Contract, RpcProvider, constants } from "starknet";
import { erc20Abi } from "../../(site)/contracts/abis/ERC20abi"
import { ApiErr } from "@/app/utils/ApiErr";
import { initBackProvider } from "../provider/initProvider";

const providerBackend = initBackProvider();


export async function callERC20(contractAddress: string, functionCall: string, param?: string): Promise<any> {

    const contractBackend = new Contract(erc20Abi, contractAddress, providerBackend);
    // console.log("ERC20 func =",functionCall,", param =",param);
    let resp: any;
    if (!param) {
        try {
            resp = await contractBackend[functionCall]();
        } catch (error) {
            throw new ApiErr(501, "ERC20 call Error", error as string)
        }
    } else {
        try {
            resp = await contractBackend[functionCall](param);
        } catch (error) {
            throw new ApiErr(501, "ERC20 call Error", error as string)
        }
    }
    // console.log("ERC20 result =",resp)
    return resp;
}