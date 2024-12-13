import { GetTransactionReceiptResponse, json, type RejectedTransactionReceiptResponse, type RevertedTransactionReceiptResponse, type SuccessfulTransactionReceiptResponse } from "starknet";

import { Box, Spinner } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import { useTransactionReceipt } from '@starknet-react/core';

type Props = { transactionHash: string };
const waiting: string = "waiting data";

export default function TransactionStatus({ transactionHash }: Props) {
    const { data: txR } = useTransactionReceipt({ hash: transactionHash, refetchInterval: 5_000 });

    function formatTxR(txR: GetTransactionReceiptResponse): string {
        let finality: string = "";
        txR.match({
            success: (txR: SuccessfulTransactionReceiptResponse) => {
                finality = txR.finality_status;
            },
            rejected: (txR: RejectedTransactionReceiptResponse) => {
                finality = json.stringify(txR.transaction_failure_reason);
            },
            reverted: (txR: RevertedTransactionReceiptResponse) => {
                finality = txR.finality_status;
            },
            error: (err: Error) => {
                finality = err.message;
            },
            _: () => {
                console.log('Unsuccess');
            },
        });
        console.log("TxFinality =", finality);
        return txR.statusReceipt + " " + finality;
    }


    return (
        <>
            <Box className={styles.text1}>Transaction is : {" "}
                {!txR ?
                    (<Spinner color="blue" size="sm" mr={4} />)
                    : formatTxR(txR)}
            </Box>
        </>
    )
}