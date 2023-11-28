"use client";

import {
  GetTransactionReceiptResponse,
  constants
} from "starknet";
import {
  AccountInvocations,
  BigNumberish,
  BlockIdentifier,
  BlockTag,
  Call,
  CallContractResponse,
  ContractClassResponse,
  ContractVersion,
  DeclareContractResponse,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  DeployContractResponse,
  EstimateFeeResponse,
  EstimateFeeResponseBulk,
  GetBlockResponse,
  GetCodeResponse,
  GetTransactionResponse,
  Invocation,
  InvocationsDetailsWithNonce,
  InvokeFunctionResponse,
  RPC,
  SimulateTransactionResponse,
  getContractVersionOptions,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  waitForTransactionOptions,
} from 'starknet';

import { ProviderInterface } from 'starknet';
import { callContractBackend, declareContractBackend, deployAccountContractBackend, getBlockBackend, getChainIdBackend, getClassAtBackend, getClassByHashBackend, getClassHashAtBackend, getContractVersionBackend, getDeclareEstimateFeeBackend, getDeployAccountEstimateFeeBackend, getEstimateFeeBackend, getEstimateFeeBulkBackend, getInvokeEstimateFeeBackend, getNonceForAddressBackend, getSimulateTransactionBackend, getStateUpdateBackend, getStorageAtBackend, getTransactionBackend, getTransactionReceiptBackend, invokeFunctionBackend, waitForTransactionBackend } from "../../server/provider/backendProvider";
import { ApiErr } from "../../../utils/ApiErr";

// Default Pathfinder disabled pending block https://github.com/eqlabs/pathfinder/blob/main/README.md
// Note that pending support is disabled by default and must be enabled by setting poll-pending=true in the configuration options.
const defaultOptions = {
  headers: { 'Content-Type': 'application/json' },
  blockIdentifier: BlockTag.pending,
  retries: 200,
};

export class ServerProviderNextJS implements ProviderInterface {

  private blockIdentifier: BlockIdentifier;

  private chainId?: constants.StarknetChainId;

  constructor() {
    this.blockIdentifier = defaultOptions.blockIdentifier;
    this.getChainId(); // internally skipped if chainId has value
  }


  public async getChainId(): Promise<constants.StarknetChainId> {
    if (typeof this.chainId === "undefined") {
      try {
        this.chainId = (await getChainIdBackend()) as constants.StarknetChainId;
      } catch (error: any) {
        console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
        throw new ApiErr(error.statusCode, error.name, error.message);
      }
    }
    return this.chainId;
  }

  public async getBlock(
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<GetBlockResponse> {
    let resp: GetBlockResponse;
    try {
      resp = (await getBlockBackend(blockIdentifier)) as GetBlockResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getClassHashAt(
    contractAddress: RPC.ContractAddress,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.Felt> {
    let resp: RPC.Felt;
    try {
      resp = (await getClassHashAtBackend(contractAddress, blockIdentifier)) as RPC.Felt;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getNonceForAddress(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.Nonce> {
    let resp: RPC.Nonce;
    try {
      resp = (await getNonceForAddressBackend(contractAddress, blockIdentifier)) as RPC.Nonce;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getStateUpdate(
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.StateUpdate> {
    let resp: RPC.StateUpdate;
    try {
      resp = (await getStateUpdateBackend(blockIdentifier)) as RPC.StateUpdate;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<string> {
    let resp: string;
    try {
      resp = (await getStorageAtBackend(contractAddress, key, blockIdentifier)) as string;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  // Methods from Interface
  public async getTransaction(txHash: string): Promise<GetTransactionResponse> {
    let resp: GetTransactionResponse;
    try {
      resp = (await getTransactionBackend(txHash)) as GetTransactionResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getTransactionReceipt(txHash: string): Promise<RPC.TransactionReceipt> {
    let resp: RPC.TransactionReceipt;
    try {
      resp = (await getTransactionReceiptBackend(txHash)) as RPC.TransactionReceipt;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getClassByHash(classHash: RPC.Felt): Promise<ContractClassResponse> {
    let resp: ContractClassResponse;
    try {
      resp = (await getClassByHashBackend(classHash)) as ContractClassResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getClassAt(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<ContractClassResponse> {
    let resp: ContractClassResponse;
    try {
      resp = (await getClassAtBackend(contractAddress, blockIdentifier)) as ContractClassResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getCode(
    _contractAddress: string,
    _blockIdentifier?: BlockIdentifier
  ): Promise<GetCodeResponse> {
    throw new Error('RPC does not implement getCode function');
  }

  public async getContractVersion(
    contractAddress: string,
    classHash?: undefined,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;
  public async getContractVersion(
    contractAddress: undefined,
    classHash: string,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;

  public async getContractVersion(
    contractAddress?: string,
    classHash?: string,
    options: getContractVersionOptions = {}
  ): Promise<ContractVersion> {
    let resp: ContractVersion;
    try {
      resp = (await getContractVersionBackend(contractAddress,classHash,options)) as ContractVersion;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<EstimateFeeResponse> {
    let resp: EstimateFeeResponse;
    try {
      resp = (await getEstimateFeeBackend(invocation,invocationDetails,blockIdentifier)) as EstimateFeeResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getInvokeEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<EstimateFeeResponse> {
    let resp: EstimateFeeResponse;
    try {
      resp = (await getInvokeEstimateFeeBackend(invocation,invocationDetails,blockIdentifier)) as EstimateFeeResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getDeclareEstimateFee(
    invocation: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<EstimateFeeResponse> {
    let resp: EstimateFeeResponse;
    try {
      resp = (await getDeclareEstimateFeeBackend(invocation,details,blockIdentifier)) as EstimateFeeResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getDeployAccountEstimateFee(
    invocation: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<EstimateFeeResponse> {
    let resp: EstimateFeeResponse;
    try {
      resp = (await getDeployAccountEstimateFeeBackend(invocation,details,blockIdentifier)) as EstimateFeeResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getEstimateFeeBulk(
    invocations: AccountInvocations,
    { blockIdentifier = this.blockIdentifier, skipValidate = false }: getEstimateFeeBulkOptions
  ): Promise<EstimateFeeResponseBulk> {
    let resp: EstimateFeeResponseBulk;
    try {
      resp = (await getEstimateFeeBulkBackend(invocations,{ blockIdentifier , skipValidate  })) as EstimateFeeResponseBulk;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async declareContract(
    { contract, signature, senderAddress, compiledClassHash }: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeclareContractResponse> {
    let resp: DeclareContractResponse;
    try {
      resp = (await declareContractBackend({ contract, signature, senderAddress, compiledClassHash },details)) as DeclareContractResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async deployAccountContract(
    { classHash, constructorCalldata, addressSalt, signature }: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeployContractResponse> {
    let resp: DeployContractResponse;
    try {
      resp = (await deployAccountContractBackend({ classHash, constructorCalldata, addressSalt, signature },details)) as DeployContractResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<InvokeFunctionResponse> {
    let resp: InvokeFunctionResponse;
    try {
      resp = (await invokeFunctionBackend(functionInvocation,details)) as InvokeFunctionResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  // // Methods from Interface
  public async callContract(
    call: Call,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<CallContractResponse> {
    let resp: CallContractResponse;
    try {
      resp = (await callContractBackend(call,blockIdentifier)) as CallContractResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

    public async waitForTransaction(txHash: string, options?: waitForTransactionOptions) {
    let resp: GetTransactionReceiptResponse;
    try {
      resp = (await waitForTransactionBackend(txHash,options)) as GetTransactionReceiptResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async getSimulateTransaction(
    invocations: AccountInvocations,
    options: getSimulateTransactionOptions
  ): Promise<SimulateTransactionResponse> {
    let resp: SimulateTransactionResponse;
    try {
      resp = (await getSimulateTransactionBackend(invocations,options)) as SimulateTransactionResponse;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

}
