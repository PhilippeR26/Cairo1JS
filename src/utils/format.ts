import { encode } from "starknet";

export function formatAddress(addr:string):string {
    return encode.addHexPrefix(encode.removeHexPrefix(addr).padStart(64, "0"));
}