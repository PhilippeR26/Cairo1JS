import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, forwardRef, Tooltip } from "@chakra-ui/react";
import { CallData, GetBlockResponse, constants as SNconstants, TypedData, cairo, ec, encode, hash, json, shortString, stark } from "starknet";
import React, { useEffect, useState } from "react";

import * as constants from "@/utils/constants";
import { useStoreWallet } from "../../Wallet/walletContext";
import { AddDeclareTransactionParameters, AddDeclareTransactionResult, AddDeployAccountTransactionParameters, AddDeployAccountTransactionResult, AddInvokeTransactionParameters, AddInvokeTransactionResult, AddStarknetChainParameters, GetDeploymentDataResult, RequestAccountsParameters, SwitchStarknetChainParameters, WatchAssetParameters } from "get-starknet-core";
import { Response, callRequest } from "./callRequest";
import { formatAddress } from "@/utils/utils";

import { test1Abi } from "../../../contracts/abis/test1";
import { contractSierra } from "@/app/contracts/tmpTest.sierra.json";
import { contractCasm } from "@/app/contracts/tmpTest.casm.json";
import { wait } from "@/utils/utils";



type Props = {
    command: constants.CommandWallet,
    symbol?: string,
    param: string,
    tip?: string
};
type Request = {
    type: any,
    params: any
}

export default function RpcWalletCommand({ command, symbol, param, tip }: Props) {
    //    export const RpcWalletCommand=forwardRef(({ command, symbol, param,tip }: Props,ref)=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [response, setResponse] = useState<string>("N/A");
    const walletFromContext = useStoreWallet(state => state.wallet);
    async function callCommand(command: constants.CommandWallet, param: string) {
        switch (command) {
            case constants.CommandWallet.wallet_requestAccounts: {
                const param: RequestAccountsParameters = {};
                const myRequest: Request = {
                    type: command,
                    params: param
                }
                const response = await callRequest(myRequest);
                let txtResponse: string = "N/A";
                if (typeof (response) == "string") { txtResponse = response } else {
                    const tmp = response as string[];
                    txtResponse = formatAddress(tmp[0]);
                }
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.wallet_requestChainId: {
                const param: RequestAccountsParameters = {};
                const myRequest: Request = {
                    type: command,
                    params: param
                }
                const response = await callRequest(myRequest);
                const txtResponse: string = typeof (response) == "string" ?
                    response :
                    (response ? "True" : "False");
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.wallet_watchAsset: {
                const myAsset: WatchAssetParameters = {
                    type: "ERC20",
                    options: {
                        address: param,
                        decimals: 18,
                        name: "snjs6-celebration",
                        symbol: "snsj6"
                    } // decimals, name, symbol options are useless and are not taken into account by the Wallet
                };
                const myRequest = {
                    type: command,
                    params: myAsset
                }
                const response = await callRequest(myRequest);
                const txtResponse: string = typeof (response) == "string" ?
                    response :
                    (response ? "True" : "False");
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.wallet_switchStarknetChain: {
                const myChainId: SwitchStarknetChainParameters = {
                    chainId: param
                } // hex of encoded string
                const myRequest = {
                    type: command,
                    params: myChainId
                }
                const response = await callRequest(myRequest);
                const txtResponse: string = typeof (response) == "string" ?
                    response :
                    (response ? "True" : "False");
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.wallet_addStarknetChain: {
                const myChainId: AddStarknetChainParameters = {
                    id: param,
                    chainId: shortString.encodeShortString(param),  // A 0x-prefixed hexadecimal string
                    chainName: param,
                    rpcUrls: ["http://192.168.1.44:6060"],
                    nativeCurrency: {
                        address: constants.addrETH, // Not part of the standard, but required by StarkNet as it can work with any ERC20 token as the fee token
                        name: "ETHEREUM",
                        symbol: "ETH", // 2-6 characters long
                        decimals: 18,
                    }
                } // hex of string
                const myRequest = {
                    type: command,
                    params: myChainId
                }
                const response = await callRequest(myRequest);
                const txtResponse: string = typeof (response) == "string" ?
                    response :
                    (response ? "True" : "False");
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.starknet_addInvokeTransaction: {
                const contractAddress = "0x697d3bc2e38d57752c28be0432771f4312d070174ae54eef67dd29e4afb174";
                const contractCallData = new CallData(test1Abi);
                const funcName = "increase_balance";
                const myCalldata = contractCallData.compile(funcName, {
                    amount: Number(param)
                });
                const myParams: AddInvokeTransactionParameters = {
                    calls: [{
                        contract_address: contractAddress,
                        entrypoint: funcName,
                        calldata: myCalldata
                    }]
                }
                const myRequest = {
                    type: command,
                    params: myParams
                };
                const response = await callRequest(myRequest);
                const txtResponse: string = typeof (response) == "string" ?
                    response : (response as AddInvokeTransactionResult).transaction_hash;
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.starknet_addDeclareTransaction: {


                const myParams: AddDeclareTransactionParameters = {
                     compiled_class_hash: hash.computeCompiledClassHash(contractCasm),
                    contract_class:
                    {
                        sierra_program: contractSierra.sierra_program,
                        contract_class_version: "0x01",
                        entry_points_by_type: contractSierra.entry_points_by_type,
                        abi:JSON.stringify(contractSierra.abi),
                    },

                    
                }
                const myRequest = {
                    type: command,
                    params: myParams
                };
                const response = await callRequest(myRequest);
                const txtResponse: string = typeof (response) == "string" ?
                    response : (response as AddDeclareTransactionResult).transaction_hash + " " + (response as AddDeclareTransactionResult).class_hash;
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.starknet_addDeployAccountTransaction: {

                const decClassHash = "0x2bfd9564754d9b4a326da62b2f22b8fea7bbeffd62da4fcaea986c323b7aeb"; // OZ cairo v2.1.0
                const privateKey = stark.randomAddress();
                console.log('New account :\nprivateKey=', privateKey);
                const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
                // calculate address
                const OZaccountConstructorCallData = CallData.compile([starkKeyPub]);
                const OZcontractAddress = hash.calculateContractAddressFromHash(starkKeyPub, decClassHash, OZaccountConstructorCallData, 0);
                console.log('Precalculated account address=', OZcontractAddress);
                // fund account address
                // const myCalldata = CallData.compile([OZcontractAddress, cairo.uint256(5 * 10 ** 15)])
                // const myTransferParams: AddInvokeTransactionParameters = {
                //     calls: [{
                //         contract_address: constants.addrETH,
                //         entrypoint: "transfer",
                //         calldata: myCalldata
                //     }]
                // }
                // const myTransferRequest = {
                //     type: command,
                //     params: myTransferParams
                // };
                // const responseTransfer = await callRequest(myTransferRequest);
                // const txtResponseTransfer: string = typeof (responseTransfer) == "string" ?
                //     responseTransfer : (responseTransfer as AddInvokeTransactionResult).transaction_hash;
                // console.log("transfer TH=", txtResponseTransfer);
                // await wait(5000);
                console.log("Start deploy account");
                // deploy account
                const myParams: AddDeployAccountTransactionParameters = {
                    class_hash: decClassHash,
                    contract_address_salt: starkKeyPub,
                    constructor_calldata: [starkKeyPub]
                }
                const myRequest = {
                    type: command,
                    params: myParams
                };
                const response = await callRequest(myRequest);
                console.log("Result deploy account=", response);
                const txtResponse: string = typeof (response) == "string" ?
                    response : "th:" + (response as AddDeployAccountTransactionResult).transaction_hash + " ad:" + (response as AddDeployAccountTransactionResult).contract_address + " (pk:" + privateKey + ")";
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.starknet_signTypedData: {
                const myTypedData: TypedData = {
                    domain: {
                      name: "Example DApp",
                      chainId: "0x534e5f474f45524c49",
                      version: "0.0.3",
                    },
                    types: {
                      StarkNetDomain: [
                        { name: "name", type: "string" },
                        { name: "chainId", type: "felt" },
                        { name: "version", type: "string" },
                      ],
                      Message: [{ name: "message", type: "felt" }],
                    },
                    primaryType: "Message",
                    message: {
                      message: "1234",
                    },
                  
                };
                const myRequest = {
                    type: command,
                    params: myTypedData
                }
                let txtResponse: string = "N/A";
                const response = await callRequest(myRequest);
                if (typeof (response) == "string") { txtResponse = response } else {
                    const tmp = response as string[];
                    txtResponse = formatAddress(tmp[0]) + " " + formatAddress(tmp[1]);
                }
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.starknet_supportedSpecs: {
                const myRequest: Request = {
                    type: command,
                    params: undefined
                }
                const response = await callRequest(myRequest);
                let txtResponse: string = typeof (response) == "string" ? response : (response as string[]).join(", ");
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.wallet_getPermissions: {
                const myRequest: Request = {
                    type: command,
                    params: undefined
                }
                const response = await callRequest(myRequest);
                let txtResponse: string = typeof (response) == "string" ? response : (response as string[]).join(", ");
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.wallet_deploymentData: {
                const myRequest: Request = {
                    type: command,
                    params: undefined
                }
                const response = await callRequest(myRequest);
                let txtResponse: string = typeof (response) == "string" ? response : JSON.stringify(response as GetDeploymentDataResult);
                setResponse(txtResponse);
                onOpen();
                break;
            }
            default: {
                console.log("wrong Wallet command :", command);
                break;
            }
        }


    }

    return (
        <>
            <Box color='black' borderWidth='0px' borderRadius='lg'>
                <Center>
                    <Tooltip hasArrow label={tip} bg='yellow.100' color='black'>
                        <Button bg='blue.100' onClick={() => { callCommand(command, param) }
                        } >{command} {symbol}</Button>
                    </Tooltip>
                </Center>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />

                    <ModalContent>
                        <ModalHeader fontSize='lg' fontWeight='bold'>
                            Command sent to Wallet.
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Command : {command} <br />
                            Param : {param} <br />
                            Response : {response}
                        </ModalBody>

                        <ModalFooter>
                            {/* <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button> */}
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                OK
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
}
