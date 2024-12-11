import { useEffect, useState } from 'react';
import { Contract, InvokeFunctionResponse, type GetTransactionReceiptResponse } from "starknet";

import { useStoreBlock } from "../Block/blockContext";
import { useStoreWallet } from '../ConnectWallet/walletContext';

import { Text, Button, Center, Spinner, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { test1Abi } from "../../../contracts/abis/test1";
import TransactionStatus from '../Transaction/TransactionStatus';
import { addrTESTCONTRACT } from '@/type/constants';

const contractAddress = addrTESTCONTRACT;

export default function PlayWithCairo1() {
    // wallet context
    const walletAccountFromContext = useStoreWallet(state => state.myWalletAccount);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // Component context
    const [balance, setBalance] = useState<number>(0);
    const [isAccountTested, accountTested] = useState<boolean>(false);
    const [displayAddress, setDisplayAddress] = useState<boolean>(false);
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [nonce, setNonce] = useState<string | undefined>(undefined);
    const [_transactionResult, setTransactionResult] = useState<GetTransactionReceiptResponse | undefined>(undefined);

    const [cairo1Contract, _setcairo1Contract] = useState<Contract>(new Contract(test1Abi, contractAddress, walletAccountFromContext));
    const setAddressAccount = useStoreWallet(state => state.setAddressAccount); // zustand
    const addressAccount = useStoreWallet(state => state.address); // zustand

    async function increaseBalance() {
        console.log("increase-Cairo1ReadContract=", cairo1Contract.functions);
        const myCall = cairo1Contract.populate("increase_counter", [10]);
        console.log("Call=", myCall);
        walletAccountFromContext?.execute(myCall)
            .then(async (resp: InvokeFunctionResponse) => {
                console.log("increaseBalance txH =", resp.transaction_hash);
                setTransactionHash(resp.transaction_hash);
                setTransactionResult(await walletAccountFromContext.waitForTransaction(resp.transaction_hash));
            })
            .catch((e: any) => { console.log("error increase balance =", e) });
    }

    async function getNonce() {
        console.log("try DAPP.getNonce");
        const nonce0 = await walletAccountFromContext?.getNonce()
        console.log("success account.getNonce. result =", nonce0);
        setNonce(nonce0);
    }

    async function getAddress() {
        console.log("try wa.address");
        await walletAccountFromContext?.getAddress();
        setAddressAccount(walletAccountFromContext ?                    walletAccountFromContext.address
            : 
            "0x00");
        console.log("success wa.address");
        setDisplayAddress(true);
    }

    useEffect(() => {
        cairo1Contract.get_balance()
            .then((resp: bigint) => {
                console.log("resp =", resp)
                setBalance(Number(resp));
            })
            .catch((e: any) => { console.log("error get_balance =", e) });
        return () => { }
    }
        , [blockFromContext.block_number]); // balance updated at each block


    return (
        <Box
            bg='mediumaquamarine'
            color='black'
            borderWidth='1px'
            borderRadius='md'
            paddingBottom='3px'
            marginBottom={20}
        >
            {
                !balance ? (
                    <Center>
                        <Spinner color="blue" size="sm" />  _Fetching data ...
                    </Center>
                ) : (
                    <>
                        <div>
                            <Text className={styles.text1}>Balance = {balance} tokens</Text>
                            <Text className={styles.text1}>WalletAccount is instantiated</Text>

                            <Center>
                                <Button
                                    m="4px"
                                    bg='green.100'
                                    onClick={() => {
                                        getAddress();
                                    }}
                                >
                                    Get Address
                                </Button>
                            </Center>
                        </div>
                        {true && (
                            <Center>
                                <Button
                                    ml="4px"
                                    bg='green.100'
                                    onClick={() => {
                                        getNonce();
                                    }}
                                >
                                    Get Account Nonce
                                </Button>
                            </Center>
                        )
                        }
                        {nonce && (
                            <Center>
                                Nonce = {nonce}
                            </Center>
                        )
                        }
                    </>
                )
            }
        </Box>
    )
}
