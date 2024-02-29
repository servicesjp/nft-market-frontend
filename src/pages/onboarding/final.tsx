import { __ } from "@/helpers/common";
import useResponsive from "@/hooks/useResponsive";
import {
  Box,
  Center,
  Image,
  Text,
  VStack,
  useTheme,
  Button,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

const FinalMerchantRequest = () => {
  const { isMobile, isTablet } = useResponsive();

  const router = useRouter();
  const theme = useTheme();
  const gradientColor = theme.colors.gradient;

  return (
    <VStack
      w={"100%"}
      minH={"100vh"}
      h={"100%"}
      position={"relative"}
      paddingX={isMobile ? "12px" : isTablet ? "24px" : "108px"}
    >
      <Image
        position={"absolute"}
        top={"5%"}
        left={"10%"}
        zIndex={1}
        src="/nft/logo-meteor.svg"
        alt="Logo image"
        cursor={"pointer"}
        onClick={() => router.push("/")}
      />
      <Center flex={1} h={"100%"}>
        <VStack
          w={isMobile ? "100%" : "50%"}
          alignSelf={"center"}
          gap={"24px"}
          h={"100%"}
        >
          <Text
            bgGradient={gradientColor}
            bgClip="text"
            fontSize={"40px"}
            fontWeight={500}
            lineHeight={"132%"}
            textAlign={"center"}
          >
            {/* Thank you! */}
            {`${__('thank_you')}`}
          </Text>
          <Image
            src={"/images/onboarding/final-merchant-request.svg"}
            alt="Final merchant request"
          />
          <Text
            fontSize={"16px"}
            fontWeight={"400"}
            lineHeight={"140%"}
            textAlign={"justify"}
          >
            {__('application_received_desc')}
          </Text>

          <Button w={"100%"} onClick={() => router.push("/account")}>
            <Text>
              {/* Back to Home */}
              {`${__('back')}`}
            </Text>
          </Button>
        </VStack>
      </Center>
    </VStack>
  );
};

// OnBoarding.Auth = PrivateRoute
export default FinalMerchantRequest;
