import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useStoreWallet } from "./walletContext";
import type { StandardEventsChangeProperties } from "@wallet-standard/features";
import { getStarknetChainId } from "@starknet-io/get-starknet-wallet-standard/chains";
import { encode, shortString } from "starknet";



export default function DisplayEvents() {
    const {
        myWalletAccount: selectedWalletAccountV5
    } = useStoreWallet(state => state);

    const [time1, setTime1] = useState<string>("N/A");
    const [time2, setTime2] = useState<string>("N/A");

    function getTime(): string {
        const date = new Date();
        return date.toLocaleTimeString();
    }
    const waitingString = "..." as const;
    const [currentChainId, setCurrentChainId] = useState<string>(waitingString);
    const [currentAccount, setCurrentAccount] = useState<string>(waitingString);

    const addEvent = useCallback((change: StandardEventsChangeProperties) => {
        console.log("Event detected", change.accounts);
        if (change.accounts?.length) {
            console.log("account event=", change.accounts[0].address);
            setCurrentAccount(change.accounts[0].address);
            setTime1(getTime());
            const network = change.accounts[0].chains[0];
            console.log("network event=", network);
            setCurrentChainId(getStarknetChainId(network));
            setTime2(getTime())
        }
    }, []);

    useEffect(
        () => {
            console.log("Subscribe events...");
            selectedWalletAccountV5?.onChange(addEvent);
            return () => {
                console.log("unsubscribe to events...");
                selectedWalletAccountV5?.unsubscribeChange();
                console.log("events OFF!");
            }
        }
        , [selectedWalletAccountV5, addEvent]
    );

    return <SimpleGrid minChildWidth="250px" gap="5px" py="3px">
        <Box bg="lightblue" color='black' borderWidth='1px' borderRadius='lg'>
            <Center> Last accountsChanged event : </Center>
            <Center>Time: {time1} </Center>
            <Center>Response: {currentAccount.slice(0, 20) + "..."} </Center>
        </Box>
        <Box bg="lightblue" color='black' borderWidth='1px' borderRadius='lg'>
            <Center> Last networkChanged event : </Center>
            <Center>Time: {time2} </Center>
            <Center>Response: {currentChainId !== waitingString ? shortString.decodeShortString(currentChainId) : currentChainId} </Center>
        </Box>
    </SimpleGrid>
}

