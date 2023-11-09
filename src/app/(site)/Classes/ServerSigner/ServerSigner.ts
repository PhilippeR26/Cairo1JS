"use client";
import { ApiErr } from '@/app/utils/ApiErr';
import {
  Abi,
  ArraySignatureType,
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  InvocationsSignerDetails,
  Signature,
  TypedData,
  ec,
  encode,
  num,
} from 'starknet';
import { SignerInterface } from 'starknet';
import { getPubKeyBackend, signDeclareTransactionBackend, signDeployAccountTransactionBackend, signMessageBackend, signTransactionBackend } from '@/app/(site)/server/signer/backendSigners';

export class ServerSignerNextJS implements SignerInterface {
  public accountID:number;

  constructor(accountID:number) {
    this.accountID=accountID;
  }

  public async getPubKey(): Promise<string> {
    let resp: string;
    try {
      resp = (await getPubKeyBackend(this.accountID)) as string;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async signMessage(typedData: TypedData, accountAddress: string): Promise<Signature> {
    let resp: Signature;
    try {
      resp = (await signMessageBackend(typedData,accountAddress,this.accountID)) as ArraySignatureType;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails,
    abis?: Abi[]
  ): Promise<Signature> {
    let resp: Signature;
    try {
      resp = (await signTransactionBackend(transactions,transactionsDetail,this.accountID,abis)) as ArraySignatureType;
      //console.log("ServerSigner-signTransaction :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp as Signature;
  }

  public async signDeployAccountTransaction(    transaction: DeployAccountSignerDetails): Promise<Signature> {
    let resp: Signature;
    try {
      resp = (await signDeployAccountTransactionBackend(transaction, this.accountID)) as ArraySignatureType;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }

  public async signDeclareTransaction(
    // contractClass: ContractClass,  // Should be used once class hash is present in ContractClass
    transaction: DeclareSignerDetails
  ): Promise<Signature> {
    let resp: Signature;
    try {
      resp = (await signDeclareTransactionBackend(transaction, this.accountID)) as ArraySignatureType;
      // console.log("ServerProvider-getblock :",resp);
    } catch (error: any) {
      console.log("ServerProvider error from backendProvider #", error.statusCode, " :", error.name, "\n", error.message);
      throw new ApiErr(error.statusCode, error.name, error.message);
    }
    return resp;
  }
}
