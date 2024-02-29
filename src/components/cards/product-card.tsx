import { Box, Card, CardBody, Heading, Image, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import HeartIcon from "../../assets/nft/HeartIcon";

import { useState } from "react";
import { NftType, NftTypeByName } from "@/types/NftType"

function ProductViewCard({ data = {}, isVerified = false, isLikeable = false }: any) {
  // const navigate = useNavigate()
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isTablet] = useMediaQuery("(max-width: 1024px)");
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => {
    if(!isTablet) setIsHovered(true)
  };
  const onMouseLeave = () => {
    if(!isTablet) setIsHovered(false)
  };
  const goNftByType = (typeNft: number)=>{
    let nameNft = ""
    switch(typeNft){
      case NftType.DIGITAL_ART:
        nameNft = NftTypeByName[NftType.DIGITAL_ART]
      break
      case NftType.EXPERIENCE:
        nameNft = NftTypeByName[NftType.EXPERIENCE]
        break
      default:
        router.push("/marketplace/experience")
        break
    }
    router.push(`/nft/${nameNft}/${data.id}`)

  }
  return (
    <Card
      overflow={"hidden"}
      cursor={"pointer"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      _hover={{
        transform:"translateY(-4px)",
      }}
      transition="all 0.3s ease 0s"
      onClick={() => goNftByType(data?.nftType)}
    >
      <CardBody padding="8px">

        { isLikeable ? 
          <Box transition="all 0.2s ease 0s" className={!isHovering ? 'opacity-0' : ''} position="absolute" top="4" right="4">
            <HeartIcon color="black" fill="white" />
          </Box>
          : <></>
        }
        
        <Image
          w="100%"
          src={data?.mediaAssets ? data?.mediaAssets[0]?.path : '/nft/cardimg.jpg'}
          alt={ data?.name ? data?.name : 'HAPE PRIME Collection' }
          borderRadius='md'
        />
        <Stack
          position="relative"
          spacing='2'
          transition="all 0.2s ease 0s"
          padding={"8px 0 0"}
          backgroundColor="white"
          minH="60px"
        >
          <Heading fontSize='14px' display="flex" gap="6px" justifyContent={"space-between"}>
            {" "}
            { data?.name ? data?.name : 'HAPE PRIME Collection' }
            { isVerified ? <Image objectFit="contain" src="/nft/nft-verified-icon.png" alt="nft-verified-icon" /> : '' }
          </Heading>

          
          <Text fontSize='sm'>
            From <Text display="inline" color='primary.100' fontWeight="medium">{data.price}</Text> per person
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ProductViewCard;
