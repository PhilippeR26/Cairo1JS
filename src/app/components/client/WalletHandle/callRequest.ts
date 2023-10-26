
import { isBooleanObject } from "util/types";
import { useStoreWallet } from "../../Wallet/walletContext";
import { RpcMessage } from "@/app/core/StarknetWindowObject";

type Response = Pick<RpcMessage, "result">["result"];

export async function CallRequest(call: Omit<RpcMessage, "result">): Promise<string> {
    const myWallet = useStoreWallet.getState().wallet;
    if (!myWallet) {
        console.log("No wallet connected.");
        throw new Error("No wallet connected.")
    }
    let resp: Response | undefined = undefined;
    let crash: boolean = false;
    try {
        resp = await myWallet.request(call);

    } catch {
        (err: any) => { console.log("Wallet request", call.type, " failed.\n", err) };
        crash = true;
    }
    console.log("request resp,crash =", resp, crash);
    let txtResponse: string;
    if (crash) { return txtResponse = "Error" }
    if (isBooleanObject(resp)) { return String(resp)}

    return "N/A";
}
