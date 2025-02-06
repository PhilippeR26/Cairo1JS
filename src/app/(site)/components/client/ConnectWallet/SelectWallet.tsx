import { isWalletObject } from "@starknet-io/get-starknet-core";

import { Image, Separator, StackSeparator, VStack, useDisclosure } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStoreWallet } from "./walletContext";
import { useFrontendProvider } from "../provider/providerContext";
import { useEffect } from "react";
import { useState } from "react";
import { WalletAccount, wallet, validateAndParseAddress, constants as SNconstants, json } from "starknet";
import { WALLET_API } from "@starknet-io/types-js";
import { compatibleApiVersions, myFrontendProviders } from "@/utils/constants";
import getStarknet from "@starknet-io/get-starknet-core"
import { createStore, type Store } from "getSnDiscovery";
import { isStarknetWallet, type WalletWithStarknetFeatures } from "getSnStandard/features";
import type { StarknetInjectedWallet } from "getSnStandard";

// export interface StarknetWalletProvider extends StarknetWindowObject {}
type ValidWallet = {
  wallet: WALLET_API.StarknetWindowObject;
  isValid: boolean;
}


export default function SelectWallet() {
  const { open, onOpen, onClose } = useDisclosure()

  const myWallet = useStoreWallet(state => state.StarknetWalletObject);
  const setMyWallet = useStoreWallet(state => state.setMyStarknetWalletObject);

  const myWalletAccount = useStoreWallet(state => state.myWalletAccount);
  const setMyWalletAccount = useStoreWallet(state => state.setMyWalletAccount);
  const myFrontendProviderIndex = useFrontendProvider(state => state.currentFrontendProviderIndex);
  const setCurrentFrontendProviderIndex = useFrontendProvider(state => state.setCurrentFrontendProviderIndex);

  const isConnected = useStoreWallet(state => state.isConnected);
  const setConnected = useStoreWallet(state => state.setConnected);

  const displaySelectWalletUI = useStoreWallet(state => state.displaySelectWalletUI);
  const setSelectWalletUI = useStoreWallet(state => state.setSelectWalletUI);

  const setWalletApi = useStoreWallet(state => state.setWalletApiList);

  const setChain = useStoreWallet(state => state.setChain);
  const setAddressAccount = useStoreWallet(state => state.setAddressAccount);

  const store: Store = createStore();
  const wallets: WalletWithStarknetFeatures[] = store.getWallets();
  console.log(wallets);

  const [walletList, setWalletList] = useState<ValidWallet[]>([]);

  const handleSelectedWallet = async (selectedWallet: WalletWithStarknetFeatures) => {
    
    const w=selectedWallet as StarknetInjectedWallet;
    setConnected(true);
    // WALLET_API.StarknetWindowObject

    // setMyWallet(selectedWallet); // zustand
    // console.log("Trying to connect wallet=", selectedWallet);
    // setMyWallet(selectedWallet); // zustand
    // const myWA=await WalletAccount.connect(myFrontendProviders[2], selectedWallet);
    // setMyWalletAccount(myWA);
    // console.log("WalletAccount created=",myWA);
    // const result = await wallet.requestAccounts(selectedWallet);
    // if (typeof (result) == "string") {
    //   console.log("This Wallet is not compatible.");
    //   setSelectWalletUI(false);
    //   return;
    // }
    // console.log("Current account addr =", result);
    // if (Array.isArray(result)) {
    //   const addr = validateAndParseAddress(result[0]);
    //   setAddressAccount(addr); // zustand
    // }
    // const isConnectedWallet: boolean = await wallet.getPermissions(selectedWallet).then((res: any) => (res as WALLET_API.Permission[]).includes(WALLET_API.Permission.ACCOUNTS));
    // setConnected(isConnectedWallet); // zustand
    // if (isConnectedWallet) {
    //   const chainId = (await wallet.requestChainId(selectedWallet)) as string;
    //   setChain(chainId);
    //   setCurrentFrontendProviderIndex(chainId === SNconstants.StarknetChainId.SN_MAIN ? 0 : 2);

    //   console.log("change Provider index to :", myFrontendProviderIndex);
    // }
    // // ********** TODO : replace supportedSpecs by api versions when available in SNJS
    // setWalletApi(await wallet.supportedSpecs(selectedWallet));
console.log("selected wallet =",json.stringify(selectedWallet));
    setSelectWalletUI(false);
  }

  useEffect(
    () => {
      console.log("Launch select wallet window.");
      onOpen();
      return () => { }
    },
    []
   );

  return (
    <>
      <DialogRoot
        placement={"center"}
        scrollBehavior={"inside"}
        size={"md"}
        open={open}
        closeOnInteractOutside={true}
        onOpenChange={() => {
          setSelectWalletUI(false);
          onClose()
        }}
      >
        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader
            fontSize='xl'
            fontWeight='bold'
            padding={"20px"}
            marginBottom={"10px"}
          >
            Select a wallet:
          </DialogHeader>
          <DialogBody
            px={"20px"}
          >
            <VStack
              separator={<StackSeparator borderColor='gray.200' />}
              gap={3}
              marginBottom={"20px"}
              align='stretch'
            >
              {
                wallets.map((wallet: WalletWithStarknetFeatures, index: number) => {
                  const iconW: string = wallet.icon;
                  return <>
                    {isStarknetWallet(wallet) ? <>
                      <Button
                        key={"wKey" + index.toString()}
                        id={"wId" + index.toString()}
                        // backgroundColor="gray.100"
                        // color={"black"}
                        variant="surface"
                        fontSize='lg'
                        fontWeight='bold'
                        onClick={() => {
                          handleSelectedWallet(wallet);
                          onClose();
                        }} >
                        <Image src={iconW} width={30} />
                        {wallet.name + ' ' + wallet.version}
                      </Button>
                    </> : <>
                      <Button
                        key={"wKey" + index.toString()}
                        id={"wId" + index.toString()}

                        variant="surface"
                        fontSize='lg'
                        fontWeight='bold'
                        backgroundColor="orange"
                        disabled={true}
                      >
                        <Image src={iconW} width={30} />
                        {(wallet as WalletWithStarknetFeatures).name + ' ' + (wallet as WalletWithStarknetFeatures).version + " not compatible!"}
                      </Button>
                    </>}
                  </>
                })
              }
            </VStack>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  )

}