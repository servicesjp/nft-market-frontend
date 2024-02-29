import { Box, Card, HStack, Image, Stack, Tag, Text, VStack } from "@chakra-ui/react";
import StarsRating from "@/components/stars-rating";
import { formatPrice } from "@/modules/utils";
import "swiper/css";
import "swiper/css/pagination";
import { __ } from "@/helpers/common";
import { useRouter } from "next/router";
import { NftType, NftTypeByName } from "@/types/NftType";
import { Product } from "@/types/nft/product";
import { useERC20 } from "@/hooks/useERC20"
import { useEffect, useState } from "react"

interface ExperienceCardProps {
  data: Product;
}

export function ExperienceCard({ data: experience }: any) {
  const { getTokenDetails } = useERC20();
  const [price, setPrice] = useState<string>();
  const [rating, setRating] = useState<any>(
    experience.experience?.averageRating ?? 0.0
  );
  const router = useRouter();
  const assetWithIpfs = experience.mediaAssets.find(
    (item: any) => item.ipfs !== null
  );

  useEffect(() => {
    (() => {
      try {
        const rating = experience?.experience?.averageRating ?? 0.0;
        const minEvent = experience.experience?.minEvent;
        const chainId = minEvent?.chainId;
        const currency = minEvent?.currencyAddress;
        const pricePerPerson = minEvent?.pricePerPerson;
        if (pricePerPerson && currency) {
          const { decimals, symbol } = getTokenDetails(chainId, currency);
          const price =
            formatPrice(pricePerPerson, currency, decimals) + " " + symbol;
          setPrice(price);
        }
        setRating(rating)
      } catch (error) {
        console.log(error);
      }
    })();
    
  }, [experience, getTokenDetails]);

  return (
    <Card
      _hover={{
        transform: "translateY(-4px)",
      }}
      transition="all 0.3s ease 0s"
      shadow="none"
      border="1px solid #E6E6E6"
      borderRadius={"8px"}
      pb={"24px"}
      w={"100%"}
      height={"100%"}
      cursor={"pointer"}
      onClick={() =>
        router.push(
          `/nft/${NftTypeByName[NftType.EXPERIENCE]}/${experience.id}`
        )
      }
    >
      <Stack height={"100%"} gap={"16px"}>
        <Box position="relative" width={"100%"}>
          <Image
            borderTopRadius={"8px"}
            aspectRatio="1"
            maxH={"auto"}
            maxW={"100%"}
            minW={"100%"}
            bg="gray.50"
            fit={"cover"}
            src={assetWithIpfs ? assetWithIpfs.path : "/nft/cardimg.jpg"}
            alt={experience.name}
          />
          {experience.category && (
            <Tag
              zIndex={"1"}
              color="white"
              bg="#00000080"
              h="40px"
              borderRadius="12px"
              border="1px solid rgba(255, 255, 255, 0.40)"
              position="absolute"
              top="16px"
              fontSize={"16px"}
              fontWeight={"400"}
              left="16px"
            >
              {experience.category.name}
            </Tag>
          )}
        </Box>
        <VStack
          align={"flex-start"}
          spacing={"8px"}
          h={"100%"}
          px={"16px"}
          justify={"space-between"}
        >
          <Stack gap={"8px"}>
            <HStack>
              <StarsRating
                variant="card"
                boxSize={"14px"}
                initialRating={rating}
              />
              <Text>
                <Text as={"span"} fontWeight={"500"}>
                  {rating}
                </Text>{" "}
              </Text>
            </HStack>
            <Text
              fontWeight={"500"}
              fontSize={"18px"}
              lineHeight={"28px"}
              noOfLines={1}
            >
              {experience.name}
            </Text>
          </Stack>
          <Text color="primary.100" fontWeight="400">
            <Text as={"span"} fontWeight="500">
              {price || __("coming_soon")}
            </Text>{" "}
            {price != undefined ?? "Per Person"}
          </Text>
        </VStack>
      </Stack>
    </Card>
  );
}
