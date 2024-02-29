import React from "react";
import { ModalControlProps } from "@/components/common/components/modal";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { __ } from "@/helpers/common";
import { KYCReviewStatus, kycStatusAtom } from "@/services/kyc-service";
import { domainsConfig } from "@/config";
import { getCurrentLocale } from "@/modules/locale/locale";

export default function VerificationKYCModal(props: ModalControlProps) {
  const [kyc] = useAtom(kycStatusAtom);
  const padding = useBreakpointValue(
    { base: "0", md: "2rem 3rem" },
    { fallback: "md" }
  );

  const KYCStatusText = (() => {
    switch (kyc?.status) {
      case KYCReviewStatus.Unknow:
        return __("kyc_verification_first");
      case KYCReviewStatus.Pending:
        return __("kyc_verification_pending");
      case KYCReviewStatus.Rejected:
        return __("	kyc_verification_rejected");
    }
  })();

  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered size={"sm"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{__("kyc_ver")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={"14px"}>
          <Text fontSize={"16px"}>{KYCStatusText}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              props.onClose();
              window.open(
                domainsConfig.urlMeteor + `/${getCurrentLocale()}/profile`,
                "_blank"
              );
            }}
          >
            {__("verify")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
