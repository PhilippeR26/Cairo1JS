import { ApiErr } from "@/app/utils/ApiErr";
import { RpcProvider } from "starknet";

export  function initBackProvider(): RpcProvider {
    if (!process.env.PROVIDER_URL) {
        throw new ApiErr(520, "providerBackend = No PROVIDER_URL backend variable defined in .env.local.");
    }
    const prov = process.env.PROVIDER_URL;
    const providerBackend = new RpcProvider({ nodeUrl: prov });
    return providerBackend
}