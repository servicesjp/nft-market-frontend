import LoginRequired from "@/components/required/login-required";
import MetamaskRequired from "@/components/required/metamask-required";
import FormBoarding from "@/components/onboarding/Form/form-boarding";
import DefaultOnBoardingLayout from "@/components/onboarding/default-boarding-layout";
import { __ } from "@/helpers/common";
import useResponsive from "@/hooks/useResponsive";
import { Box, Flex, Image, Text, VStack, useTheme } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import FinalMerchantRequest from "./final";
import { UserContext } from "@/modules/provider/user-info-provider";
import { useRouter } from "next/router";
import { showInfoToast } from "@/components/toast";
import Spinner from "@/components/spinner";
import { MerchantApprovalStatus } from "@/types/MerchantApprovalRequest";

const OnBoarding = () => {
  const { isMobile, isTablet } = useResponsive();
  const {nftUser } = useContext(UserContext);
  const router = useRouter()
  
  const [sendMerchantRequest, setSendMerchantRequest] = useState(false);
  const [loading, setLoading] = useState(false)
  const theme = useTheme();
  const gradientColor = theme.colors.gradient;

  useEffect(() => {

    setLoading(true)
    
    if (!nftUser || Object.keys(nftUser).length === 0) return;

    const decision = nftUser?.merchantApprovalRequest?.approvalStatus;
    
    if (decision) {
      if (decision === MerchantApprovalStatus.Waiting) {
        setSendMerchantRequest(true)
      } else {
        showInfoToast(__('admin_already_response'))
        router.push('/account')
        return;
      }      
    }

    setLoading(false)
  }, [nftUser])

  return (
    <LoginRequired>
      <MetamaskRequired>
        <DefaultOnBoardingLayout>
        {
          loading ? 
          <Spinner></Spinner>
          :
          (sendMerchantRequest
          ? 
          <FinalMerchantRequest></FinalMerchantRequest>
          :
          <Flex height={"100%"}>
            
            <Flex
              {...(isMobile
                ? { flexBasis: "100%", paddingTop: "44px", paddingX: "24px" }
                : isTablet
                ? { flexBasis: "100%", paddingTop: "10%", paddingX: "20%" }
                : {
                    // paddingTop: "44px",
                    paddingX: "24px",
                    flexBasis: "50%",
                  })}
              w={"100%"}
              >
              <FormBoarding setSendMerchantRequest={setSendMerchantRequest}/>
            </Flex>

            {!isMobile && !isTablet && (
              <Flex
                overflow={"hidden"}
                flexBasis={"50%"}
                flexDirection={"column"}
                justifyContent={"start"}
                position={"relative"}
                m={"24px"}
                borderRadius={"4px"}
                backgroundColor={"rgba(242, 246, 252, 0.26)"}
              >
                <VStack 
                  pt={"200px"}
                  paddingX={"193px"} 
                  gap={"12px"}
                >
                  <Text
                    color={"primary.250"}
                    fontSize={"40px"}
                    textAlign={"center"}
                    fontWeight={500}
                    lineHeight={"120%"}
                  >
                    {__('discover_largest_nft_marketplace')}
                  </Text>
                
                  <Text
                    fontSize={"14px"}
                    fontWeight={400}
                    lineHeight={"140%"}
                    textAlign={"center"}
                  >
                    {__("buy_sell_digital_items")}
                  </Text>
                </VStack>

                <Box
                  maxH={"518px"}
                  width={'100%'}
                  display={"flex"}
                  justifyContent={"center"}
                  
                >
                  <Image
                    height={"100%"}
                    zIndex={1}
                    src="/nft/onboardingNFT.svg"
                    alt="Logo Boarding"
                  />
                </Box>
                
              </Flex>
            )}

          </Flex>)
        }
        </DefaultOnBoardingLayout>
      </MetamaskRequired>
    </LoginRequired>
  );
};

// OnBoarding.Auth = PrivateRoute
export default OnBoarding;
