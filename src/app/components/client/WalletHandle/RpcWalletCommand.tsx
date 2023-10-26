import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { GetBlockResponse, constants as SNconstants, encode, shortString } from "starknet";

import * as constants from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { useStoreWallet } from "../../Wallet/walletContext";
import { AddStarknetChainParameters, RequestAccountsParameters, SwitchStarknetChainParameter, WatchAssetParameters } from "@/type/types";
import { Response, callRequest } from "./callRequest";
import { formatAddress } from "@/utils/format";

type Props = {
    command: constants.CommandWallet,
    symbol?: string,
    param: string
};
type Request = {
    type: any,
    params: any
}

export default function RpcWalletCommand({ command, symbol, param }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [response, setResponse] = useState<string>("N/A");
    const walletFromContext = useStoreWallet(state => state.wallet);
    async function callCommand(command: constants.CommandWallet, param: string) {
        // async function executeRequest(myRequest: Request): Promise<string> {
        //     let resp: any | undefined = undefined;
        //     let crash: boolean = false;
        //     try {
        //         resp = await walletFromContext?.request(myRequest);
        //     } catch {
        //         (err: any) => { console.log("Wallet request", command, " failed.\n", err) };
        //         crash = true;
        //     }
        //     console.log("request resp,crash =", resp, crash);
        //     let txtResponse: string;
        //     if (crash) { txtResponse = "Error" } else {
        //         switch (myRequest.type) {
        //             case constants.CommandWallet.wallet_addStarknetChain ||
        //                 constants.CommandWallet.wallet_watchAsset ||
        //                 constants.CommandWallet.wallet_switchStarknetChain: {
        //                     switch (resp) {
        //                         case true: { txtResponse = "True"; break; }
        //                         case false: { txtResponse = "False"; break; }
        //                         case undefined: { txtResponse = "Undefined"; break; }
        //                         default: {txtResponse="Imposible case 1"}
        //                     }
        //                     break;
        //                 }
        //             case constants.CommandWallet.wallet_requestAccounts: {
        //               txtResponse=resp[0].toString()  ;
        //             }
        //             default: { txtResponse = "N/A" }
        //         }
        //     }
        //     return txtResponse;
        // }
        switch (command) {
            case constants.CommandWallet.wallet_requestAccounts: {
                const param: RequestAccountsParameters = {};
                const myRequest = {
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
                const response = (await callRequest(myRequest)) as boolean;
                const txtResponse: string = typeof (response) == "string" ?
                    response :
                    (response ? "Succeed" : "Fail");
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.wallet_switchStarknetChain: {
                const myChainId: SwitchStarknetChainParameter = {
                    chainId: param
                } // hex of encoded string
                const myRequest = {
                    type: command,
                    params: myChainId
                }
                const response = (await callRequest(myRequest)) as boolean;
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
                const response = (await callRequest(myRequest)) as boolean;
                const txtResponse: string = typeof (response) == "string" ?
                    response :
                    (response ? "Succeed" : "Fail");
                setResponse(txtResponse);
                onOpen();
                break;
            }
            default: {
                console.log("wrong Wallet command", command);
                break;
            }
        }


    }

    return (
        <>
            <Box color='black' borderWidth='0px' borderRadius='lg'>
                <Center><Button bg='blue.100' onClick={() => { callCommand(command, param) }
                } >{command} {symbol}</Button></Center>
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