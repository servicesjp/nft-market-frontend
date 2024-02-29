import CreateNFTLayout from "@/components/create-nft/CreateNFTLayout";
import { __ } from "@/helpers/common";
import useResponsive from "@/hooks/useResponsive";
import {
  Box,
  Button, Image, Text,
  VStack,
  useRadio,
  useRadioGroup
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Index() {
  const router = useRouter();
  const { isMobile, isTablet } = useResponsive();
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);

  const nftTypes = [
    {
      name: __("experience"),
      description: __("experience_desc"),
    },
    // {
    //   name: "Products",
    //   description:
    //     "Users will be able to choose second-hand products of excellent quality.",
    // },
    {
      name: __("digital_art"),
      description: __("digital_art_desc"),
    },
  ];

  const { value, getRadioProps } = useRadioGroup({
    defaultValue: "",
  });

  const handleSubmit = () => {
    setLoading(true);
    switch (value) {
      case nftTypes[0].name:
        router.push(`${router.pathname}/create-experience-nft`);
        break;
      // case nftTypes[1].name:
      //   router.push(`${router.pathname}/create-product-nft`);
      //   break;
      case nftTypes[1].name:
        router.push(`${router.pathname}/create-regular-nft`);
        break;
      default:
        break;
    }
    setLoading(false);
  };

  const TextDecorator = () => {
    return (
      <>
        {" "}
        <Text
          w={"70%"}
          fontSize={"40px"}
          fontWeight={"500"}
          lineHeight={"120%"}
          textAlign={"center"}
        >
          {__("connecting_creativity_and_blockchain")}
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
        src={"/images/create-nft/create-nft-img.png"}
        alt={"Regular NFT Image Decorator"}
      />
    );
  };

  const RadioCard = (props: any) => {
    const { image, ...radioProps } = props;
    const { getInputProps, getRadioProps } = useRadio(radioProps);
  
    return (
      <Box as="label" w="100%">
        <input {...getInputProps({})} hidden />
        <Box
          {...getRadioProps()}
          cursor="pointer"
          _checked={{
            backgroundColor: "primary.10",
            color: "primary.100",
            border: "1px solid #0020E6",
          }}
          border={'1px solid #FFF'}
          w="100%"
          borderRadius={"4px"}
          boxShadow={"xs"}
          padding={4}
        >
          {props.children}
        </Box>
      </Box>
    );
  }

  return (
    <CreateNFTLayout
      imageDecorator={ImageDecorator()}
      titleDecorator={TextDecorator()}
    >
      {firstLoading ? (
        <></>
      ) : (
        <VStack align={!(isMobile || isTablet) ? "start" : "center"} w="100%">
          <VStack w="100%" maxW={"456px"}>
            <Text
              fontSize="44px"
              fontWeight="500"
              lineHeight="52px"
              alignSelf="start"
            >
              {__("create_nft")}
            </Text>
            <Text
              fontWeight="500"
              lineHeight="20px"
              mt="20px"
              mb="8px"
              alignSelf="start"
            >
              {__("what_type_of_nft_you_want_to_offer")}
            </Text>
            {nftTypes.map((type: { name: string; description: string }) => {
              return (
                <Box w="100%" mt="24px" key={type.name}>
                  <RadioCard {...getRadioProps({ value: type.name })}>
                    <Text fontWeight="400" color={"#231C35"} fontSize="16px">
                      {type.name}
                    </Text>
                    <Text
                      fontWeight="300"
                      lineHeight="20px"
                      fontSize="16px"
                      color={"#231C35"}
                      maxWidth={"380px"}
                    >
                      {type.description}
                    </Text>
                  </RadioCard>
                </Box>
              );
            })}
            {/* TODO: We should extract this form button into a components instead
          of copying it around */}
            <Button
              borderRadius={"4px"}
              width={"100%"}
              border={"1px solid #0020E6"}
              _hover={{
                backgroundColor: "primary.10",
                color: "primary.100",
              }}
              mt="40px"
              backgroundColor="primary.100"
              color={"white"}
              fontWeight={500}
              fontSize={"16px"}
              letterSpacing="0.5px"
              height={"48px"}
              isDisabled={value === "" ? true : false}
              loadingText={__("loading") + "..."}
              isLoading={loading}
              onClick={handleSubmit}
              type="submit"
            >
              {__("next")}
            </Button>
          </VStack>
        </VStack>
      )}
    </CreateNFTLayout>
  );
}
