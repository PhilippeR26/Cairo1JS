
import { useStoreWallet } from "../../Wallet/walletContext";
import { type RpcMessage } from "get-starknet-core";

export type Response = Pick<RpcMessage, "result">["result"];

export async function callRequest(call: Omit<RpcMessage, "result">): Promise<Response | string> {
    const myWallet = useStoreWallet.getState().wallet;
    if (!myWallet) {
        console.log("No wallet connected.");
        return ("No wallet");
    }
    let resp: Response | undefined = undefined;
    let crash: boolean = false;
    let errorMessage:string="No Error message";
    try {
        resp = await myWallet.request(call);

    } catch (err: any) {
        console.log("Wallet request", call.type, " failed.");
        console.log("Message Error =", err.message);
        crash = true;
        errorMessage=err.message
    }
    console.log("request", call.type, "resp =", resp, ", crash =", crash);
    //let txtResponse: string;
    if (typeof (resp) == "boolean") { return resp }
    if (crash || typeof (resp) == "undefined") { return "Error:"+errorMessage }
    return resp;
}
