import { Box } from "@chakra-ui/react"
import styles from '../../../page.module.css'
import { shortString } from "starknet"

export interface StateWallet {
    addressAccount:string,
    chainId:string,
    isConnected:boolean
}

interface WalletProps {
    walletData: StateWallet
}
export default  function WalletDisplay( {walletData}:WalletProps) {
   return (
       <>
       <Box bg='pink.200' color='black' borderWidth='1px' borderRadius='md'>
           <p className={styles.text1}>
           
               address = {walletData.addressAccount} <br />
               chain = {shortString.decodeShortString(walletData.chainId)} <br /> 
               isConnected={walletData.isConnected ? "Yes" : "No"}<br />
           </p>
       </Box>
       </>
   )
}