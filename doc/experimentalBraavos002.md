# 1. subscription to events :
It's working fine for subscription / unsubscription.  
At change of network, both account and network events are well occurring.  
> But I have still unexpected account change events, at each new block.

# 2. wallet_getPermissions :
It works.  
- Return `accounts` string, in an array of one item. 
- If the user declines the permission, the response is an empty array.

# 3. wallet_requestAccounts :
It works.  
Returns an array of hex string ; just use first element. 
> Still not a fan of this type of response ; I think it's not a good idea to use an array to hold just one account address. It encourages abusing this accounts array to pass arbitrary data. It's a way for security issue.
  
# 4. wallet_watchAsset :
It works. The result is `true`. 
> The optional parameters are useless, as they are automatically recovered from the blockchain. Whatever you provide, only the blockchain data are used.
- If the address is not an ERC20, the result is `false`.
- If the token is already displayed, the result is `true`.
> If the user decline the request, the function throw an error. Impossible to differentiate with an internal browser problem.
  
# 5. wallet_addStarknetChain :
  Not supported by Braavos wallet 002.  
  
# 6. wallet_switchStarknetChain :
  Not supported by Braavos wallet 002.  
 
# 7. wallet_requestChainId :
It works.
- response is string encoded of `SN_MAIN`, `SN_GOERLI` or `SN_SEPOLIA`.
  
# 8. wallet_deploymentData :
> This new function is always throwing an error, even just after ` starknet_addDeployAccountTransaction`.

# 9. starknet_addInvokeTransaction :
It works. 
> If the user declines to sign, the function throw an error. Impossible to differentiate with an internal browser problem.

# 10. starknet_addDeclareTransaction :
Not yet tested.

# 11. starknet_addDeployAccountTransaction :
It works.
> - The address of deployment is not the one expected with the universal deployer. Ex :  
``` typescript 
const decClassHash = "0x2bfd9564754d9b4a326da62b2f22b8fea7bbeffd62da4fcaea986c323b7aeb"; // OZ cairo v2.1.0
const starkKeyPub = "0x03cb804773b6a237db952b1d4b651a90ee08651fbe74b5b05f8fabb2529acb45";
// calculate address
const OZaccountConstructorCallData = CallData.compile([starkKeyPub]);
const OZcontractAddress = hash.calculateContractAddressFromHash(starkKeyPub, decClassHash, OZaccountConstructorCallData, 0);
```
> Expected address is `0x360ccaecfd9fb321de0b70da56bc9b96510b75a6ee21e8e9b547f4710ad007f`  
> But the function is returning :
```
transaction_hash: 0x1aca7fffb34c41d28ad365de6d353111c96a520120275935296f30ca3b012f9 
contract_address:[0x4e892bb64e39cef7363151cfb2aae45216ea3ea6c4200da6ac9c37cf9e14dac]
```

> - The response type is not conform to `AddDeployAccountTransactionResult.contract_address: FELT`
```
request starknet_addDeployAccountTransaction resp = {
    transaction_hash: '0x1aca7fffb34c41d28ad365de6d353111c96a520120275935296f30ca3b012f9', contract_address: Array(1)}
        contract_address: Array(1)
            0: "0x4e892bb64e39cef7363151cfb2aae45216ea3ea6c4200da6ac9c37cf9e14dac"
        length: 1
        [[Prototype]]: Array(0)
        transaction_hash: "0x1aca7fffb34c41d28ad365de6d353111c96a520120275935296f30ca3b012f9"[[Prototype]]: Object , 
    crash = false
```
> The address is in fact an array. Same comment than `wallet_requestAccounts`.
  
>  - If the user decline the request, the function throw an error. Impossible to differentiate with an internal browser problem.

# 12. starknet_signTypedData : 
It works.
- It returns an array of hex string.
> If the user declines to sign, the function throw an error. Impossible to differentiate with an internal browser problem.

# 13. starknet_supportedSpecs :
It works.
- The response is an array of strings. Each string is the version of a supported starknet API version. Includes only the 2 main digits ; example : `0.5` 

