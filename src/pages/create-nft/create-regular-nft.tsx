import CreateNFTLayout from "@/components/create-nft/CreateNFTLayout";
import RegularNFTForm from "@/components/create-nft/regular-nft-form/regular-nft-form";
import LoginRequired from "@/components/required/login-required"
import MetamaskRequired from "@/components/required/metamask-required"
import { __ } from "@/helpers/common";
import { Box, Image, Text, useTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function CreateRegularNFT() {
  const router = useRouter();
  const theme = useTheme();
  const gradientColor = theme.colors.gradient;

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => { };

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
          {__("transformation_of_art_in_the_digital_age")}
        </Text>

        <Text
          w={"70%"}
          fontSize={"14px"}
          fontWeight={"400"}
          lineHeight={"140%"}
          textAlign={"center"}
        >
          {__("join_us_on_a_journey_to_discover")}
        </Text>
      </>
    );
  };

  const ImageDecorator = () => {
    return (
      <Image
        src={"/nft/regular-nft-img.png"}
        alt={"Regular NFT Image Decorator"}
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
            <RegularNFTForm></RegularNFTForm>
          </Box>
        </CreateNFTLayout>
      </MetamaskRequired>
    </LoginRequired>
  );
}
