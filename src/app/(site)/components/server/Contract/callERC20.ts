"use server";

import { Abi, Account, Contract, RpcProvider, constants } from "starknet";
import { erc20Abi } from "../../../contracts/abis/ERC20abi"


export async function callERC20(contractAddress:string,functionCall:string,param?:string):Promise<any> {
    const providerUrl= process.env.PROVIDER;
    if (!providerUrl) {throw new Error("callContract backend : missing provider url")} 
    const providerBackend=new RpcProvider({ nodeUrl: providerUrl });
    
    const contractBackend= new Contract(erc20Abi,contractAddress,providerBackend); 

    const resp=await contractBackend[functionCall]([param??null]);
    return resp;
}