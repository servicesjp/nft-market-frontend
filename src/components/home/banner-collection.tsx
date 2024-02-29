// import { NewButton } from "@/components/new-button";
import FacebookIcon from "@/assets/icons/facebook.svg";
import InstagramIcon from "@/assets/icons/Instagram.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import YoutubeIcon from "@/assets/icons/youtube.svg";
import CircleStatus from "@/assets/svg/circle-status.svg"
import useResponsive from "@/hooks/useResponsive";
import { useLogout } from "@/modules/auth/use-logout";

import { Box,  Flex, HStack, Image, Link, Text, useTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { __ } from "@/helpers/common";
export default function BannerCollection() {
  const { isMobile, isTablet } = useResponsive();
  const theme = useTheme();
  const gradientColor = theme.colors.gradient;
  const router = useRouter();
  const logout = useLogout();
  return (
    <Box>
          <Text
            fontWeight="medium"
            fontSize={{base: "24px", sm: "40px"}}
          >
            Top #1 {" "}
            <Text as="span"bgGradient={gradientColor} bgClip="text">
            Collections
            </Text>
          </Text>

          <Flex mt={4} bg={"white"} borderRadius={4} flexDirection={isMobile ? "column": "row"}>
            <Box display={"flex"} flexDirection={"column"} gap={"8px"} w={isMobile ? "100%" : "50%"} padding={"24px"}>
              
              <Flex 
                justifyContent={"space-between"} 
                alignItems="center" 
                flexDirection={isMobile ? "column": "row"}
                gap={5}
              >

                <HStack justifyContent={isMobile ? "center": "start"} w={isMobile ? "100%" : "50%"}>
                  <Image src="/images/profile_user_img.png" alt="Profile Image" boxSize="50px" rounded="full" mr={2} />
                  <Text>Max Castro</Text>
                </HStack>
                
                <Box w={isMobile ? "100%" : "50%"}>
                  <Flex gap="15px" justifyContent={isMobile ? "center": "end"}>
                    <Box bg="#F4F6FF" borderRadius="50%" p={1}>
                      <Link href="https://www.facebook.com/TheMeteorCo">
                        <FacebookIcon color="#626B93" />
                      </Link>
                    </Box>
                    <Box bg="#F4F6FF" borderRadius="50%" p={1}>
                      <Link href="https://instagram.com/themeteorcompany">
                        <InstagramIcon color="#626B93" />
                      </Link>
                    </Box>
                    <Box bg="#F4F6FF" borderRadius="50%" p={1}>
                      <Link href="https://twitter.com/themeteorco">
                        <TwitterIcon color="#626B93" />
                      </Link>
                    </Box>
                    <Box bg="#F4F6FF" borderRadius="50%" p={1}>
                      <Link href="https://youtube.com/@themeteorcompany">
                        <YoutubeIcon color="#626B93" />
                      </Link>
                    </Box>
                  </Flex>
                </Box>
              </Flex>

              <Flex justifyContent={"center"} alignItems="center" mt={2}>
                <HStack bg="green.10" borderRadius="16px" p={1} px={2}>
                  <CircleStatus color="#626B93" />
                  <Text
                    color={"green.200"}
                    fontWeight={"500"}
                  >
                    Available
                  </Text>
                </HStack>
              </Flex>


              <Text
                
                color={"dark"}
                fontSize={"24px"}
                textAlign={"center"}
              >
                Cosmic Resident
              </Text>
              
              <Text
                
                color={"gray"}
                
                fontWeight={400}
                
                textAlign={"center"}
              >
                The best collection in the world
              </Text>
              
              <Text
                
                color={"dark"}
                
                fontWeight={500}
                
                textAlign={"center"}
              >
                Price Proposition
              </Text>
              
              <Text
                
                fontWeight={500}
                fontSize={"24px"}
                textAlign={"center"}
              >
                2.95 ETH
              </Text>

              <Text
                color={"primary.100"}
                fontWeight={500}
                fontSize={"24px"}
                textAlign={"center"}
              >
                Coming Soon
              </Text>

            </Box>

            <Box w={isMobile ? "100%" : "50%"} bg="gray.200" borderRadius="4px">
              <Image src="/images/home/top_collection_img.jpg" alt="Top Collection" boxSize="100%" rounded="4px" />
            </Box>
          </Flex>
        </Box>
  );
}