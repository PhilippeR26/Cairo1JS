import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, forwardRef, Tooltip } from "@chakra-ui/react";
import { CallData, GetBlockResponse, constants as SNconstants, TypedData, cairo, ec, encode, hash, shortString, stark } from "starknet";
import React, { useEffect, useState } from "react";

import * as constants from "@/utils/constants";
import { useStoreWallet } from "../../Wallet/walletContext";
import { AddDeclareTransactionParameters, AddDeclareTransactionResult, AddDeployAccountTransactionParameters, AddDeployAccountTransactionResult, AddInvokeTransactionParameters, AddInvokeTransactionResult, AddStarknetChainParameters, RequestAccountsParameters, SwitchStarknetChainParameters, WatchAssetParameters } from "@/app/core/StarknetWindowObject";
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
    tip?:string
};
type Request = {
    type: any,
    params: any
}

 export default function RpcWalletCommand({ command, symbol, param,tip }: Props) {
//    export const RpcWalletCommand=forwardRef(({ command, symbol, param,tip }: Props,ref)=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [response, setResponse] = useState<string>("N/A");
    const walletFromContext = useStoreWallet(state => state.wallet);
    async function callCommand(command: constants.CommandWallet, param: string) {
        switch (command) {
            case constants.CommandWallet.wallet_requestAccounts: {
                const param: RequestAccountsParameters = {};
                const myRequest:Request = {
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
            case constants.CommandWallet.wallet_watchAsset: {
                const myAsset: WatchAssetParameters = {
                    type: "ERC20",
                    options: {
                        address: param,
                        decimals: 10,
                        name: "ZOZOZO",
                        symbol: "ZZZ"
                    } // decimals, name, symbol options are useless and are not taken into account by the Wallet
                };
                const myRequest = {
                    type: command,
                    params: myAsset
                }
                const response = await callRequest(myRequest);
                const txtResponse: string = typeof (response) == "string" ?
                    response :
                    (response ? "Succeed" : "Fail");
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
                    (response ? "Succeed" : "Fail");
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.wallet_addStarknetChain: {
                const myChainId: AddStarknetChainParameters = {
                    id: param,
                    chainId: shortString.encodeShortString(param),  // A 0x-prefixed hexadecimal string
                    chainName: param,
                    baseUrl: "http://192.168.1.44:6060",
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
                    (response ? "Succeed" : "Fail");
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
                    contract_class: contractSierra
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

                const decClassHash = "0x2bfd9564754d9b4a326da62b2f22b8fea7bbeffd62da4fcaea986c323b7aeb"; // cairo v2.1.0
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
                    response : "th:" + (response as AddDeployAccountTransactionResult).transaction_hash + " ad:" + (response as AddDeployAccountTransactionResult).contract_address + " (pk:" + privateKey+")";
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.starknet_signTypedData: {
                const myTypedData: TypedData = {
                    types: {
                        StarkNetDomain: [
                            { name: "name", type: "string" },
                            { name: "version", type: "felt" },
                            { name: "chainId", type: "felt" },
                        ],
                        Airdrop: [
                            { name: "address", type: "felt" },
                            { name: "amount", type: "felt" }
                        ],
                        Validate: [
                            { name: "id", type: "felt" },
                            { name: "from", type: "felt" },
                            { name: "amount", type: "felt" },
                            { name: "nameGamer", type: "string" },
                            { name: "endDate", type: "felt" },
                            { name: "itemsAuthorized", type: "felt*" }, // array of felt
                            { name: "chkFunction", type: "selector" }, // name of function
                            { name: "rootList", type: "merkletree", contains: "Airdrop" } // root of a merkle tree
                        ]
                    },
                    primaryType: "Validate",
                    domain: {
                        name: "myDapp", // put the name of your dapp to ensure that the signatures will not be used by other DAPP
                        version: "1",
                        chainId: shortString.encodeShortString("SN_GOERLI"), // shortString of 'SN_GOERLI' (or 'SN_MAIN' or 'SN_GOERLI2'), to be sure that signature can't be used by other network.
                    },
                    message: {
                        id: "0x0000004f000f",
                        from: "0x2c94f628d125cd0e86eaefea735ba24c262b9a441728f63e5776661829a4066",
                        amount: "400",
                        nameGamer: "Hector26",
                        endDate: "0x27d32a3033df4277caa9e9396100b7ca8c66a4ef8ea5f6765b91a7c17f0109c",
                        itemsAuthorized: ["0x01", "0x03", "0x0a", "0x0e"],
                        chkFunction: "check_authorization",
                        rootList: [
                            {
                                address: "0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79",
                                amount: "1554785",
                            }, {
                                address: "0x7447084f620ba316a42c72ca5b8eefb3fe9a05ca5fe6430c65a69ecc4349b3b",
                                amount: "2578248",
                            }, {
                                address: "0x3cad9a072d3cf29729ab2fad2e08972b8cfde01d4979083fb6d15e8e66f8ab1",
                                amount: "4732581",
                            }, {
                                address: "0x7f14339f5d364946ae5e27eccbf60757a5c496bf45baf35ddf2ad30b583541a",
                                amount: "913548",
                            },
                        ]
                    },
                };
                const myRequest = {
                    type: command,
                    params: myTypedData
                }
                let txtResponse:string="N/A";
                const response = await callRequest(myRequest);
                if (typeof (response) == "string") { txtResponse = response } else {
                    const tmp = response as string[];
                    txtResponse = formatAddress(tmp[0])+" "+formatAddress(tmp[1]);
                }
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
