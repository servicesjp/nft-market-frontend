import { Flex, Modal, ModalCloseButton, ModalContent, ModalOverlay, Image } from "@chakra-ui/react"

export function ImageModal({ disclosure, imageSrc, alt }: any) {
    return (
      <Modal
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        isCentered={true}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent background={"transparent"} maxW={"90%"} w={"auto"}>
          <ModalCloseButton />
          <Flex justify={"center"}  align={"center"}>
            <Image
              borderRadius={"4px"}
              fit={"contain"}
              objectPosition={"center center"}
              src={imageSrc}
              alt={alt}
            />
          </Flex>
        </ModalContent>
      </Modal>
    );
  }