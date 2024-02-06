| Id |Subject| ArgentX | Braavos| Comment|
|--|--|--|--|--|
|1|event accountsChanged| never released.|Unexpected release at each new block.||
|2|event networkChanged | neither accountChanged nor networkChanged released|OK||
|3|wallet_getPermissions| OK|OK||
|4|wallet_requestAccounts|OK|OK||
|5|wallet_watchAsset|Fail if asset already visible|return `true` if asset already visible|Braavos behavior preferred|
|6|wallet_addStarknetChain|Works, but fail if already added.|Not implemented|preferable : returns `true` if already added|
|7|wallet_switchStarknetChain|Works, but<br />if not existing : fails. <br />If already active : fails|Not implemented|Preferable: if not existing : returns false. If active : returns true|
|8|wallet_requestChainId|OK|OK||
|9|starknet_addInvokeTransaction|OK|OK||
|10|starknet_addDeclareTransaction|Impossible to proceed. In AddDeclareTransactionParameters type, abi key is optional, but call returns `Error: Missing ABI`. Abi type expected is `string`, but in reality is an array of object. How to process? What's the format and values of `contract_class_version` parameter? Decline button is not generating any response. |Wallet window opened, but do not proceed.|One example of a valid request seems necessary.|
|11|starknet_addDeployAccountTransaction|FAIL, with message `Error: Not implemented`.|OK. <br />But do not deploy at the pre-calculated address|Braavos uses the current account to fund automatically the account deployment.|
|12|starknet_signTypedData|Improved display (nice!), but not processing after click on `sign`|OK.<br/>Raw format display|tested with legacy V5 format|
|13|starknet_supportedSpecs|OK|OK||
|14|GetDeploymentDataResult|-|-|What is it? How does it work?|

