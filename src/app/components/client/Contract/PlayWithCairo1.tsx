import { use, useEffect, useMemo, useState } from 'react';
import { Provider, ProviderInterface, RpcProvider, constants, GetBlockResponse, Contract, AccountInterface, uint256, shortString, InvokeFunctionResponse } from "starknet";

import { useStoreBlock, DataBlock, dataBlockInit } from "../Block/blockContext";
import { useStoreWallet } from '../../Wallet/walletContext';

import { Text, Button, Center, Spinner, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { erc20Abi } from "../../../contracts/abis/ERC20abi";
import { test1Abi } from "../../../contracts/abis/test1";
import { contratSierra } from "../../../contracts/test_type1_sierra";

const contractAddress = "0x697d3bc2e38d57752c28be0432771f4312d070174ae54eef67dd29e4afb174";

export default function PlayWithCairo1() {
    // wallet context
    const providerSN = useStoreWallet(state => state.provider);
    const accountAddressFromContext = useStoreWallet(state => state.address);
    const accountFromContext = useStoreWallet(state => state.account);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // Component context
    const [balance, setBalance] = useState<number>(0);
    const [transactionHash, setTransactionHash] = useState<string>("");

    const cairo1Contract = new Contract(test1Abi, contractAddress, providerSN);
    if (accountFromContext) { cairo1Contract.connect(accountFromContext); }

    useEffect(() => {
        cairo1Contract.get_balance()
            .then((resp: bigint) => {
                console.log("resp =", resp)
                setBalance(Number(resp));
            })
            .catch((e: any) => { console.log("error get_balance =", e) });
        return () => { }
    }
        , [blockFromContext.blockNumber]); // balance updated at each block


    function IncreaseBalance() {
        cairo1Contract.increase_balance(10)
            .then((resp: InvokeFunctionResponse) => {
                console.log("resp =", resp.transaction_hash)
                setTransactionHash(resp.transaction_hash);
            })
            .catch((e: any) => { console.log("error increase balance =", e) });
    }

    return (
        <>
            {
                !balance ? (
                    <Center>
                        <Spinner color="blue" size="sm" />  _Fetching data ...
                    </Center>
                ) : (
                    <>
                        <div>
                            <Text className={styles.text1}>Balance = {balance} tokens</Text>
                            <Center>
                                <Button
                                    ml="4"
                                    textDecoration="none !important"
                                    outline="none !important"
                                    boxShadow="none !important"
                                    bg='green.100'
                                    onClick={() => {
                                        IncreaseBalance();
                                    }}
                                >
                                    Increase balance (+10)
                                </Button>
                            </Center>
                        </div>
                        {!!transactionHash && (
                            <Box bg='green.200' color='black' borderWidth='1px'  borderColor='green.800' borderRadius='md' p={1} marginTop={2}>
                                <Text className={styles.text1}>Transaction in progress</Text>
                            </Box>
                        )

                        }

                    </>
                )
            }

        </>

    )
}