import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";
import { useContext } from "react";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { __ } from "@/helpers/common";
import { CHAINS_IMAGES } from "@/constants/env"
import { isCorrectNetworWithoutWarning } from "@/modules/utils"
import Responsive from "@/hooks/useResponsive";
export function AvailableNetworks({ isOpen, onClose }: any) {
  const {
    chain,
    switchNetwork,
    chains,
  } = useContext<any>(WalletConnectContext)
  const {isMobile} = Responsive()
  function componentImage(chain: any) {
    let imageChain: string = ""
    const status = isCorrectNetworWithoutWarning(chain)
    if(status){
      imageChain = CHAINS_IMAGES[chain?.id]
    }
    
    return (
      <>
        <Image
          w="42px"
          h="42px"
          src={imageChain}
          alt={chain?.name}
        />
      </>
    )
  }
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
      >
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent p="35px">
          <ModalHeader fontSize={"17px"} color={"primary.200"} fontWeight={600}>
          {__('choose_network')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody color={"gray.400"} fontSize={"18px"} >
            <Box className={`${isMobile? "grid grid-cols-1 gap-6":"grid grid-cols-2 gap-6"}`}>
              {chains?.map((value: any, index: any) => (
                <Box
                  key={index}
                  bg="white"
                  textAlign="center"
                  borderRadius="12px"
                  boxShadow="0px 4px 10px rgba(150, 150, 150, 0.1)"
                  minW="208px"
                  p="20px"
                  border="2px solid transparent"
                  onClick={() => {
                    if (switchNetwork || value.id !== chain?.id) {
                      switchNetwork?.(value.id);
                      onClose();
                    }
                  }}
                  _hover={{
                    cursor: "pointer",
                    border:"2px solid #0026E6",
                    bg:"primary.10",
                    color:"primary.100",
                    
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    borderRadius="50%"
                  >
                    {componentImage(value)}
                  </Box>
                  <Text w="100%" mt="12px" color="gray.400"
                  >
                    {value.name}
                  </Text>
                </Box>
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
