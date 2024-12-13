import type { BigNumberish } from "starknet";

// *** display a balance *****
export function formatBalance(qty: bigint, decimals: number): string {
    const balance = String("0").repeat(decimals) + qty.toString();
    const rightCleaned = balance.slice(-decimals).replace(/(\d)0+$/gm, '$1');
    const leftCleaned = BigInt(balance.slice(0, balance.length - decimals)).toString();
    return leftCleaned + "." + rightCleaned;
}

export function readableDate (timestamp: number):string {
    const d = new Date(timestamp * 1000);
    return d.toUTCString();
};