import { Image, StackSeparator, VStack, useDisclosure } from "@chakra-ui/react";
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
import { useEffect } from "react";
import { useAccount, useConnect, useProvider, type Connector } from "@starknet-react/core";


export default function SelectWallet() {
  const { open, onOpen, onClose } = useDisclosure()

  const displaySelectWalletUI = useStoreWallet(state => state.displaySelectWalletUI);
  const setSelectWalletUI = useStoreWallet(state => state.setSelectWalletUI);

  const { connectAsync, connectors } = useConnect();

  useEffect(
    () => {
      onOpen();
      return () => { }
    },
    []
  );


  return (
    <DialogRoot
      placement={"center"}
      scrollBehavior={"inside"}
      size="sm"
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
          fontSize='lg'
          fontWeight='bold'
          mx={5}
          mt={1}
          mb={5}
        >
          Select a wallet.
        </DialogHeader>
        <DialogBody>
          <VStack
            separator={<StackSeparator borderColor='gray.200' />}
            gap={1}
            align='stretch'
          >
            {
              connectors.map((connector: Connector, index: number) => {
                return <>
                  <Button
                    key={"wId" + index.toString()}
                    variant="surface"
                    fontWeight='bold'
                    onClick={async () => {
                      setSelectWalletUI(false);
                      await connectAsync({ connector });
                      onClose();
                    }} >
                    <Image src={connector.icon as string} width={30} />
                    {connector.name}
                  </Button>
                </>
              })
            }
          </VStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
