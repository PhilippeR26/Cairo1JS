import { wait } from "@/utils/utils";
import { Box, Button, StackDivider, VStack, Text, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import styles from '../../../page.module.css'
import { Contract, WalletAccount } from "starknet";
import { rejectContract } from "@/app/contracts/reject.sierra.json";
import { Cairo1ContractAddress, myFrontendProviders } from "@/utils/constants";
import { useFrontendProvider } from "../provider/providerContext";
import { StarknetChainId } from "@/app/core/rpcMessage";

export default function WalletAccountTag() {
    const DISPLAY_DURATION = 10 * 1000 // ms

    const myFrontendProviderIndex = useFrontendProvider(state => state.currentFrontendProviderIndex);
   // const myWalletAccount=new WalletAccount()

    const [displayReadMyProv, setDisplayReadMyProv] = useState<Boolean>(false);
    const [resultReadMyProv, setResultReadMyProv] = useState<string>("");
    const [displayReadWalletAccount, setDisplayReadWalletAccount] = useState<Boolean>(false);
    const [resultReadWalletAccount, setResultReadWalletAccount] = useState<string>("");

    const [testContract, SetTestContract] = useState<Contract>(new Contract(rejectContract.abi, "0x00"));

    const handleReadMyProvider = () => {
        let response: string = "A";

        testContract.get_counter()
            .then(
                (result: any) => {
                    response = result.toString()
                })
            .catch((error: any) => { response = error.toString() })
            .finally(() => {
                setDisplayReadMyProv(true);
                setResultReadMyProv(response);
            });
    }

    const handleReadWalletAccount = () => {
        let response: string = "A";

        testContract.get_counter()
            .then(
                (result: any) => {
                    response = result.toString()
                })
            .catch((error: any) => { response = error.toString() })
            .finally(() => {
                setDisplayReadMyProv(true);
                setResultReadMyProv(response);
            });
    }

    useEffect(
        () => {
            let timeId: NodeJS.Timeout;
            if (displayReadMyProv) {
                timeId = setTimeout(() => { setDisplayReadMyProv(false) }, DISPLAY_DURATION);
            }
            return () => { clearTimeout(timeId) }
        }
        , [displayReadMyProv]
    )

    const DefineContract = () => {
        SetTestContract(new Contract(
            rejectContract.abi,
            Cairo1ContractAddress[myFrontendProviderIndex],
            myFrontendProviders[myFrontendProviderIndex]
        ))
    }
    useEffect(
        () => { DefineContract() }
        , []
    )
    useEffect(
        () => { DefineContract() }
        , [myFrontendProviderIndex]
    );

    return (
        <VStack
            divider={<StackDivider borderColor='gray.300' />}
            spacing={3}
        >
            <Center fontSize={18} fontWeight={700} color={"firebrick"}> Use of {Object.keys(StarknetChainId)[myFrontendProviderIndex]} network </Center>
            <>
                <p>Read with my own frontend provider :</p>
                <Button
                    onClick={() => {
                        handleReadMyProvider()
                    }} >Read Contract
                </Button>
                {displayReadMyProv ? (
                    <Box bg='green.200' color='black' borderWidth='1px' borderColor='green.800' borderRadius='md' p={1} marginTop={2}>
                        <Text className={styles.text1}>result : {resultReadMyProv}</Text>

                    </Box>
                ) : null}
            </>
            <>
                <p>Read with a WalletAccount (with my own frontend provider) :</p>
                <Button
                    onClick={() => {
                        handleReadWalletAccount()
                    }} >Read Contract
                </Button>
            </>
            <>
                <p>Invoke with a WalletAccount (with the wallet) :</p>
                <Button
                    onClick={() => {


                    }} >Invoke Contract
                </Button>
            </>

        </VStack>
    )
}