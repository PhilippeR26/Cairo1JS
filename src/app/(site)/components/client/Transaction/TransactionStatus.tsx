import { useEffect, useState } from 'react';
import { GetTransactionReceiptResponse } from "starknet";

import { useStoreBlock } from "../Block/blockContext";
import { useStoreWallet } from '../ConnectWallet/walletContext';

import { Text } from "@chakra-ui/react";
import styles from '../../../page.module.css'

type Props = { transactionHash: string };

export default function GetBalance({ transactionHash }: Props) {
    // wallet context
    const providerSN = useStoreWallet(state => state.providerW);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // component context
    const [txStatus, setTxStatus] = useState<string>("");

    useEffect(() => {
        providerSN?.getTransactionReceipt(transactionHash)
            .then((resp: GetTransactionReceiptResponse) => {
                console.log("TxStatus =", resp);
                setTxStatus(resp.status ?? "Undef");
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