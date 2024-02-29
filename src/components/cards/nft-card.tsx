import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import HeartIcon from "../../assets/nft/HeartIcon";

import { useState } from "react";
import { NftType, NftTypeByName } from "@/types/NftType";
import { __ } from "@/helpers/common";
import { formatPrice } from "@/modules/utils";
import { ShowPriceDigitalArt } from "../nft/show-price-digital-art";

function NFTCard({ data = {}, isVerified = false, isLikeable = false }: any) {
  // const navigate = useNavigate()
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isTablet] = useMediaQuery("(max-width: 1024px)");
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => {
    if (!isTablet) setIsHovered(true);
  };
  const onMouseLeave = () => {
    if (!isTablet) setIsHovered(false);
  };

  function priceByNftType(nftType: NftType) {
    switch (nftType) {
      case NftType.DIGITAL_ART:
        return (
          <>
            <Text>{__("price")}</Text>
            <Text color="primary.100" fontWeight="medium">
              <ShowPriceDigitalArt digitalArt={data} />
            </Text>
          </>
        );
      case NftType.EXPERIENCE:
        return data.price === null ? (
          <>
            <Text fontWeight="500" color="primary.100">{__("coming_soon_nft")}</Text>
          </>
        ) :(
          <>
            <Text>{__("from")}</Text>
            <Text color="primary.100" fontWeight="medium">
              {formatPrice(data?.price, data?.currencyAddress, data?.currencyDecimals)} {data?.symbolCurrency}
            </Text>
            <Text>{__("per_person")}</Text>
          </>
        )
    }
  }
  const getNftType = (typeEnum: any) => {
    switch(typeEnum) {
      case 1: return __("digital_art")
      case 2: return __("experience")
      default: return ""
    }
  }

  const goNftByType = (typeNft: NftType)=>{

    const nameNft = NftTypeByName[typeNft];

    if (nameNft) {
      router.push(`/nft/${nameNft}/${data.id}`);
    } else {
      router.push("/marketplace/experience");
    }

  }

  const handleClickCard = (event: React.MouseEvent<HTMLDivElement>) => {
    const isCreatorNameClicked =
      (event.target as HTMLDivElement).id === 'creatorName';

    if (isCreatorNameClicked) {
      router.push(`/profile/${data?.owner?.id}`);
    } else {
      goNftByType(data?.nftType);
    }
  };

  // main return 
  return (
    <Card
      h="350px"
      shadow={"md"}
      key={data.id}
      overflow={"hidden"}
      cursor={"pointer"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      _hover={{
        transform: "translateY(-4px)",
      }}
      transition="all 0.3s ease 0s"
      onClick={handleClickCard}
    >
      <CardBody
        padding="8px"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        {isLikeable ? (
          <Box
            transition="all 0.2s ease 0s"
            className={!isHovering ? "opacity-0" : ""}
            position="absolute"
            top="4"
            right="4"
          >
            <HeartIcon color="black" fill="white" />
          </Box>
        ) : (
          <></>
        )}

        <Box position="relative" width={"100%"}>
          <Image
            aspectRatio="1"
            h={"250px"}
            maxW={"100%"}
            minW={"100%"}
            bg="gray.50"
            fit={"cover"}
            src={
              data?.mediaAssets && data?.mediaAssets[0]
                ? data?.mediaAssets[0]?.path
                : "/nft/cardimg.jpg"
            }
            alt={data?.name ? data?.name : "HAPE PRIME"}
            borderRadius="md"
          />
          <Tag color="white" bg="#00CFB4" h="24px" borderRadius="md" border="none" position="absolute" bottom="6px" left="6px">{getNftType(data?.nftType)}</Tag>
        </Box>
        <Stack
          position="relative"
          mt={"10px"}
          spacing="0"
          transition="all 0.2s ease 0s"
          padding={"8px 0 0"}
          backgroundColor="white"
          minH="60px"
          justifyContent={"flex-start"}
          fontSize="14px"
          maxH={"fit-content"}
          h="100%"
        >
          <Heading
            fontSize="14px"
            display="flex"
            noOfLines={2}
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            gap="6px"
          >
            {data?.name ? data?.name : "HAPE PRIME"}
            {isVerified ? (
              <Image
                objectFit="contain"
                src="/nft/nft-verified-icon.png"
                alt="verified nft icon"
              />
            ) : (
              ""
            )}
          </Heading>

          {/* <Text 
            id="creatorName"
            color="#00CFB4"
            _hover={
              {
                fontWeight: '700',
                textDecoration: 'underline',
                transition: 'all 0.5s ease',
              }
            }
          >
              {`@${data?.owner?.username}`}
          </Text> */}
          <Flex gap="6px" mt="2px">
            {priceByNftType(data?.nftType)}
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default NFTCard;
