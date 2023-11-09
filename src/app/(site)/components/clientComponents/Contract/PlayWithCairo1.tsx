import { useEffect, useState } from 'react';
import { Call, Contract, InvokeFunctionResponse } from "starknet";

import { useStoreBlock } from "../provider/Block/blockContext";
import { useStoreWallet } from '../ConnectWallet/walletContext';

import { Text, Button, Center, Spinner, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { test1Abi } from "../../../contracts/abis/test1";
import TransactionStatus from '../Transaction/TransactionStatus';
import { useStoreServer } from '../provider/serverContext';

const contractAddress = "0x697d3bc2e38d57752c28be0432771f4312d070174ae54eef67dd29e4afb174";
enum TxPayer { Server = "SERVER", Wallet = "WALLET" };

export default function PlayWithCairo1() {
    // wallet context
    //const providerW = useStoreWallet(state => state.providerW);
    const accountW = useStoreWallet(state => state.accountW);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // server context
    const account0S = useStoreServer.getState().account0S;

    // Component context
    const [balance, setBalance] = useState<number>(0);
    const [transactionHash, setTransactionHash] = useState<string>("");

    const cairo1Contract = new Contract(test1Abi, contractAddress, undefined);
    //if (accountW) { cairo1Contract.connect(accountW); }

    useEffect(() => {
        cairo1Contract.get_balance()
            .then((resp: bigint) => {
                console.log("Counter read =", resp)
                setBalance(Number(resp));
            })
            .catch((e: any) => { console.log("error get_balance =", e) });
        return () => { }
    }
        , [blockFromContext.blockNumber]); // balance updated at each block


    function IncreaseBalance(whoPay: TxPayer) {
        const callIncrease: Call = cairo1Contract.populate("increase_balance", [10]);
        switch (whoPay) {
            case TxPayer.Server: {
                account0S?.execute(callIncrease)
                    .then((resp: InvokeFunctionResponse) => {
                        console.log("increaseBalance from server txH =", resp.transaction_hash)
                        setTransactionHash(resp.transaction_hash);
                    })
                    .catch((e: any) => { console.log("error increase balance with Wallet =", e) });
                break;
                break;
            }
            case TxPayer.Wallet: {
                accountW?.execute(callIncrease)
                    .then((resp: InvokeFunctionResponse) => {
                        console.log("increaseBalance form wallet txH =", resp.transaction_hash)
                        setTransactionHash(resp.transaction_hash);
                    })
                    .catch((e: any) => { console.log("error increase balance with Wallet =", e) });
                break;
            }
        }

    }



    return (
        <Box bg='mediumaquamarine' color='black' borderWidth='1px' borderRadius='md' paddingBottom='3px'>
            {
                !balance ? (
                    <Center>
                        <Spinner color="blue" size="sm" />  _Fetching data ...
                    </Center>
                ) : (
                    <>
                        <div>
                            <Text className={styles.text1}>Balance of Cairo 1 🦀 contract = {balance} tokens</Text>
                            <Center>
                                <Button
                                    ml="4"
                                    textDecoration="none !important"
                                    outline="none !important"
                                    boxShadow="none !important"
                                    bg='green.100'
                                    onClick={() => {
                                        IncreaseBalance(TxPayer.Server);
                                    }}
                                >
                                    Increase balance (+10)<br></br>
                                    (fees paid by server)
                                </Button>
                                <Button
                                    ml="4"
                                    textDecoration="none !important"
                                    outline="none !important"
                                    boxShadow="none !important"
                                    bg='green.100'
                                    onClick={() => {
                                        IncreaseBalance(TxPayer.Wallet);
                                    }}
                                >
                                    Increase balance (+10)<br></br>
                                    (fees paid by Wallet)
                                </Button>
                            </Center>
                        </div>
                        {!!transactionHash && (
                            <Box bg='green.300' color='black' borderWidth='1px' borderColor='green.800' borderRadius='md' p={1} marginTop={2}>
                                <Text className={styles.text1}>Last transaction status :</Text>
                                <TransactionStatus transactionHash={transactionHash}></TransactionStatus>
                            </Box>
                        )
                        }
                    </>
                )
            }
        </Box>
    )
}
