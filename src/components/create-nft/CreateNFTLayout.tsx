import useResponsive from "@/hooks/useResponsive";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LoginRequired from "@/components/required/login-required";
import MetamaskRequired from "@/components/required/metamask-required";
import MerchantApproveRequired from "../merchant-approved-required";
// import KycRequired from "@/components/required/kyc-required";
import AboutMeFieldsRequired from "../about-me-fields-required";

export default function CreateNFTLayout({
  children,
  titleDecorator,
  imageDecorator,
  section,
}: CreateNFTLayoutProps) {
  const router = useRouter();
  const { isMobile, isTablet } = useResponsive();
  return (
    <LoginRequired>
      <MetamaskRequired>
        {/* <KycRequired> */}
          <MerchantApproveRequired>
            <AboutMeFieldsRequired>
              <Box
                bg={"white.100"}
                // height={height}
                w={"100%"}
              >
                <Flex minH={"100vh"} w={"100%"} gap={"40px"}>
                  {/* Form */}
                  <Flex
                    w={isMobile || isTablet ? "100%" : "40%"}
                    h={"100%"}
                    mx={isMobile || isTablet ? "24px" : ""}
                    ml={isMobile || isTablet ? "" : "108px"}
                    py={"36px"}
                    flex={"45%"}
                    flexDir={"column"}
                  >
                    <Box
                      display={"flex"}
                      alignSelf={"start"}
                      justifyContent={"center"}
                    >
                      {/* FIX: this svg creates an error */}
                      <Image
                        zIndex={1}
                        src="/nft/logo-meteor.svg"
                        alt="Logo image"
                        cursor={"pointer"}
                        onClick={() => router.push("/")}
                      />
                    </Box>

                    {/* Children form */}
                    <Box
                      display={"flex"}
                      flexDir={"column"}
                      alignItems={"center"}
                      gap={"8px"}
                      my={"24px"}
                    >
                      {children}
                    </Box>
                  </Flex>

                  {/* Image Decorator */}
                  {!(isMobile || isTablet) && (
                    <>
                      <Flex w={"60%"} ps={"24px"} bg={"#FCFDFF"}>
                        <Flex
                          w={"100%"}
                          borderRadius={"4px"}
                          flexDir={"column"}
                          justifyContent={"center"}
                          gap={"60px"}
                          flex={"55%"}
                        >
                          {/* Decoracion superior */}
                          <Box
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"center"}
                          >
                            <Image
                              height={"100%"}
                              zIndex={1}
                              src={"/nft/triangles_horizontal.png"}
                              alt="Triangles horizontal"
                            />
                          </Box>

                          {/* Right Title */}
                          <Box
                            mt={"36px"}
                            display={"flex"}
                            flexDir={"column"}
                            alignItems={"center"}
                            gap={"16px"}
                            justifyContent={"center"}
                          >
                            {titleDecorator}
                          </Box>

                          <Box
                            mt={"20px"}
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"center"}
                          >
                            {imageDecorator}
                          </Box>
                        </Flex>
                      </Flex>

                      {/* <Image
                      position={'absolute'}
                      top={'80%'}
                      left={'87%'}
                      transform="rotate(90deg)"
                      zIndex={1}
                      src={"/nft/triangles_horizontal.png"}
                      alt="Triangles horizontal"
                    /> */}
                    </>
                  )}
                </Flex>
              </Box>
            </AboutMeFieldsRequired>
          </MerchantApproveRequired>
        {/* </KycRequired> */}
      </MetamaskRequired>
    </LoginRequired>
  );
}

interface CreateNFTLayoutProps {
  children?: React.ReactNode;
  section?: "login" | "signup" | "recoveraccount" | "resetpass";
  titleDecorator?: React.ReactNode | JSX.Element;
  imageDecorator?: React.ReactNode;
}
