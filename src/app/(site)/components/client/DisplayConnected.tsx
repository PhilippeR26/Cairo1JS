"use client";

import { Center, Button } from "@chakra-ui/react";
import { useStoreWallet } from "./ConnectWallet/walletContext";
import SelectWallet from "./ConnectWallet/SelectWallet";
import PlayWithCairo1 from "./Contract/PlayWithCairo1";
import DisplayBlockChain from "./Block/DisplayBlockchain";
import WalletDisplay, { type StateWallet } from "./ConnectWallet/WalletDisplay";
import DisplayEvents from "./ConnectWallet/DisplayEvents";
import { WalletConnectModal } from "@starknet-io/get-starknet-ui"
import { GetStarknetProvider } from "@starknet-io/get-starknet-ui"


export function DisplayConnected() {
  const {
    isConnected,
    setConnected,
    address: addressAccount,
    chain: chainId,
    displaySelectWalletUI,
    setSelectWalletUI,
  } = useStoreWallet(state => state);

  const stateWallet: StateWallet = {
    addressAccount: addressAccount,
    chainId: chainId,
    isConnected: isConnected
  }


  return (
    <>
      <GetStarknetProvider>
        {!isConnected ? (
          <>
            <Center>
              <WalletConnectModal />
              <Button
                variant="surface"
                textDecoration="none !important"
                fontWeight='bold'
                outline="none !important"
                boxShadow="none !important"
                mt={3}
                px={5}
                onClick={() => setSelectWalletUI(true)}
              >
                Connect a Wallet
              </Button>
              {displaySelectWalletUI && <SelectWallet></SelectWallet>}
            </Center>
          </>
        ) : (
          <>
            <Center>
              <Button
                variant="surface"
                textDecoration="none !important"
                fontWeight='bold'
                outline="none !important"
                boxShadow="none !important"
                mt={3}
                px={5}
                onClick={() => {
                  setConnected(false);
                  setSelectWalletUI(false)
                }}
              >
                {addressAccount
                  ? `Your wallet : ${addressAccount?.slice(0, 7)}...${addressAccount?.slice(-4)} is connected`
                  : "No Account"}
              </Button>
            </Center>
            <br />
            <WalletDisplay walletData={stateWallet} ></WalletDisplay>
            <DisplayBlockChain ></DisplayBlockChain>
            <DisplayEvents></DisplayEvents>
            <PlayWithCairo1></PlayWithCairo1>
          </>
        )
        }
      </GetStarknetProvider>
    </>
  )
}