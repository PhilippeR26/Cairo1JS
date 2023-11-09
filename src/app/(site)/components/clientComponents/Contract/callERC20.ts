
// "use client";

import { Contract } from "starknet";
import { erc20Abi } from "../../../contracts/abis/ERC20abi"
import { useStoreServer } from "../provider/serverContext";


export async function callERC20(contractAddress: string, functionCall: string, params?: string[]): Promise<any> {
    const serverProvider = useStoreServer.getState().providerServer;
    // console.log("callERC20:serverprovider", await serverProvider?.getChainId());
    if (!serverProvider) { throw new Error("getBalance : No serverProvider.") }
    const erc20Contract: Contract = new Contract(erc20Abi, contractAddress, serverProvider);
    let resp: unknown;
    try {
        resp = await erc20Contract.call(functionCall, params);
        // console.log("callERC20 =",resp);
    } catch (error) {
        throw new Error("getBalance : ERC20 call Error : " + error as string);
    }
    return resp;
}