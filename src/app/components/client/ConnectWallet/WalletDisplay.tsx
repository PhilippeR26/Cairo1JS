import { Box, Text } from "@chakra-ui/react"
import styles from '../../../page.module.css'
import { shortString } from "starknet"

export interface StateWallet {
    addressAccount: string,
    chainId: string,
    isConnected: boolean
}

interface WalletProps {
    walletData: StateWallet
}
export default function WalletDisplay({ walletData }: WalletProps) {
    const chainName = shortString.decodeShortString(walletData.chainId);

    return (
        <>
            <Box bg='pink.200' color='black' borderWidth='1px' borderRadius='md'>
                <Text className={styles.text1}>
                    address = {walletData.addressAccount} <br />
                    chainId = {chainName} <br />
                    {chainName !== "SN_SEPOLIA" && <>
                        <Text as="span" color={'red'} fontWeight={"extrabold"} fontSize={"2xl"}>Change to Sepolia Testnet</Text>
                        <br />
                    </>
                    }
                    isConnected={walletData.isConnected ? "Yes" : "No"}<br />
                </Text>
            </Box>
        </>
    )
}