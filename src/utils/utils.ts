import { encode } from "starknet";

export function formatAddress(addr:string):string {
    return encode.addHexPrefix(encode.removeHexPrefix(addr).padStart(64, "0"));
}

export async function wait(delay: number) { // ms
    return new Promise((res) => {
        setTimeout(res, delay);
    });
}