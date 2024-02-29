import { __ } from "@/helpers/common";
import { NftType } from "@/types/NftType";
import { Stack, HStack, Show, VStack, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NFtTypeSelector({
    nftType,
    onSelect,
  }: {
    nftType: NftType;
    onSelect?: () => void;
  }) {
    const router = useRouter();
    const orderedKeys = [
      NftType.EXPERIENCE,
      NftType.DIGITAL_ART,
      NftType.PRODUCT,
    ];
    const options = {
      [NftType.EXPERIENCE]: {
        key: "experience",
        description: "fab_experience_desc",
        icon: "/market/experience.svg",
        selectedIcon: "/market/experience-selected.svg",
        selectedDesktopIcon: "/market/experience-selected-desktop.svg",
        searchKey: "search_experience",
        onClickRoute: "/marketplace/experience",
        disabled: false
      },
      [NftType.DIGITAL_ART]: {
        key: "digital_art",
        description: "fab_digital_art_desc",
        icon: "/market/digital-art.svg",
        selectedIcon: "/market/digital-art-selected.svg",
        selectedDesktopIcon: "/market/digital-art-selected-desktop.svg",
        onClickRoute: "/marketplace/digital-art",
        disabled: false
      },
      [NftType.PRODUCT]: {
        key: "product",
        description: "coming_soon",
        icon: "/market/product.svg",
        selectedIcon: "/market/product-selected.svg",
        selectedDesktopIcon: "/market/product-selected-desktop.svg",
        onClickRoute: "/marketplace/experience",
        disabled: true,
      },
    };
  
    return (
      <Stack gap={{base: "8", md: "24px"}} direction={{ base: "column", md: "row" }} w={"100%"} >
        {orderedKeys.map(enumKey => {
          const option = options[enumKey];
          const isSelected = nftType === enumKey;
          return (
            <HStack
              w={"100%"}
              py={{ base: "16px", md: "24px" }}
              px={{ md: "24px" }}
              key={option.key}
              background={{ md: isSelected ? "primary.100" : "white" }}
              border={{ md: "1.5px solid #E6E6E6" }}
              borderRadius={{ md: "16px" }}
              gap={"16px"}
              onClick={() => {
                onSelect && onSelect();
                !option.disabled && router.push(option.onClickRoute);
              }}
              cursor={option.disabled ? "default" : "pointer"}
              {...(option.disabled && { opacity: 0.2 })}
            >
              <Show below="md">
                <Image
                  boxSize={"40px"}
                  src={isSelected ? option.selectedIcon : option.icon}
                  alt={option.description}
                />
              </Show>
              <Show above="md">
                <Image
                  src={isSelected ? option.selectedDesktopIcon : option.icon}
                  alt={option.description}
                />
              </Show>
              <VStack
                align={"flex-start"}
                gap={"4px"}
                color={{ md: isSelected ? "white" : "#4D4D4D" }}
              >
                <Text
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={"500"}
                  lineHeight={"24px"}
                  letterSpacing={"0.8px"}
                >
                  {__(option.key)}
                </Text>
                <Text
                  fontSize={{ base: "12px", md: "14px" }}
                  lineHeight={"16px"}
                  fontWeight={"400"}
                  letterSpacing={"0.8px"}
                  noOfLines={1}
                >
                  {__(option.description)}
                </Text>
              </VStack>
            </HStack>
          );
        })}
      </Stack>
    );
  }