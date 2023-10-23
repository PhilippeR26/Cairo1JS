import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { GetBlockResponse, constants as SNconstants } from "starknet";

import * as constants from "@/type/constants";
import React, { useEffect, useState } from "react";
import { useStoreWallet } from "../../Wallet/walletContext";
import { AddStarknetChainParameters, SwitchStarknetChainParameter, WatchAssetParameters } from "@/type/types";

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
        async function executeRequest(myRequest: Request): Promise<string> {
            let resp: boolean | undefined = undefined;
            let crash: boolean = false;
            try {
                resp = await walletFromContext?.request(myRequest);
            } catch {
                (err: any) => { console.log("Wallet request", command, " failed.\n", err) };
                crash = true;
            }
            console.log("request resp,crash =", resp, crash);
            let txtResponse: string;
            if (crash) { txtResponse = "Error" } else {
                switch (resp) {
                    case true: { txtResponse = "True"; break; }
                    case false: { txtResponse = "False"; break; }
                    case undefined: { txtResponse = "Undefined"; break; }
                }
            }
            return txtResponse;
        }
        switch (command) {
            case constants.CommandWallet.wallet_watchAsset: {
                const myAsset: WatchAssetParameters = {
                    type: "ERC20",
                    options: {
                        address: param,
                        decimals: 10,
                        name: "ZOZOZO",
                        symbol: "ZZZ"
                    } // decimals, name, symbol options are useless and are not taken into account by the Wallets!
                };
                const myRequest = {
                    type: command,
                    params: myAsset
                }
                const txtResponse = await executeRequest(myRequest);
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.wallet_switchStarknetChain: {
                const myChainId: SwitchStarknetChainParameter = {
                    chainId: param
                } // hex of string
                const myRequest = {
                    type: command,
                    params: myChainId
                }
                const txtResponse = await executeRequest(myRequest);
                setResponse(txtResponse);
                onOpen();
                break;
            }
            case constants.CommandWallet.wallet_addStarknetChain: {
                const myChainId: AddStarknetChainParameters = {
                    id: "0x0a",
                    chainId: SNconstants.StarknetChainId.SN_MAIN,  // A 0x-prefixed hexadecimal string
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
                const txtResponse = await executeRequest(myRequest);
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