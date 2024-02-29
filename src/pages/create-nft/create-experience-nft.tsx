import CreateNFTLayout from "@/components/create-nft/CreateNFTLayout";
import ExperienceNFTForm from "@/components/create-nft/experience-nft-form/experience-nft-form";
import LoginRequired from "@/components/required/login-required"
import MetamaskRequired from "@/components/required/metamask-required"
import { __ } from "@/helpers/common";
import { Box, Image, Text, useTheme } from "@chakra-ui/react";

export default function CreateRegularNFT() {
  const theme = useTheme();
  const gradientColor = theme.colors.gradient

  const TextDecorator = () => {
    return (
      <>
        <Text
          w={"70%"}
          fontSize={"40px"}
          fontWeight={"500"}
          lineHeight={"120%"}
          textAlign={"center"}
        >
          {__("creating_unforgettable_experiences")}
        </Text>
        <Text
          w={"70%"}
          fontSize={"14px"}
          fontWeight={"400"}
          lineHeight={"140%"}
          textAlign={"center"}
        >
          {__("inmerse_yourself_in_a_world_of_wonder")}
        </Text>
      </>
    );
  };

  const ImageDecorator = () => {
    return (
      <Image
        src={"/nft/experience-nft-img.png"}
        alt={"Experience NFT Image Decorator"}
      />
    );
  };

  return (
    <LoginRequired>
      <MetamaskRequired>


        <CreateNFTLayout
          imageDecorator={ImageDecorator()}
          titleDecorator={TextDecorator()}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            w={"100%"}
            h={"100%"}
          >
            <ExperienceNFTForm></ExperienceNFTForm>
          </Box>
        </CreateNFTLayout>
      </MetamaskRequired>
    </LoginRequired>
  );
}
