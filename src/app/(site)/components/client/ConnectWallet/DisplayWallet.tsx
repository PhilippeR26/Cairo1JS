import { Box } from "@chakra-ui/react"
import styles from '../../../page.module.css'
import type { Connector } from "@starknet-react/core"

export interface StateWallet {
    addressAccount:string,
    chainId:string,
    isConnected:boolean
    connector?:Connector
}

interface WalletProps {
    walletData: StateWallet
}
export default  function WalletDisplay( {walletData}:WalletProps) {
   return (
       <>
       <Box bg='pink.200' color='black' borderWidth='1px' borderRadius='md'>
           <p className={styles.text1}>
            wallet = {walletData.connector?.name} <br></br>
               chain = {walletData.chainId} <br /> 
               address = {walletData.addressAccount} <br />
               isConnected = {walletData.isConnected ? "Yes" : "No"}<br />
           </p>
       </Box>
       </>
   )
}