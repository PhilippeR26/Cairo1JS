import { useEffect, useState } from 'react';
import { GetTransactionReceiptResponse, json, type RevertedTransactionReceiptResponse, type SuccessfulTransactionReceiptResponse } from "starknet";

import { useStoreBlock } from "../Block/blockContext";

import { Box, Spinner } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import { useFrontendProvider } from '../provider/providerContext';
import { myFrontendProviders } from '@/utils/constants';

type Props = { transactionHash: string };
const waiting: string = "waiting data";

export default function TransactionStatus({ transactionHash }: Props) {
    // wallet context
    const myProviderIndex= useFrontendProvider(state=>state.currentFrontendProviderIndex);
    const myProvider=myFrontendProviders[myProviderIndex];

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // component context
    const [txStatus, setTxStatus] = useState<string>(waiting);

    useEffect(() => {
        myProvider?.waitForTransaction(transactionHash)
            .then((txR: GetTransactionReceiptResponse) => {
                console.log("TxStatus =", txR.statusReceipt);
                let finality: string = "";
                txR.match({
                    success: (txR: SuccessfulTransactionReceiptResponse) => {
                        finality = txR.finality_status;
                    },
                    reverted: (txR: RevertedTransactionReceiptResponse) => {
                        finality = txR.finality_status;
                    },
                    error: (err: Error) => {
                        finality= err.message;
                    },
                    _: () => {
                        console.log('Unsuccess');
                    },
                });
                console.log("TxFinality =", finality);
                setTxStatus(txR.statusReceipt+" "+finality);
            })
            .catch((e: any) => {
                setTxStatus(waiting);
                console.log("error getTransactionStatus=", e)
            });
        return () => { }
    }
        , [blockFromContext.block_number]);

    return (
        <>
            <Box className={styles.text1}>Transaction is : {" "}
                {txStatus === waiting ?
                    (<Spinner color="blue" size="sm" mr={4} />)
                    : txStatus}
            </Box>
        </>
    )
}