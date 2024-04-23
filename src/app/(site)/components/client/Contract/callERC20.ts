"use client";

import { Abi, Account, Contract, RpcProvider, constants } from "starknet";
import { erc20Abi } from "../../../contracts/abis/ERC20abi"
import { useStoreWallet } from "../ConnectWallet/walletContext";


export async function callERC20(contractAddress: string, functionCall: string, param?: string): Promise<any> {
    const providerW = useStoreWallet(state => state.providerW);


    const contract = new Contract(erc20Abi, contractAddress, providerW);
    console.log("ERC20 func =",functionCall,", param =",param);
    let resp: any;
    if (!param) {
        resp = await contract[functionCall]();
    } else {
        resp = await contract[functionCall](param);
    }
    console.log("ERC20 result =",resp)
    return resp;
}