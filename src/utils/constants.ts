import { ProviderInterface, RpcProvider } from "starknet";

export const addrETH = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
export const addrTEST = "0x07394cBe418Daa16e42B87Ba67372d4AB4a5dF0B05C6e554D158458Ce245BC10";
export const addrxASTR = "0x005EF67D8c38B82ba699F206Bf0dB59f1828087A710Bad48Cc4d51A2B0dA4C29"; // xAstraly
export enum CommandWallet {
    wallet_requestAccounts = "wallet_requestAccounts",
    wallet_watchAsset = "wallet_watchAsset",
    wallet_addStarknetChain = "wallet_addStarknetChain",
    wallet_switchStarknetChain = "wallet_switchStarknetChain",
    starknet_addInvokeTransaction = "starknet_addInvokeTransaction",
    starknet_addDeclareTransaction = "starknet_addDeclareTransaction",
    starknet_addDeployAccountTransaction = "starknet_addDeployAccountTransaction",
    starknet_signTypedData = "starknet_signTypedData",
    starknet_supportedSpecs = "starknet_supportedSpecs",
    wallet_requestChainId = "wallet_requestChainId",
    wallet_getPermissions = "wallet_getPermissions",
    wallet_deploymentData = "wallet_deploymentData",
}

export const myFrontendProviders: ProviderInterface[] = [
    new RpcProvider({ nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0.5" }),
    new RpcProvider({ nodeUrl: "https://starknet-testnet.public.blastapi.io/rpc/v0.5" }),
    new RpcProvider({ nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/v0_5" })];

export const Cairo1ContractAddress: string[] = [
    "0x02bD907B978F58ceDf616cFf5CdA213d63Daa3AD28Dd3C1Ea17cA6CF5E1D395F", // mainnet
    "0x002e9aB2D7DbD8eb3a3cBE628dB705ce5f797Dd256Bd3EAf57bb654f5dEc7512", // testnet
    "0x037bfdeb9c262566183211b89e85b871518eb0c32cbcb026dce9a486560a03e0", // sepolia
];
