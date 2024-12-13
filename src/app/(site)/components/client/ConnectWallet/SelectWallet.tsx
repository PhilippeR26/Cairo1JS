import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, StackDivider, VStack, useDisclosure } from "@chakra-ui/react";
import { useStoreWallet } from "./walletContext";
import { useEffect } from "react";
import { useAccount, useConnect, useProvider, type Connector } from "@starknet-react/core";


export default function SelectWallet() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const displaySelectWalletUI = useStoreWallet(state => state.displaySelectWalletUI);
  const setSelectWalletUI = useStoreWallet(state => state.setSelectWalletUI);

  const {connectAsync, connectors } = useConnect();

  useEffect(
    () => {
      onOpen();
      return () => { }
    },
    []
  );


  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSelectWalletUI(false);
        onClose()
      }}
      closeOnOverlayClick={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize='lg' fontWeight='bold'>
          Select a wallet.
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={3}
            align='stretch'
          >
            {
              connectors.map((connector: Connector, index: number) => {
                return <Button
                  key={"wId" + index.toString()}
                  leftIcon={<Image src={connector.icon as string} width={30} />}
                  onClick={async () => {
                    setSelectWalletUI(false);
                    // setConnected(true);
                    await connectAsync({ connector });
                    onClose();
                  }} >
                  {connector.name}
                </Button>
              })
            }
          </VStack>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}