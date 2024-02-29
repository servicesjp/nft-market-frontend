import { useERC20 } from "@/hooks/useERC20";
import { formatPrice } from "@/modules/utils";
import { NftType, NftTypeByName } from "@/types/NftType";
import { Box, Card, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function DigitalArtCard({ data: digitalArt }: any) {
  const router = useRouter();
  const { getTokenDetails } = useERC20();
  const [currentPrice, setCurrentPrice] = useState("0");

  useEffect(() => {
    const getLastPrice = () => {
      const chainId = digitalArt?.chainId;
      const isVoucher = digitalArt?.nftVoucher;
      if (isVoucher) {
        const price = isVoucher?.minPrice;
        const currency = isVoucher?.currencyAddress;
        if (price && currency) {
          const { decimals, symbol } = getTokenDetails(chainId, currency);
          const currentPrice = formatPrice(price, currency, decimals);
          setCurrentPrice(`${currentPrice} ${symbol}`);
        }
      } else {
        const lastSale = digitalArt?.lastSale;
        const currency = lastSale?.currencyAddress;
        const price = lastSale?.price;
        if (price && currency) {
          const { decimals, symbol } = getTokenDetails(chainId, currency);
          const currentPrice = formatPrice(price, currency, decimals);
          setCurrentPrice(`${currentPrice} ${symbol}`);
        }
      }
    };
    getLastPrice();
  }, [digitalArt, getTokenDetails]);

  return (
    <Card
      border={"1px solid var(--text-light, #E6E6E6)"}
      _hover={{
        transform: "translateY(-4px)",
        cursor: "pointer",
      }}
      transition="all 0.3s ease 0s"
      borderRadius="4px"
      onClick={() =>
        router.push(
          `/nft/${NftTypeByName[NftType.DIGITAL_ART]}/${digitalArt?.id}`
        )
      }
    >
      <Stack gap={"0px"}>
        <Box position="relative" width={"100%"} display={"flex"}>
          <Image
            borderTopRadius={"4px"}
            aspectRatio="1"
            maxH={"auto"}
            maxW={"100%"}
            minW={"100%"}
            minHeight={"156px"}
            bg="gray.50"
            fit={"cover"}
            src={
              digitalArt?.mediaAssets && digitalArt?.mediaAssets[0]
                ? digitalArt?.mediaAssets[0]?.path
                : "/nft/cardimg.jpg"
            }
            alt={digitalArt?.name}
          />
        </Box>
        <VStack align={"flex-start"} spacing={"4px"} padding={"12px"}>
          <Text fontWeight={"500"} fontSize={"14px"} noOfLines={1}>
            {digitalArt?.name}
          </Text>
          <Text color="primary.100" fontWeight="500" fontSize={"14px"}>
            {currentPrice}
          </Text>
        </VStack>
      </Stack>
    </Card>
  );
}
