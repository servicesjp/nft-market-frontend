import {
  Button,
  Text,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import QRCode from "easyqrcodejs";
import Responsive from "@/hooks/useResponsive";
import React from "react"
import html2canvas from 'html2canvas';
import Link from "next/link"
import { WEB_SCAN_HASH } from "@/constants/env"
import moment from "moment"
import { NftType, NftTypeByName } from "@/types/NftType"
import { __ } from "@/helpers/common";
export function Ticket({ isModalTicketOpen, onModalTicketClose, openModalTxTicket ,ticket, joinTickets, chainIdTicket }: any) {

  const {
    chain,
    switchNetwork,
    chains,
  } = useContext<any>(WalletConnectContext);
  const { isMobile } = Responsive();
  const [textTicketFail,setTextTicketFail] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(false)
  const [ downLoad, setDownLoad] = useState<boolean>(false)
  const qrcodeDOM = useRef(null);
  
  let qrcode: any = null;
  async function generate (backgroundImageUrl: string, textQr: string) {
    if (qrcode) {
      qrcode.clear();
      setTextTicketFail("")
    }
    const sizeQr = 150
    const options = {
      text: textQr,
      width:sizeQr,
      height:sizeQr,
      crossOrigin: 'anonymous',
      colorDark: 'white',
      backgroundImage: backgroundImageUrl
    };
    if (qrcodeDOM.current ) {
      qrcode = await new QRCode(qrcodeDOM.current, options);
      if(qrcode == null){
        setTextTicketFail("Fails load Ticket, try again")
      }
      
    }
  };

  async function downloadQR (){
     const elemento: any = document.getElementById('download-ticket')
     if(elemento){
      try{
        setDownLoad(true)
      const canvas = await html2canvas(elemento);
      const imagenURL = canvas.toDataURL('image/png');
      const enlaceDescarga = document.createElement('a');
      enlaceDescarga.href = imagenURL;
      enlaceDescarga.download = ticket?.product?.name ? `${ticket?.product?.name}_Ticket.png` :'Event_Ticket.png';
      enlaceDescarga.click(); 
      } catch (error){
        console.log(error)
      } finally {
        setDownLoad(false)
      }
     }

     
  }

  function convertArrayToText(joinTickets: any[]){
    const oldDate = joinTickets?.reduce((oldDate:any, newDate:any) => {
      return new Date(newDate.createdAt).getTime() < new Date(oldDate.createdAt).getTime() ? newDate : oldDate;
    }, joinTickets[0])
    const hash = oldDate?.ticket?.transaction?.transactionHash
    return `${WEB_SCAN_HASH[chainIdTicket]}${hash}`
  }

  useEffect(() => {
    setLoading(true)
      const backgroundImageUrl = ticket?.productInstance?.product?.mediaAssets[0]?.ipfs || "/nft/cardimg.jpg";
    const preloadImage = new Image();
    preloadImage.src = backgroundImageUrl;
    preloadImage.onload = async () => {
      await generate(backgroundImageUrl, convertArrayToText(joinTickets));
      setLoading(false)
    };
    setLoading(false)
    

    return ()=>{
      qrcodeDOM.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [isModalTicketOpen, ticket?.productInstance?.product?.mediaAssets[0]]);
  function getLocationExperience(mapPoint: any){
    const location = JSON.parse(mapPoint)[0]
    return location? location?.addressName : ""
  }
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isModalTicketOpen}
        onClose={onModalTicketClose}
        isCentered
      >
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent  p={"20px"} backgroundColor={"primary.100"} height={"max-content"}  >
          <ModalHeader borderRadius={"10px 10px 0 0"} backgroundColor={"white"} fontSize={ isMobile ? "17px": "24px"} color={"primary.200"} fontWeight={600} lineHeight={"28px"} py={"10px"}>
            TICKET
          </ModalHeader>
          <ModalCloseButton  m={"20px"} />
          <ModalBody backgroundColor={"white"} borderRadius={"0 0 10px 10px"} color={"gray.400"} fontSize={isMobile? "14px" :"16px"} display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Box id="download-ticket" display={"flex"} flexDirection={"column"} gap={"10px"} p={"5px"}>
            <Box>
              <Text>Thank you for your Order!</Text>
              <Text>Nro Tickets:  {ticket?.noOfAdultTickets + ticket?.noOfChildTickets}</Text>
              <Text>Dear Johan Francis Lucas Muhb your purchase has been successfully confirmed, your experience is scheduled for  {moment.utc(ticket?.productInstance?.experienceInstance?.startTime).local().format(
                        "dd, D MMM HH:mm"
                      )} at {getLocationExperience(ticket?.productInstance?.product?.experience?.mapPoints)
                      }</Text>
            </Box>
            <Divider />
             <Link href={`/nft/${NftTypeByName[NftType.EXPERIENCE]}/${ticket?.productInstance?.product?.id}`}> Go Event</Link>
            <Divider />
            <Box minHeight={"150px"}>
            {
              loading ? <Box textAlign={"center"}>
              <Spinner />
            </Box> : textTicketFail != "" ? <Box> <Text>{textTicketFail}</Text></Box> : <>
            <Box display={"flex"} justifyContent={"center"}>
            <Box ref={qrcodeDOM}></Box>
            </Box>
            </>
            }
            </Box>
            <Box>
              <Text textAlign={"center"}>This QR code is for you to redeem your experience.</Text>
            </Box>
            </Box>
            <Flex gap={"14px"} flexDirection={isMobile? "column":"row"}>
            <Button onClick={()=>downloadQR()} loadingText={__("loading") + "..."} isLoading={downLoad}>Download QR</Button>
            <Button onClick={()=>{
              onModalTicketClose()
              openModalTxTicket()
              }}>See Tx</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </>
  );
}
