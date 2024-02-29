import Spinner from "@/components/spinner";
import { VStack, Grid, Image, Box, Flex } from "@chakra-ui/react";
import useApiIPFS from "@/hooks/useIpfs";
import Responsive from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
interface Assets {
  mediaAssets: any[];
}

interface IPFS {
  name: string;
  description: string;
  image: string;
}

export default function ImagesExperience({ mediaAssets }: Assets) {
  const [ipfsStruc, setIpfsStruct] = useState<IPFS>({
    name: "",
    description: "",
    image: "",
  });
  const { readLinkIPFS } = useApiIPFS();
  const { isMobile, isTablet } = Responsive();
  const secondaryMedia = mediaAssets?.filter(
    (media: any) => media.contentType !== 0
  );

  useEffect(() => {
    (async () => {
      const primaryMedia = mediaAssets?.find(
        (media: any) => media.contentType === 0
      );
      if (primaryMedia?.ipfs) {
        const data = await readLinkIPFS(primaryMedia?.ipfs);
        setIpfsStruct(data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <VStack w={"100%"}>
      {!ipfsStruc.image ? (
        <Spinner />
      ) : (
        <>
          {isTablet ? (
            <Box w={"100%"}>
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={isMobile? 1: 2}
              style={{ paddingBlockEnd: "10px" }}
            >
              {mediaAssets.map((media: any, index: any) => (
                <SwiperSlide key={`nft-${index}`}>
                  <Box h={"250px"}>
                    <Image
                      borderRadius="4px"
                      src={media.path}
                      objectFit="fill"
                      objectPosition="center"
                      alt={ipfsStruc.name}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
            
          ): (<Flex flexDirection="row" w="100%" gap="5px">
          <Box w="50%">
          <Image
            w="100%"
            h="505px"
            borderRadius="4px"
            src={ipfsStruc.image}
            objectFit="cover"
            objectPosition="center"
            alt={ipfsStruc.name}
          />
          </Box>
           <Grid w="50%" templateColumns={`repeat(2, 1fr)`} templateRows={`repeat(2, 1fr)`} gap={"5px"}>
    {secondaryMedia.map((media, index) => (
      <Box key={index}>
        <Image
          w="100%"
          h="250px"
          borderRadius="4px"
          src={media.path}
          objectFit="cover"
          objectPosition="center"
          alt={`Image ${index + 1}`}
        />
      </Box>
    ))}
  </Grid>
          
        </Flex>
            )
          }

        </>
      )}
    </VStack>
  );
}
