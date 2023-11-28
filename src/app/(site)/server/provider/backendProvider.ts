"use server";

import { AccountInvocations, BigNumberish, BlockIdentifier, Call, CallContractResponse, ContractClassResponse, ContractVersion, DeclareContractResponse, DeclareContractTransaction, DeployAccountContractTransaction, DeployContractResponse, EstimateFeeResponse, EstimateFeeResponseBulk, GetBlockResponse, GetTransactionReceiptResponse, GetTransactionResponse, Invocation, InvocationsDetailsWithNonce, InvokeFunctionResponse, Nonce, RPC, RpcProvider, SimulateTransactionResponse, constants, getContractVersionOptions, getEstimateFeeBulkOptions, getSimulateTransactionOptions, waitForTransactionOptions } from "starknet";
import { DataBlock, dataBlockInit } from "../../components/clientComponents/provider/Block/blockContext";
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from "next/server";
import { ApiErr } from "@/app/utils/ApiErr";
import { error } from "console";
import { initBackProvider } from "./initProvider";

// Receive and process requests from the frontend ServerProvider class.


const providerBackend = initBackProvider();

export async function getChainIdBackend(): Promise<constants.StarknetChainId> {
    let resp: constants.StarknetChainId;
    try {
        resp = (await providerBackend.getChainId()) as constants.StarknetChainId;
        // console.log("*aaaa***** Ok get chainId.");
    } catch (error) {
        console.log("Error 521 : providerBackend-chainId.\n", error);
        throw new ApiErr(521, "providerBackend-chainId", error as string);
    }
    // keep cache active, as should not change.
    // revalidatePath("/");
    return resp;
}

export async function getBlockBackend(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse> {
    let resp: GetBlockResponse;
    try {
        resp = (await providerBackend.getBlock(blockIdentifier)) as GetBlockResponse;
        // console.log("backendprovider-getblock =",resp);
    } catch (error) {
        console.log("Error 522 : backendProvider-getBlock.\n", error);
        throw new ApiErr(522, "backendProvider-getBlock", error as string);
    }
    revalidatePath("/"); // clear cache and update result
    return resp;
}

export async function getClassHashAtBackend(contractAddress: RPC.ContractAddress,
    blockIdentifier: BlockIdentifier): Promise<RPC.Felt> {
    let resp: RPC.Felt;
    try {
        resp = (await providerBackend.getClassHashAt(contractAddress, blockIdentifier)) as RPC.Felt;
    } catch (error) {
        console.log("Error 523 : backendProvider-getClassHashAt.\n", error);
        throw new ApiErr(523, "backendProvider-getClassHashAt", error as string);
    }
    // keep cache active, as should not change.
    // revalidatePath("/");
    return resp;
}

export async function getClassByHashBackend(classHash: string): Promise<ContractClassResponse> {
    let resp: ContractClassResponse;
    try {
        resp = (await providerBackend.getClassByHash(classHash)) as ContractClassResponse;
    } catch (error) {
        console.log("Error 524 : backendProvider-getClassByHash.\n", error);
        throw new ApiErr(524, "backendProvider-getClassByHash", error as string);
    }
    // keep cache active, as should not change.
    // revalidatePath("/");
    return resp;
}

export async function getNonceForAddressBackend(contractAddress: string,
    blockIdentifier?: BlockIdentifier): Promise<Nonce> {
    let resp: Nonce;
    try {
        resp = (await providerBackend.getNonceForAddress(contractAddress, blockIdentifier)) as Nonce;
    } catch (error) {
        console.log("Error 525 : backendProvider-getNonceForAddress.\n", error);
        throw new ApiErr(525, "backendProvider-getNonceForAddress", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function getStorageAtBackend(contractAddress: string,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier): Promise<string> {
    let resp: string;
    try {
        resp = (await providerBackend.getStorageAt(contractAddress, key, blockIdentifier)) as string;
    } catch (error) {
        console.log("Error 526 : backendProvider-getStorageAt.\n", error);
        throw new ApiErr(526, "backendProvider-getStorageAt", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function getTransactionBackend(txHash: string): Promise<GetTransactionResponse> {
    let resp: GetTransactionResponse;
    try {
        resp = (await providerBackend.getTransaction(txHash)) as GetTransactionResponse;
    } catch (error) {
        console.log("Error 527 : backendProvider-getTransaction.\n", error);
        throw new ApiErr(527, "backendProvider-getTransaction", error as string);
    }
    // keep cache active, as should not change.
    // revalidatePath("/");
    return resp;
}

export async function getTransactionReceiptBackend(txHash: string): Promise<RPC.TransactionReceipt> {
    let resp: RPC.TransactionReceipt;
    try {
        resp = (await providerBackend.getTransactionReceipt(txHash)) as RPC.TransactionReceipt;
    } catch (error) {
        console.log("Error 528 : backendProvider-getTransactionReceipt.\n", error);
        throw new ApiErr(528, "backendProvider-getTransactionReceipt", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function deployAccountContractBackend({ classHash, constructorCalldata, addressSalt, signature }: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce): Promise<DeployContractResponse> {
    let resp: DeployContractResponse;
    try {
        resp = (await providerBackend.deployAccountContract({ classHash, constructorCalldata, addressSalt, signature }, details)) as DeployContractResponse;
    } catch (error) {
        console.log("Error 529 : backendProvider-deployAccountContract.\n", error);
        throw new ApiErr(529, "backendProvider-deployAccountContract", error as string);
    }
    //revalidatePath("/");
    return resp;
}

export async function invokeFunctionBackend(functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce): Promise<InvokeFunctionResponse> {
    let resp: InvokeFunctionResponse;
    try {
        resp = (await providerBackend.invokeFunction(functionInvocation, details)) as InvokeFunctionResponse;
    } catch (error) {
        console.log("Error 530 : backendProvider-invokeFunction.\n", error);
        throw new ApiErr(530, "backendProvider-invokeFunction", error as string);
    }
    // revalidatePath("/");
    return resp;
}

export async function declareContractBackend({ contract, signature, senderAddress, compiledClassHash }: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce): Promise<DeclareContractResponse> {
    let resp: DeclareContractResponse;
    try {
        resp = (await providerBackend.declareContract({ contract, signature, senderAddress, compiledClassHash }, details)) as DeclareContractResponse;
    } catch (error) {
        console.log("Error 531 : backendProvider-declareContract.\n", error);
        throw new ApiErr(531, "backendProvider-declareContract", error as string);
    }
    // revalidatePath("/");
    return resp;
}

export async function getEstimateFeeBackend(invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier,
): Promise<EstimateFeeResponse> {
    let resp: EstimateFeeResponse;
    try {
        resp = (await providerBackend.getEstimateFee(invocation, invocationDetails, blockIdentifier)) as EstimateFeeResponse;
    } catch (error) {
        console.log("Error 532 : backendProvider-getEstimateFee.\n", error);
        throw new ApiErr(532, "backendProvider-getEstimateFee", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function getInvokeEstimateFeeBackend(invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier,
): Promise<EstimateFeeResponse> {
    let resp: EstimateFeeResponse;
    try {
        resp = (await providerBackend.getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier)) as EstimateFeeResponse;
    } catch (error) {
        console.log("Error 533 : backendProvider-getInvokeEstimateFee.\n", error);
        throw new ApiErr(533, "backendProvider-getInvokeEstimateFee", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function getDeclareEstimateFeeBackend(invocation: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier
): Promise<EstimateFeeResponse> {
    let resp: EstimateFeeResponse;
    try {
        resp = (await providerBackend.getDeclareEstimateFee(invocation, details, blockIdentifier)) as EstimateFeeResponse;
    } catch (error) {
        console.log("Error 534 : backendProvider-getDeclareEstimateFee.\n", error);
        throw new ApiErr(534, "backendProvider-getDeclareEstimateFee", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function getDeployAccountEstimateFeeBackend(invocation: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier
): Promise<EstimateFeeResponse> {
    let resp: EstimateFeeResponse;
    try {
        resp = (await providerBackend.getDeployAccountEstimateFee(invocation, details, blockIdentifier)) as EstimateFeeResponse;
    } catch (error) {
        console.log("Error 535 : backendProvider-getDeployAccountEstimateFee.\n", error);
        throw new ApiErr(535, "backendProvider-getDeployAccountEstimateFee", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function getEstimateFeeBulkBackend(invocations: AccountInvocations,
    { blockIdentifier, skipValidate = false }: getEstimateFeeBulkOptions
): Promise<EstimateFeeResponseBulk> {
    let resp: EstimateFeeResponseBulk;
    try {
        resp = (await providerBackend.getEstimateFeeBulk(invocations, { blockIdentifier, skipValidate })) as EstimateFeeResponseBulk;
    } catch (error) {
        console.log("Error 536 : backendProvider-getEstimateFeeBulk.\n", error);
        throw new ApiErr(536, "backendProvider-getEstimateFeeBulk", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function waitForTransactionBackend(
    txHash: string,
    options?: waitForTransactionOptions
): Promise<GetTransactionReceiptResponse> {
    let resp: GetTransactionReceiptResponse;
    try {
        resp = (await providerBackend.waitForTransaction(txHash, options)) as GetTransactionReceiptResponse;
    } catch (error) {
        console.log("Error 537 : backendProvider-waitForTransaction.\n", error);
        throw new ApiErr(537, "backendProvider-waitForTransaction", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function getSimulateTransactionBackend(
    invocations: AccountInvocations,
    options: getSimulateTransactionOptions
): Promise<SimulateTransactionResponse> {
    let resp: SimulateTransactionResponse;
    try {
        resp = (await providerBackend.getSimulateTransaction(invocations, options)) as SimulateTransactionResponse;
    } catch (error) {
        console.log("Error 538 : backendProvider-getSimulateTransaction.\n", error);
        throw new ApiErr(538, "backendProvider-getSimulateTransaction", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function getStateUpdateBackend(blockIdentifier: BlockIdentifier
): Promise<RPC.StateUpdate> {
    let resp: RPC.StateUpdate;
    try {
        resp = (await providerBackend.getStateUpdate(blockIdentifier)) as RPC.StateUpdate;
    } catch (error) {
        console.log("Error 539 : backendProvider-getStateUpdate.\n", error);
        throw new ApiErr(539, "backendProvider-getStateUpdate", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function getContractVersionBackend(contractAddress?: string,
    classHash?: string,
    options?: getContractVersionOptions
): Promise<ContractVersion> {
    let resp: ContractVersion;
    try {
        if (contractAddress) {
            resp = (await providerBackend.getContractVersion(contractAddress, undefined, options)) as ContractVersion;
        }
        else if (classHash) {
            resp = (await providerBackend.getContractVersion(undefined, classHash, options)) as ContractVersion;
        } else {
            throw Error('backendProvider : getContractVersion require contractAddress or classHash');
        }
    } catch (error) {
        console.log("Error 540 : backendProvider-getContractVersion.\n", error);
        throw new ApiErr(540, "backendProvider-getContractVersion", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function callContractBackend(call: Call,
    blockIdentifier: BlockIdentifier
): Promise<CallContractResponse> {
    let resp: CallContractResponse;
    try {
        resp = (await providerBackend.callContract(call, blockIdentifier)) as CallContractResponse;
    } catch (error) {
        console.log("Error 541 : backendProvider-callContract.\n", error);
        throw new ApiErr(541, "backendProvider-callContract", error as string);
    }
    revalidatePath("/");
    return resp;
}

export async function getClassAtBackend(contractAddress: string,
    blockIdentifier: BlockIdentifier
  ): Promise<ContractClassResponse> {
    let resp: ContractClassResponse;
    try {
        resp = (await providerBackend.getClassAt(contractAddress, blockIdentifier)) as ContractClassResponse;
    } catch (error) {
        console.log("Error 542 : backendProvider-getClassAt.\n", error);
        throw new ApiErr(542, "backendProvider-getClassAt", error as string);
    }
    revalidatePath("/");
    return resp;
}

