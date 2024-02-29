import {
  Avatar,
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import useResponsive from "@/hooks/useResponsive";
import moment from "moment";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider"
import { isCorrectNetwork, isValidString } from "@/modules/utils"
import { __ } from "@/helpers/common";
import { MerchantApprovalStatus } from "@/types/MerchantApprovalRequest";
import {
  KYCLevel,
  KYCReviewStatus,
  kycStatusAtom,
} from "@/services/kyc-service";
import { useAtom } from "jotai";
import VerificationKYCModal from "./verification-kyc-modal";
import { showInfoToast } from "../../components/toast";
interface MerchantInfoCardProps {
  nftUser: any;
}

export function MerchantInfoCard({ nftUser }: MerchantInfoCardProps) {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const { chain } = useContext(WalletConnectContext);
  const { isMobile, isTablet } = useResponsive();
  const router = useRouter();
  const [kyc] = useAtom(kycStatusAtom);
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  function handleCreateNFT() {
    const status = isCorrectNetwork(chain);
    if (!status) return;

    //　validate user has first name, last name and bio.
    if (
      !isValidString(nftUser?.firstName) ||
      !isValidString(nftUser?.lastName) ||
      !isValidString(nftUser?.bio)
    ) {
      showInfoToast(__("required_about_me_fields"));
      // showInfoToast(__('Please, fill all about me fields.'))
      router.push("/account/edit");
      return;
    }

    router.push("/create-nft");
    return;
  }

  return (
    <>
      <VerificationKYCModal onClose={handleCloseModal} isOpen={isModalOpen} />
      <Box p={isMobile ? "14px 2px" : "20px 20px"}>
        <Flex justifyContent="center">
          <VStack w={"100%"}>
            <Box
              // maxWidth={"124px"}
              borderRadius={"50%"}
              overflow={"hidden"}
              background="linear-gradient(to right, #3fb0a3, #164793)"
              padding="4px"
            >
              <Avatar size="xl" bg="primary.100" src={nftUser?.avatarUrl} />
            </Box>
            <Box>
              <Flex gap={2} alignItems="center" mt={"10px"}>
                <Text
                  fontSize="24px"
                  fontWeight="medium"
                  textTransform={"capitalize"}
                >
                  {`${nftUser?.username}`}
                </Text>
                <Image
                  align="right"
                  src="/nft/nft-verified-icon.png"
                  alt="verified icon"
                />
              </Flex>
              {nftUser?.city && nftUser?.country ? (
                <Center>
                  <Text mt={2}>
                    <Icon as={FaMapMarkerAlt} />{" "}
                    <Text
                      color="gray.400"
                      as="span"
                    >{`${nftUser?.city}, ${nftUser?.country}`}</Text>
                  </Text>
                </Center>
              ) : (
                <Box h={"32px"} />
              )}
            </Box>

            <Heading mt={10} as="h4" size="md" alignSelf={"start"}>
              {__("about_us")}
            </Heading>
            <Box
              boxShadow="inset 0px -3px 3px -3px rgba(0, 0, 0, 0.2)"
              py={2}
              w={"100%"}
              alignSelf={"start"}
            >
              <Collapse in={show} startingHeight={"21px"}>
                <Text fontSize="14px" textAlign="justify" minH={"21px"}>
                  {nftUser?.bio !== "undefined" && nftUser?.bio !== ""
                    ? nftUser?.bio
                    :
                    __('not_about_info_user')
                  }
                </Text>
              </Collapse>
            </Box>
            <Button
              onClick={handleToggle}
              mb="22px"
              mt="6px"
              w={"auto"}
              color={"primary.100"}
              variant="link"
              fontSize="14px"
            >
              {!show ? __("learn_more") : __("close")}
            </Button>
            {nftUser?.merchantApprovalRequest?.approvalStatus ===
            "Approved" ? (
              <>
                <Box w="100%" mt={"10px"}>
                  <Button
                    variant={"outline"}
                    onClick={() => router.push(`/account/edit`)}
                  >
                    {__("edit_account")}
                  </Button>
                </Box>
                <Box w="100%" mt={"8px"}>
                  <Button onClick={() => handleCreateNFT()}>
                    {__("create_nft_unstyled")}
                  </Button>
                </Box>
              </>
            ) : nftUser?.merchantApprovalRequest?.approvalStatus ===
                MerchantApprovalStatus.Waiting ||
              nftUser?.merchantApprovalRequest?.approvalStatus ===
                MerchantApprovalStatus.Rejected ? (
              <Box w="100%" mt={"10px"}>
                <p>
                  <span className="text-gray-500">
                    {__("status_merchant")}:
                  </span>{" "}
                  {__(`${nftUser?.merchantApprovalRequest?.approvalStatus?.toLowerCase()}`)}
                </p>
              </Box>
            ) : (
              <Box w="100%" mt={"8px"}>
                <Button
                  onClick={() => {
                    kyc?.status === KYCReviewStatus.Approved &&
                    kyc?.level === KYCLevel.Lvl2
                      ? router.push("/onboarding")
                      : setModalOpen(true);
                  }}
                >
                  {__("merchant_request")}
                </Button>
              </Box>
            )}
            <Text mt={"30px"} textTransform={"uppercase"} fontSize={"16px"}>
              {`${__("host_at_meteor_since")} ${moment
                .utc(nftUser?.createdAt)
                .format("YYYY")}`}
            </Text>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}
