

import styles from '@/app/(site)/page.module.css'

import { Box } from "@chakra-ui/react";
import VisualWrapper from "../VisualWrapper";
// import { WalletState } from "../../client/ConnectWallet/walletContext";
 import { StateWallet } from "./types";

interface WalletProps {
     walletData: StateWallet
 }
// type Props = { walletData: string };
export default  function WalletDisplay( {walletData}:WalletProps) {
    return (
        <>
        <Box bg='pink.200' color='black' borderWidth='1px' borderRadius='md'>
            <p className={styles.text1}>
            
                address = {walletData.addressAccount} <br />
                chain = {walletData.chainId}<br />
                isConnected={walletData.isConnected ? "Yes" : "No"}<br />
            </p>
        </Box>
        </>
    )
}