"use client";

import {
  GetTransactionReceiptResponse,
  constants
} from "starknet";
import {
  AccountInvocationItem,
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
  RpcProviderOptions,
  SimulateTransactionResponse,
  TransactionType,
  getContractVersionOptions,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  waitForTransactionOptions,
} from 'starknet';
// import {
//   SimulationFlag,
//   TransactionExecutionStatus,
//   TransactionFinalityStatus,
// } from '../types/api/rpc';
// import { CallData } from '../utils/calldata';
// import { getAbiContractVersion } from '../utils/calldata/cairo';
// import { isSierra } from '../utils/contract';
// import { pascalToSnake } from '../utils/encode';
// import fetch from '../utils/fetchPonyfill';
// import { getSelectorFromName, getVersionsByType } from '../utils/hash';
// import { stringify } from '../utils/json';
// import { toHex, toStorageKey } from '../utils/num';
// import { wait } from '../utils/provider';
// import { RPCResponseParser } from '../utils/responseParser/rpc';
// import { decompressProgram, signatureToHexArray } from '../utils/stark';
// import { LibraryError } from './errors';
import { ProviderInterface } from 'starknet';
// import { Block } from './utils';
import { callContractBackend, declareContractBackend, deployAccountContractBackend, getBlockBackend, getChainIdBackend, getClassAtBackend, getClassByHashBackend, getClassHashAtBackend, getContractVersionBackend, getDeclareEstimateFeeBackend, getDeployAccountEstimateFeeBackend, getEstimateFeeBackend, getEstimateFeeBulkBackend, getInvokeEstimateFeeBackend, getNonceForAddressBackend, getSimulateTransactionBackend, getStateUpdateBackend, getStorageAtBackend, getTransactionBackend, getTransactionReceiptBackend, invokeFunctionBackend, waitForTransactionBackend } from "../server/provider/backendProvider";
import { ApiErr } from "../utils/ApiErr";

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

  // public async getBlockHashAndNumber(): Promise<RPC.BlockHashAndNumber> {
  //   return this.fetchEndpoint('starknet_blockHashAndNumber');
  // }

  // public async getBlockWithTxHashes(
  //   blockIdentifier: BlockIdentifier = this.blockIdentifier
  // ): Promise<RPC.GetBlockWithTxHashesResponse> {
  //   const block_id = new Block(blockIdentifier).identifier;
  //   return this.fetchEndpoint('starknet_getBlockWithTxHashes', { block_id });
  // }

  // public async getBlockWithTxs(
  //   blockIdentifier: BlockIdentifier = this.blockIdentifier
  // ): Promise<RPC.GetBlockWithTxs> {
  //   const block_id = new Block(blockIdentifier).identifier;
  //   return this.fetchEndpoint('starknet_getBlockWithTxs', { block_id });
  // }

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

  // public async getPendingTransactions(): Promise<RPC.PendingTransactions> {
  //   return this.fetchEndpoint('starknet_pendingTransactions');
  // }

  // public async getProtocolVersion(): Promise<Error> {
  //   throw new Error('Pathfinder does not implement this rpc 0.1.0 method');
  // }

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
  ): Promise<RPC.Storage> {
    let resp: RPC.Storage;
    try {
      resp = (await getStorageAtBackend(contractAddress, key, blockIdentifier)) as RPC.Storage;
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

  // public async getTransactionByHash(txHash: string): Promise<RPC.GetTransactionByHashResponse> {
  //   return this.fetchEndpoint('starknet_getTransactionByHash', { transaction_hash: txHash });
  // }

  // public async getTransactionByBlockIdAndIndex(
  //   blockIdentifier: BlockIdentifier,
  //   index: number
  // ): Promise<RPC.GetTransactionByBlockIdAndIndex> {
  //   const block_id = new Block(blockIdentifier).identifier;
  //   return this.fetchEndpoint('starknet_getTransactionByBlockIdAndIndex', { block_id, index });
  // }

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

  // public async getClass(
  //   classHash: RPC.Felt,
  //   blockIdentifier: BlockIdentifier = this.blockIdentifier
  // ): Promise<ContractClassResponse> {
  //   const block_id = new Block(blockIdentifier).identifier;
  //   return this.fetchEndpoint('starknet_getClass', {
  //     class_hash: classHash,
  //     block_id,
  //   }).then(this.responseParser.parseContractClassResponse);
  // }

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

  // public async traceTransaction(transactionHash: RPC.TransactionHash): Promise<RPC.Trace> {
  //   return this.fetchEndpoint('starknet_traceTransaction', { transaction_hash: transactionHash });
  // }

  // public async traceBlockTransactions(blockHash: RPC.BlockHash): Promise<RPC.Traces> {
  //   return this.fetchEndpoint('starknet_traceBlockTransactions', { block_hash: blockHash });
  // }

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

  // /**
  //  * Gets the transaction count from a block.
  //  *
  //  *
  //  * @param blockIdentifier
  //  * @returns Number of transactions
  //  */
  // public async getTransactionCount(
  //   blockIdentifier: BlockIdentifier = this.blockIdentifier
  // ): Promise<RPC.GetTransactionCountResponse> {
  //   const block_id = new Block(blockIdentifier).identifier;
  //   return this.fetchEndpoint('starknet_getBlockTransactionCount', { block_id });
  // }

  // /**
  //  * Gets the latest block number
  //  *
  //  *
  //  * @returns Number of the latest block
  //  */
  // public async getBlockNumber(): Promise<RPC.GetBlockNumberResponse> {
  //   return this.fetchEndpoint('starknet_blockNumber');
  // }

  // /**
  //  * Gets syncing status of the node
  //  *
  //  *
  //  * @returns Object with the stats data
  //  */
  // public async getSyncingStats(): Promise<RPC.GetSyncingStatsResponse> {
  //   return this.fetchEndpoint('starknet_syncing');
  // }

  // /**
  //  * Gets all the events filtered
  //  *
  //  *
  //  * @returns events and the pagination of the events
  //  */
  // public async getEvents(eventFilter: RPC.EventFilter): Promise<RPC.GetEventsResponse> {
  //   return this.fetchEndpoint('starknet_getEvents', { filter: eventFilter });
  // }

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

  // public async getStarkName(address: BigNumberish, StarknetIdContract?: string): Promise<string> {
  //   return getStarkName(this, address, StarknetIdContract);
  // }

  // public async getAddressFromStarkName(name: string, StarknetIdContract?: string): Promise<string> {
  //   return getAddressFromStarkName(this, name, StarknetIdContract);
  // }

  // public buildTransaction(
  //   invocation: AccountInvocationItem,
  //   versionType?: 'fee' | 'transaction'
  // ): RPC.BaseTransaction {
  //   const defaultVersions = getVersionsByType(versionType);
  //   const details = {
  //     signature: signatureToHexArray(invocation.signature),
  //     nonce: toHex(invocation.nonce),
  //     max_fee: toHex(invocation.maxFee || 0),
  //   };

  //   if (invocation.type === TransactionType.INVOKE) {
  //     return {
  //       type: RPC.TransactionType.INVOKE, // Diff between sequencer and rpc invoke type
  //       sender_address: invocation.contractAddress,
  //       calldata: CallData.toHex(invocation.calldata),
  //       version: toHex(invocation.version || defaultVersions.v1) as any, // HEX_STR_TRANSACTION_VERSION_1, // as any HOTFIX TODO: Resolve spec version
  //       ...details,
  //     };
  //   }
  //   if (invocation.type === TransactionType.DECLARE) {
  //     if (!isSierra(invocation.contract)) {
  //       return {
  //         type: invocation.type,
  //         contract_class: invocation.contract,
  //         sender_address: invocation.senderAddress,
  //         version: toHex(invocation.version || defaultVersions.v1) as any, // HEX_STR_TRANSACTION_VERSION_1, // as any HOTFIX TODO: Resolve spec version
  //         ...details,
  //       };
  //     }
  //     return {
  //       // compiled_class_hash
  //       type: invocation.type,
  //       contract_class: {
  //         ...invocation.contract,
  //         sierra_program: decompressProgram(invocation.contract.sierra_program),
  //       },
  //       compiled_class_hash: invocation.compiledClassHash || '',
  //       sender_address: invocation.senderAddress,
  //       version: toHex(invocation.version || defaultVersions.v2) as any, // HEX_STR_TRANSACTION_VERSION_2, // as any HOTFIX TODO: Resolve spec version
  //       ...details,
  //     };
  //   }
  //   if (invocation.type === TransactionType.DEPLOY_ACCOUNT) {
  //     return {
  //       type: invocation.type,
  //       constructor_calldata: CallData.toHex(invocation.constructorCalldata || []),
  //       class_hash: toHex(invocation.classHash),
  //       contract_address_salt: toHex(invocation.addressSalt || 0),
  //       version: toHex(invocation.version || defaultVersions.v1),
  //       ...details,
  //     };
  //   }
  //   throw Error('RPC buildTransaction received unknown TransactionType');
  // }
}
