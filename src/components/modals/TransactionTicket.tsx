import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Flex,
  Image,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import Responsive from "@/hooks/useResponsive";
import React from "react";
import { truncarText } from "@/utils";
import { WEB_SCAN_HASH } from "@/constants/env"
import { TypeTxTicket } from "@/types/TypeTxTicket"
export function TransactionTicket({
  isModalTxOpen,
  onModalTxTicketClose,
  openModalTicket,
  joinTickets,
  chainIdTicket,
}: any) {
  const { chain, switchNetwork, chains } =
    useContext<any>(WalletConnectContext);
  const { isMobile } = Responsive();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalTxOpen]);
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isModalTxOpen}
        onClose={()=>{onModalTxTicketClose()
            openModalTicket()}}
        isCentered
      >
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent position={"fixed"}>
          <ModalHeader
            fontSize={"32px"}
            color={"primary.200"}
            fontWeight={600}
            textAlign={"center"}
          >
            Transactions
          </ModalHeader>
          <ModalCloseButton m={"20px"} />
          <ModalBody maxH={"400px"} overflowY={"auto"}>
              <Flex flexDirection={"column"} gap={"16px"}>
                {joinTickets?.map((ticket: any, index: number) => (
                  <Flex
                    gap={"16px"}
                    p={"8px"}
                    key={index}
                    borderRadius={"4px"}
                    border={"1.5px solid #DDE3EE"}
                    alignItems={"center"} 
                  >
                    <Box minW={"32px"}>
                    <Tooltip label={ticket?.type == TypeTxTicket.buy ? "Buy Ticket":"Cancel Ticket"}>
                    <Image
                        src={ticket?.type == TypeTxTicket.buy ?"/images/icons/tx-success-information.svg": "/images/icons/tx-warning-information.svg"}
                        alt="tx information"
                      />
                    </Tooltip>
                      
                    </Box>
                    <Box>
                      <Link isExternal href={`${WEB_SCAN_HASH[chainIdTicket]}${ticket?.ticket?.transaction?.transactionHash}`} ><Text  color={ticket?.type == TypeTxTicket.buy ? "" :"red.100"}>
                      {
                      truncarText(ticket?.ticket?.transaction?.transactionHash,isMobile ? 14: 19)
                      }</Text></Link>
                    </Box>
                  </Flex>
                ))}
              </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
