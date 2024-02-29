import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Collapse,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import useResponsive from "@/hooks/useResponsive";
import moment from "moment";
import { __ } from "@/helpers/common";
interface PublicUserInfoCardProps {
  nftUser: any;
}

export function PublicUserInfoCard({ nftUser }: PublicUserInfoCardProps) {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const { isMobile } = useResponsive();

  return (
    <Card boxShadow={"lg"} p={isMobile ? "14px 2px" : "20px 20px"}>
      <CardBody>
        <Flex justifyContent="center">
          <VStack w={"100%"}>
            <Box
              // maxWidth={"124px"}
              borderRadius={"50%"}
              overflow={"hidden"}
              background="linear-gradient(to right, #3fb0a3, #164793)"
              padding="4px"
            >
              <Avatar size="xl" name="avatar" src={nftUser?.avatarUrl} />
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
            <Text mt={"30px"} textTransform={"uppercase"} fontSize={"16px"}>
              {`${__("host_at_meteor_since")} ${moment
                .utc(nftUser?.createdAt)
                .format("YYYY")}`}
            </Text>
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
}
