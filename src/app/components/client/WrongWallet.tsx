"use client";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

export default function WrongWallet() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        onOpen();
      }
        , []);

    return (
      <>
        <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />

                    <ModalContent>
                        <ModalHeader fontSize='lg' fontWeight='bold'>
                            Error.
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            This wallet is not compatible<br />
                            with the new Wallet API.
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                Understood
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
      </>
    );
  }