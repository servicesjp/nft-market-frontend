import { __ } from "@/helpers/common";
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Button
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Responsive from "@/hooks/useResponsive";
import { getLoginUrlWithRedirect } from "@/modules/login-redirect/login-redirect-service";
export function WarningLog({ isOpen, onClose }: any) {
  const { isMobile } = Responsive();
  const router = useRouter();
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent
          p={"24px"}
          overflow="hidden"
          bgImage="url(/warning/login.png)"
          bgPosition="center"
          bgRepeat="no-repeat"
          color="white"
          h="487px"
          {...(isMobile ? { mx: "24px" } : {})}
        >
          <ModalCloseButton mt={"10px"} mr={"10px"} p={0} zIndex={30} />
          <ModalBody
            h="100%"
            w="100%"
            display="flex"
            justifyContent="start"
            alignItems="end"
            pb="50px"
          >
            <Box
              {...(isMobile ? { h: "65%" } : { h: "50%" })}
              w="80%"
              display="flex"
              flexDirection="column"
              justifyContent={isMobile? "end":"start" }
              gap="12px"
            >
              <Flex color="primary.200">
                <Image src="/images/logo-green-black.svg" alt="Logo" />
              </Flex>
              <Text color="primary.200" fontSize="18px" fontWeight="600">
                {__("s_not_logged_in")}
              </Text>
              <Text color="gray.400" fontSize="14px" fontWeight="400" w="80%">
                {__("s_need_have_account")}
              </Text>
              <Box w={isMobile? "100%":"80%"}>
              <Button onClick={() =>  router.push(getLoginUrlWithRedirect(router.asPath))}>
                {__("login")}
              </Button>
              </Box>
            </Box>
          </ModalBody>
          <Flex position={"relative"}>
            <Image
              position={"absolute"}
              zIndex={10}
              {...(isMobile ? { maxW: "100px" } : {})}
              {...(isMobile
                ? { top: "calc(100% - 387px)", left: "calc(100% - 30%)" }
                : { top: "calc(100% - 387px)", left: "calc(100% - 50%)" })}
              src="/common/login-astronaut.svg"
              alt="waves"
            />
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
