import TextHighlight from "@/components/text-highlight";
import { __ } from "@/helpers/common";
import useResponsive from "@/hooks/useResponsive";
import { Product } from "@/types/nft/product";
import {
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  VStack,
  DrawerBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Show,
  ModalCloseButton,
  ModalBody,
  Drawer,
  Text,
  Modal,
  useTheme,
} from "@chakra-ui/react";
import CreateReviewForm from "../create-review-form";

interface WriteReviewDrawerProps {
  disclosure: any;
  product: Product;
}

export function WriteRewiewDrawer({
  disclosure,
  product,
}: WriteReviewDrawerProps) {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  if (isMobile)
    return (
      <Drawer
        placement={"bottom"}
        onClose={disclosure.onClose}
        size={"md"}
        isOpen={disclosure.isOpen}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius={"24px"}>
          <DrawerHeader borderBottomWidth="1px">
            <VStack gap={"8px"} align={"flex-start"}>
              <Text
                color={"primary.200"}
                fontSize={"20px"}
                fontWeight={"500"}
                lineHeight={"28px"}
              >
                {__("rate_experience")}
              </Text>
              <Text
                color={"gray.500"}
                fontSize={"14px"}
                fontWeight={"400"}
                lineHeight={"24px"}
              >
                {__("rate_experience_desc")}
              </Text>
            </VStack>
          </DrawerHeader>
          <DrawerBody p={"24px"}>
            <CreateReviewForm product={product} onClose={disclosure.onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  else
    return (
      <Modal
        size={"lg"}
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            mt={"88px"}
            p={"px 24px"}
            borderTop={"1px solid #E6E6E6"}
          >
            <VStack gap={"8px"}>
              <Show above="md">
                <TextHighlight
                  highlight={__("experience")}
                  highlightProps={{
                    fontWeight: "500",
                    color: "transparent",
                    backgroundClip: "text",
                    bgGradient: theme.colors.gradient,
                  }}
                  textProps={{
                    color: "primary.200",
                    fontSize: "32px ",
                    fontWeight: "500",
                  }}
                >
                  {__("rate_experience")}
                </TextHighlight>
              </Show>
              <Show below="md">
                <Text fontSize="20px" fontWeight="500">
                  {__("rate_experience")}
                </Text>
              </Show>
              <Text fontSize={"14px"} fontWeight={"400"} color={"primary.200"}>
                {__("rate_experience_desc")}
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton
            top={"24px"}
            right={"24px"}
            borderRadius={"50%"}
            boxSize={"40px"}
            bg="#F2F6FC"
          />
          <ModalBody>
            <CreateReviewForm product={product} onClose={disclosure.onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
}
