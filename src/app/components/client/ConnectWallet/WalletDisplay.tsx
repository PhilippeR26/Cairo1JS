import { Box, Text } from "@chakra-ui/react";
import styles from '../../../page.module.css';
import { shortString } from "starknet";
import { useConnect } from "@starknet-io/get-starknet-ui";


export default function WalletDisplay() {
    //const chainName = shortString.decodeShortString(walletData.chainId);
    const { connected ,} = useConnect();

    return (
        <>
            <Box bg='pink.200' color='black' borderWidth='1px' borderRadius='md'>
                <Text className={styles.text1}>
                    address = {connected?connected.accounts[0].address:"***"} <br />
                    {/* chainId = {connected?connected.} <br />
                    {chainName !== "SN_SEPOLIA" && <>
                        <Text as="span" color={'red'} fontWeight={"extrabold"} fontSize={"2xl"}>Change to Sepolia Testnet</Text>
                        <br />
                    }
                    </> */}
                    
                    isConnected={connected ? "Yes" : "No"}<br />
                </Text>
            </Box>
        </>
    )
}