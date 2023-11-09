import { useEffect, useState } from 'react';
import { GetTransactionReceiptResponse, RPC } from "starknet";

import { useStoreBlock } from "../provider/Block/blockContext";
import { useStoreWallet } from '../ConnectWallet/walletContext';

import { Text } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import { useStoreServer } from '../provider/serverContext';

type Props = { transactionHash: string };

export default function TransactionStatus({ transactionHash }: Props) {
    // wallet context
    const providerS = useStoreServer(state => state.providerServer);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // component context
    const [txStatus, setTxStatus] = useState<string>("");

    useEffect(() => {
        providerS?.waitForTransaction(transactionHash);
        providerS?.getTransactionReceipt(transactionHash)
            .then((resp:RPC.TransactionReceipt) => {
                console.log("TxStatus =", resp);
                setTxStatus(resp.execution_status ?? "Undef");
            })
            .catch((e: any) => { console.log("error getTransactionStatus=", e) });
        return () => { }
    }
        , [blockFromContext.blockNumber]);

    return (
        <>
            <Text className={styles.text1}>Transaction is : {txStatus} </Text>
        </>

    )
}