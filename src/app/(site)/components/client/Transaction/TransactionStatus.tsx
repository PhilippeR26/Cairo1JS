import { useEffect, useState } from 'react';
import { GetTransactionReceiptResponse } from "starknet";

import { useStoreBlock } from "../Block/blockContext";
import { useStoreWallet } from '../ConnectWallet/walletContext';

import { Spinner, Text } from "@chakra-ui/react";
import styles from '../../../page.module.css'

type Props = { transactionHash: string };
const waiting:string="waiting data";

export default function TransactionStatus({ transactionHash }: Props) {
    // wallet context
    const myProvider = useStoreWallet(state => state.myProvider);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // component context
    const [txStatus, setTxStatus] = useState<string>(waiting);

    useEffect(() => {
        myProvider.getTransactionReceipt(transactionHash)
            .then((resp: GetTransactionReceiptResponse) => {
                console.log("TxStatus =", resp);
                setTxStatus(resp.execution_status ?? waiting);
            })
            .catch((e: any) => { 
                setTxStatus( waiting);
                console.log("error getTransactionStatus=", e) });
        return () => { }
    }
        , [blockFromContext.blockNumber]);

    return (
        <>
            <Text className={styles.text1}>Transaction is : {" "}
                {txStatus=== waiting ?
                    (<Spinner color="blue" size="sm" mr={4} />)
                    : txStatus}
            </Text>
        </>
    )
}