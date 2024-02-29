
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import {
  Box,
  Flex,
  Text
} from "@chakra-ui/react";

import SliderInfinity from "@/components/slider-infinity";
import useResponsive from "@/hooks/useResponsive";
import { useContext, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { __ } from "@/helpers/common";

export default function Header() {
  const { isConnected }: any = useContext(WalletConnectContext);
  const { isMobile, isTablet } = useResponsive();
  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);
  const dataSlider = [
    {
      id: 1,
      imgUrl: "/images/home/header_home_img1.jpg",
      phrase: __("nfts_hero_section_header", false, null, "#0FA"),
      name: "José Buendia",
      age: "76",
      ubi: "ARTESANO, CUSCO",
      bgPosition: "50% 15%",
      bgPositionMobile: "50% 15%",
      bgSize: "auto 130%",
      alignText: "start",
      alignTextMobile: "start",
    },
    {
      id: 2,
      imgUrl: "/images/home/header_home_img2.jpg",
      phrase: __("nfts_hero_section_header", false, null, "#0FA"),
      name: "Max Castro",
      age: "76",
      ubi: "ARTESANO, CUSCO",
      bgPosition: "30% 0%",
      bgPositionMobile: "30% 0%",
      bgSize: "auto 130%",
      alignText: "end",
      alignTextMobile: "end",
    },
    {
      id: 3,
      imgUrl: "/images/home/header_home_img3.jpg",
      phrase: __("nfts_hero_section_header", false, null, "#0FA"),
      name: "Yesenia Mayta",
      age: "76",
      ubi: "ARTESANO, CUSCO",
      bgPosition: "60% 0%",
      bgPositionMobile: "60% 0%",
      bgSize: "auto 150%",
      alignText: "start",
      alignTextMobile: "end",
    },
  ];

  const [expandedImage, setExpandedImage] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setExpandedImage(index);
  };

  const handleMouseLeave = () => {
    setExpandedImage(null);
  };

  return (
    <>
      {
      isMobile ?
        (
          <Box position={'relative'}>
            <Box
              position={'absolute'}
              bottom={0}
              left={0}
              zIndex={20}
              w={'100%'}
              opacity={expandedImage === null ? 1 : 0}
            >
              <SliderInfinity />
            </Box>
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              onSlideChange={() => {}}
              onSwiper={(swiper) => {}}
            >
              {dataSlider.map((item: any) => (
                <SwiperSlide key={item.id}>
                  <Box
                    w="100%"
                    {...(isMobile
                      ? { minH: "100vh" }
                      : {
                          minH: "100vh",
                        })}
                    backgroundImage={`url(${item.imgUrl})`}
                    backgroundPosition={item.bgPositionMobile}
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    display={"flex"}
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    <Flex
                      h={"100%"}
                      w={'100%'}
                      flexDirection={"row"}
                      justifyContent={item.alignTextMobile}
                      px={'32px'}
                      {...(isMobile ? { gap: "30px" } : { gap: "32px" })}
                    >
                      {item.alignTextMobile === 'end' && <Box w={'30%'} ></Box>}
                      <Flex
                        h={'100%'}
                        width={"70%"}
                        flexDirection={"column"}
                        alignItems={item.alignTextMobile}
                      >
                        <Text
                          color={"white"}
                          className="Euclid Regular"
                          fontWeight={600}
                          mb={"16px"}
                          textAlign={item.alignTextMobile}
                          {...(isMobile
                            ? { fontSize: "20px", lineHeight: "120%" }
                            : { fontSize: "40px", lineHeight: "124%" })}
                        >
                          {'"'}
                          {item.phrase}
                          {'"'}
                        </Text>
                        
                        <Text
                          className="SF Pro Text"
                          color={"white"}
                          {...(isMobile
                            ? { fontSize: "18px", lineHeight: "140%" }
                            : { fontSize: "24px", lineHeight: "132%" })}
                          fontWeight={"600"}
                          wordBreak={"break-all"}

                        >
                          {item.name}
                        </Text>

                        <Text
                          className="SF Pro Text"
                          color={"green.300"}
                          {...(isMobile
                            ? { fontSize: "16px", lineHeight: "132%" }
                            : { fontSize: "16px", lineHeight: "140%" })}
                        >
                          {`(${item.age}) - ${item.ubi}`}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )
        :
        (
          <Box
            display="flex"
            position={'relative'}
            height="100vh"
            w={'100%'}
            overflow={'hidden'}
            onMouseEnter={()=>{setIsHoverHeader(true)}}
            onMouseLeave={()=>{setIsHoverHeader(false)}}
          >
            {expandedImage === null &&
              
              <>
                <Box position={'absolute'} zIndex={isHoverHeader ? 0: 10} width={"100%"} h={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} px={"24px"}>
                <Box maxW={"1200px"}>
                  <Text
                    w={isTablet ? "70%" : "60%"}
                    fontSize={"80px"}
                    fontWeight={"medium"}
                    lineHeight={"112.5%"}
                    letterSpacing={"4px"}
                    textTransform={"uppercase"}
                    color={"white"}
                  >
                    {__("welcome_to_crypto_empowerment", false, null, "#0FA")}
                  </Text>
                </Box>
              </Box>

              <Box
                position={"absolute"}
                top={0}
                left={0}
                bg={
                  "linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)"
                }
                zIndex={1}
                w={"100%"}
                h={"20%"}
              ></Box>

              <Box
                position={"absolute"}
                bottom={0}
                left={0}
                bg={"linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)"}
                zIndex={1}
                w={"100%"}
                h={"20%"}
              ></Box>
            </>
            }
          <Box
            position={"absolute"}
            bottom={0}
            left={0}
            zIndex={20}
            w={"100%"}
            opacity={expandedImage === null ? 1 : 0}
          >
            <SliderInfinity />
          </Box>

          {"" ||
            dataSlider.map((item) => (
              <Box
                key={item.id}
                width={
                  expandedImage === null
                    ? "33.33%"
                    : expandedImage === item.id
                    ? "100%"
                    : "0%"
                }
                height="100%"
                backgroundImage={`url(${item.imgUrl})`}
                backgroundSize={item.bgSize}
                transition="all 1s ease"
                borderRight={
                  expandedImage !== null && item.id < 3
                    ? "none"
                    : "2px solid white"
                }
                _hover={{
                  backgroundSize: `cover`,
                }}
                style={{
                  filter:
                    expandedImage === item.id ? "grayscale(0)" : "grayscale(1)",
                  backgroundPosition: item.bgPosition,
                }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Flex
                  h={"100%"}
                  flexDirection={"column"}
                  alignItems={item.alignText}
                  justifyContent={"center"}
                  px={"108px"}
                  {...(isMobile ? { gap: "30px" } : { gap: "32px" })}
                  opacity={
                    expandedImage !== null && expandedImage === item.id ? 1 : 0
                  }
                  transition={
                    expandedImage !== null && expandedImage === item.id
                      ? "opacity 0.5s ease-in 0.9s"
                      : ""
                  }
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={item.alignText}
                    justifyContent={"center"}
                    width={"50%"}
                  >
                    <Text
                      color={"white"}
                      fontWeight={600}
                      mb={"72px"}
                      textAlign={item.alignText === "start" ? "start" : "end"}
                      {...(isMobile
                        ? { fontSize: "20px", lineHeight: "120%" }
                        : { fontSize: "40px", lineHeight: "124%" })}
                    >
                      {'"'}
                      {item.phrase}
                      {'"'}
                    </Text>
                    <Text
                      color={"white"}
                      {...(isMobile
                        ? { fontSize: "18px", lineHeight: "140%" }
                        : { fontSize: "24px", lineHeight: "132%" })}
                      fontWeight={"600"}
                      wordBreak={"break-all"}
                    >
                      {item.name}
                    </Text>

                    <Text
                      color={"green.300"}
                      {...(isMobile
                        ? { fontSize: "16px", lineHeight: "132%" }
                        : { fontSize: "16px", lineHeight: "140%" })}
                    >
                      {`(${item.age}) - ${item.ubi}`}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
        </Box>
      )
      }
    </>
  );
}

