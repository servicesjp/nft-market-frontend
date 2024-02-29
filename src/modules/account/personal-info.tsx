import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "@/modules/provider/user-info-provider";
import Spinner from "@/components/spinner";
import { __ } from "@/helpers/common";
import { useRouter } from "next/router";
import { MerchantApprovalStatus } from "@/types/MerchantApprovalRequest";
import { isCorrectNetwork, isValidString } from "../utils";
import { showInfoToast } from "@/components/toast";
import { WalletConnectContext } from "../provider/wallet-connect-provider";
import {
  // KYCLevel,
  // KYCReviewStatus,
  kycStatusAtom,
} from "@/services/kyc-service";
import VerificationKYCModal from "./verification-kyc-modal";
import { useAtom } from "jotai";
import EditIcon from "@/assets/icons/edit.svg";
import moment from "moment";
import PhoneIcon from "@/assets/icons/phone-icon.svg";
import MarkerIcon from "@/assets/icons/marker-icon.svg";
import { EmailIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function PersonalInfo() {
  const [kyc] = useAtom(kycStatusAtom);
  const { nftUser } = useContext(UserContext);
  const router = useRouter();
  const { chain } = useContext(WalletConnectContext);
  const kycModalDisclosure = useDisclosure();
  const formattedDate = moment(nftUser.createdAt).format("MMMM YYYY");
  const formatedAddress = `${nftUser.addressOne}, ${nftUser.city}, ${nftUser.state}, ${nftUser.country}`;
  const getFormatedNumber = () => {
    const parsedNumber = parsePhoneNumberFromString(`+${nftUser.phoneNumber}`);
    if (parsedNumber) {
      return parsedNumber.formatInternational();
    }
    return nftUser.phoneNumber;
  };
  const formatedPhoneNumber = getFormatedNumber();

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
    }
    router.push("/create-nft");
  }

  if (!nftUser) {
    return <Spinner />;
  } else {
    return (
      <>
        <VerificationKYCModal
          onClose={kycModalDisclosure.onClose}
          isOpen={kycModalDisclosure.isOpen}
        />
        <Card borderRadius={"4px"}>
          <CardBody p="40px" pb={"64px"}>
            <VStack w="100%" gap={{base: "24px", md: "16px"}} align={"flex-start"}>
              <Stack direction={{base: "column", md: "row"}} gap={"16px"} w="100%" justify={"space-between"}>
                <Avatar size="xl" src={nftUser.avatarUrl} bg="primary.100" alignSelf={"center"}/>
                <HStack gap={"24px"}>
                  {nftUser.merchantApprovalRequest?.approvalStatus ===
                  "Approved" ? (
                    <>
                      <Button onClick={() => handleCreateNFT()}>
                        {__("create_nft_unstyled")}
                      </Button>
                      <Box
                        cursor={"pointer"}
                        border="2px solid #E6E6E6"
                        p="12px"
                        onClick={() => router.push(`/account/edit`)}
                        borderRadius={"4px"}
                        transition={"all 0.3s ease"}
                        _hover={{
                          borderColor: "primary.100",
                        }}
                      >
                        <EditIcon />
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
                        {__(
                          `${nftUser?.merchantApprovalRequest?.approvalStatus?.toLowerCase()}`
                        )}
                      </p>
                    </Box>
                  ) : (
                    <Box w="100%" mt={"8px"}>
                      <Button
                        onClick={() => {
                          router.push("/onboarding")
                          // kyc?.status === KYCReviewStatus.Approved &&
                          // kyc?.level === KYCLevel.Lvl2
                          //   ? router.push("/onboarding")
                          //   : kycModalDisclosure.onOpen();
                        }}
                      >
                        {__("merchant_request")}
                      </Button>
                    </Box>
                  )}
                </HStack>
              </Stack>
              <Stack direction={{base: "column", md: "row"}} gap={"16px"} >
                <Text fontSize={"24px"} fontWeight={500} lineHeight={"28px"}>
                  {nftUser.username}
                </Text>
                <UnorderedList color={"#999999"}>
                  <ListItem fontSize={"14px"} lineHeight={"16px"}>
                    Joined {formattedDate}
                  </ListItem>
                </UnorderedList>
              </Stack>
              <VStack gap={"12px"} w={"100%"} align={"flex-start"}>
                <Text fontWeight={"500"}>{__("about")}</Text>
                <Text>{nftUser.bio}</Text>
              </VStack>
              <Stack direction={{base: "column", md: "row"}} color={"#999999"} gap={"24px"}>
                <HStack>
                  <MarkerIcon />
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      formatedAddress
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Text
                      color="#999999"
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      {formatedAddress}
                    </Text>
                  </Link>
                </HStack>
                <HStack>
                  <PhoneIcon />
                  <Link href={`tel:${formatedPhoneNumber}`}>
                    <Text
                      color="#999999"
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      {formatedPhoneNumber}
                    </Text>
                  </Link>
                </HStack>
                <HStack>
                  <EmailIcon color="#999999" boxSize={"20px"} />
                  <Link href={`mailto:${nftUser.email}`}>
                    <Text
                      color="#999999"
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      {nftUser.email}
                    </Text>
                  </Link>
                </HStack>
              </Stack>
            </VStack>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default PersonalInfo;
