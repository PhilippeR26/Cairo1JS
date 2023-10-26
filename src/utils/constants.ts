export const addrETH = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
export const addrTEST = "0x07394cBe418Daa16e42B87Ba67372d4AB4a5dF0B05C6e554D158458Ce245BC10";
export const addrxASTR = "0x005EF67D8c38B82ba699F206Bf0dB59f1828087A710Bad48Cc4d51A2B0dA4C29"; // xAstraly
export enum CommandWallet {
    wallet_requestAccounts="wallet_requestAccounts",
    wallet_watchAsset = "wallet_watchAsset",
    wallet_addStarknetChain = "wallet_addStarknetChain",
    wallet_switchStarknetChain = "wallet_switchStarknetChain",
    starknet_addInvokeTransaction ="starknet_addInvokeTransaction",
    starknet_addDeclareTransaction="starknet_addDeclareTransaction",
    starknet_addDeployAccountTransaction="starknet_addDeployAccountTransaction",
    starknet_signTypedData="starknet_signTypedData"
}
