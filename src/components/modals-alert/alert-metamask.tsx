import { __ } from "@/helpers/common";
import { Image, Text, AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogCloseButton, AlertDialogContent, AlertDialogBody  } from "@chakra-ui/react"
import React, { useRef } from "react"
import Responsive from "@/hooks/useResponsive";
export function AlertMetamask({ isOpen, onClose }: any) {
  const cancelRef = useRef<any>()
  const {isMobile} = Responsive();
  return (
    <>
      <AlertDialog
        motionPreset='scale'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay backdropFilter="blur(8px)"/>

        <AlertDialogContent p={"37px"} borderRadius="4px"
        backgroundImage={"url(/warning/back-error-alert.png)"}
        backgroundRepeat={"no-repeat"}
        textAlign={"center"}
        {...(isMobile ?{ mx:"24px"}:{})}>
          <AlertDialogHeader display={"flex"} justifyContent={"center"}>
            <Image src="/warning/error-alert.svg" alt="ERROR ALERT"/>
          </AlertDialogHeader>
          <AlertDialogCloseButton  />
          <AlertDialogBody>
          <Text mb={"8px"} fontSize={"24px"} className="Circular Medium" color={"primary.200"} fontWeight={"600"}>{__('s_not_logged_metamask')}</Text>
            <Text color={"gray.400"} fontSize={"14px"} fontWeight={"400"}>{__('s_login_metamask')}</Text>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}