"use server";

import { Abi, AccountInvocations, ArraySignatureType, BigNumberish, BlockIdentifier, Call, CallContractResponse, ContractClassResponse, ContractVersion, DeclareContractResponse, DeclareContractTransaction, DeclareSignerDetails, DeployAccountContractTransaction, DeployAccountSignerDetails, DeployContractResponse, EstimateFeeResponse, EstimateFeeResponseBulk, GetBlockResponse, GetTransactionReceiptResponse, GetTransactionResponse, Invocation, InvocationsDetailsWithNonce, InvocationsSignerDetails, InvokeFunctionResponse, Nonce, RPC, RpcProvider, Signature, Signer, SimulateTransactionResponse, TypedData, WeierstrassSignatureType, constants, ec, getContractVersionOptions, getEstimateFeeBulkOptions, getSimulateTransactionOptions, num, waitForTransactionOptions } from "starknet";
import { DataBlock, dataBlockInit } from "../../components/clientComponents/provider/Block/blockContext";
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from "next/server";
import { ApiErr } from "@/app/utils/ApiErr";
import { error } from "console";
import { initBackSigner } from "./initSigner";

// Receive and process requests from the frontend ServerProvider class.

// here example with 2 accounts
const signers: Signer[] = [
    initBackSigner("ACCOUNT_PRIV_KEY0"),
    initBackSigner("ACCOUNT_PRIV_KEY1")
];

export async function getPubKeyBackend(accountID: number): Promise<string> {
    let resp: string;
    const signer = signers[accountID];
    try {
        resp = (await signer.getPubKey()) as string;
        console.log("****** Ok getPubKey.");
    } catch (error) {
        console.log("Error 551 : signerBackend-getPubKey.\n", error);
        throw new ApiErr(551, "signerBackend-getPubKey", error as string);
    }
    // keep cache active, as should not change.
    // revalidatePath("/");
    return resp;
}

export async function signMessageBackend(typedData: TypedData, accountAddress: string, accountID: number): Promise<ArraySignatureType> {
    let resp: Signature;
    const signer = signers[accountID];
    try {
        resp = (await signer.signMessage(typedData, accountAddress)) as Signature;
        console.log("****** Ok signMessage.");
    } catch (error) {
        console.log("Error 552 : signerBackend-signMessage.\n", error);
        throw new ApiErr(552, "signerBackend-signMessage", error as string);
    }
    const signatureNoble=resp as WeierstrassSignatureType;
    const signatureArray:ArraySignatureType=[num.toHex(signatureNoble.r),num.toHex(signatureNoble.s)];
    // keep cache active, as should not change.
    // revalidatePath("/");
    return signatureArray;
}

export async function signTransactionBackend(transactions: Call[],
    transactionsDetail: InvocationsSignerDetails, accountID: number,
    abis?: Abi[]
): Promise<ArraySignatureType> {
    let resp: Signature ;
    const signer = signers[accountID];
    try {
        resp = (await signer.signTransaction(transactions, transactionsDetail, abis)) ;
        console.log("****** Ok signTransaction.");
        //console.log("****** isArray =",Array.isArray(resp));

    } catch (error) {
        console.log("Error 553 : signerBackend-signTransaction.\n", error);
        throw new ApiErr(553, "signerBackend-signTransaction", error as string);
    }
    const signatureNoble=resp as WeierstrassSignatureType;
    const signatureArray:ArraySignatureType=[num.toHex(signatureNoble.r),num.toHex(signatureNoble.s)];
    // keep cache active, as should not change.
    // revalidatePath("/");
    return signatureArray;
}

export async function signDeployAccountTransactionBackend(transaction: DeployAccountSignerDetails, accountID: number
): Promise<ArraySignatureType> {
    let resp: Signature;
    const signer = signers[accountID];
    try {
        resp = (await signer.signDeployAccountTransaction(transaction)) as Signature;
        console.log("****** Ok signDeployAccountTransaction.");
    } catch (error) {
        console.log("Error 554 : signerBackend-signDeployAccountTransaction.\n", error);
        throw new ApiErr(554, "signerBackend-signDeployAccountTransaction", error as string);
    }
    const signatureNoble=resp as WeierstrassSignatureType;
    const signatureArray:ArraySignatureType=[num.toHex(signatureNoble.r),num.toHex(signatureNoble.s)];
    // keep cache active, as should not change.
    // revalidatePath("/");
    return signatureArray;
}

export async function signDeclareTransactionBackend(transaction: DeclareSignerDetails, accountID: number
): Promise<ArraySignatureType> {
    let resp: Signature;
    const signer = signers[accountID];
    try {
        resp = (await signer.signDeclareTransaction(transaction)) as Signature;
        console.log("****** Ok signDeclareTransaction.");
    } catch (error) {
        console.log("Error 555 : signerBackend-signDeployAccountTransaction.\n", error);
        throw new ApiErr(555, "signerBackend-signDeployAccountTransaction", error as string);
    }
    const signatureNoble=resp as WeierstrassSignatureType;
    const signatureArray:ArraySignatureType=[num.toHex(signatureNoble.r),num.toHex(signatureNoble.s)];
    // keep cache active, as should not change.
    // revalidatePath("/");
    return signatureArray;
}

