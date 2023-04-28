import { use, useEffect, useMemo, useState } from 'react';
import { Provider, ProviderInterface, RpcProvider, constants, GetBlockResponse, Contract, uint256, shortString } from "starknet";

import { useStoreBlock, DataBlock, dataBlockInit } from "../Block/blockContext";
import { useStoreWallet } from '../../Wallet/walletContext';

import { Text, Button, Center, Spinner } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { erc20Abi } from "../../../contracts/abis/ERC20abi";
import { test1Abi } from "../../../contracts/abis/test1";

const contractAddress = "0x697d3bc2e38d57752c28be0432771f4312d070174ae54eef67dd29e4afb174";

export default function PlayWithCairo1() {
    // wallet context
    const providerSN = useStoreWallet(state => state.provider);
    const accountAddressFromContext = useStoreWallet(state => state.address);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    const [balance, setBalance] = useState<number>(0);
    const [decimals, setDecimals] = useState<number>(1)
    const [symbol, setSymbol] = useState<string>("");

    const cairo1Contract = new Contract(test1Abi, contractAddress, providerSN);


    useEffect(() => {
        cairo1Contract.get_balance()
            .then((resp: any) => {
                console.log("resp =", resp)
                // const res2 = resp.balance;
                // const res3 = Number(uint256.uint256ToBN(res2));
                // console.log("res3=", res3);
                setBalance(Number(resp));
            }

            )
            .catch((e: any) => { console.log("error get_balance =", e) });

        return () => { }
    }
        , [blockFromContext.blockNumber]); // balance updated at each block


    return (
        <>
            {
                !balance ? (
                    <Center>

                        <Spinner color="blue" size="sm" />  _Fetching data ...
                    </Center>

                ) : (
                    <>
                        <Text className={styles.text1}>Balance = {balance} {symbol} </Text>
                        <Center>
                            <Button
                                ml="4"
                                textDecoration="none !important"
                                outline="none !important"
                                boxShadow="none !important"
                                onClick={() => {
                                    // IncreaseBalance();
                                }}
                            >
                                Increase balance (+10)
                            </Button>

                        </Center>
                    </>
                )
            }

        </>

    )
}