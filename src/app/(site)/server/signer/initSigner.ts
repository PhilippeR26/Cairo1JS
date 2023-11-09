import { ApiErr } from "@/app/utils/ApiErr";
import { RpcProvider, Signer } from "starknet";

export  function initBackSigner(ENV_NAME:string): Signer {
    if (!process.env[ENV_NAME]) {
        throw new ApiErr(550, "signerBackend = No "+ENV_NAME+" backend variable defined in .env.local.");
    }
    const privateKey = process.env[ENV_NAME];
    const signerBackend = new Signer(privateKey);
    return signerBackend
}