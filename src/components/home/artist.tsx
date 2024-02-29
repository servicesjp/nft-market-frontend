import { Box, Flex, Heading, Hide, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useResponsive from "@/hooks/useResponsive";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { __ } from "@/helpers/common";

export default function Artist() {
  const { isMobile } = useResponsive();
  const [videoLink, _ ] = useState<any[]>([
    "https://cdn.themeteor.io/videos/THE-METEOR-MAR-FULL.mp4",
    "https://cdn.themeteor.io/videos/THE-METEOR-VALERIA-FULL.mp4",
    "https://cdn.themeteor.io/videos/THE-METEOR-ALDO-FULL.mp4",
    "https://cdn.themeteor.io/videos/THE-METEOR-JAVIER-FULL.mp4",
    "https://cdn.themeteor.io/videos/THE-METEOR-MALENA.mp4",
  ]);
  const swiperRef = useRef<any>(null);
  const videoRefs = useRef<any>([]);
  const slideNext = () => {
    if (swiperRef?.current && swiperRef?.current?.swiper) {
      swiperRef?.current?.swiper?.slideNext();
    }
  };
  const slidePrev = () => {
    if (swiperRef?.current && swiperRef?.current?.swiper) {
      swiperRef?.current?.swiper?.slidePrev();
    }
  };
  useEffect(() => {
    const numVideos = videoLink.length;
    videoRefs.current = Array(numVideos)
      .fill(null)
      .map((_, i) => videoRefs.current[i] || React.createRef());
  }, [videoLink]);

  return (
    <Box
      paddingY={{ base: "0px", lg: "40px" }}
      display={"flex"}
      flexDirection={"column"}
      gap={"40px"}
    >
      <Flex flexDirection={isMobile ? "column" : "row"} gap={"16px"}>
        <Heading
          {...(isMobile ? { w: "100%" } : { flexBasis: "50%" })}
          fontWeight="500" fontSize={{ base: "28px", lg: "40px" }}
          textTransform="capitalize"
        >
          {__('discover_artists_experiences')}
        </Heading>
        <Text {...(isMobile ? { w: "100%" } : { flexBasis: "50%" })} fontSize={{ base: "18px", lg: "16px" }} color={"gray.100"}>
          {__('discover_artists_experiences_desc')}
        </Text>
      </Flex>
      
      <Flex alignItems={"center"} gap={"24px"}>
        <Hide below="sm">
          <ChevronLeftIcon
            bg="#00cfb4"
            borderRadius="100%"
            boxSize={7}
            cursor="pointer"
            onClick={slidePrev}
            color="white.100"
          />
        </Hide>
        <Swiper
          ref={swiperRef}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          {...(isMobile
            ? {
                slidesPerView: 1,
                modules: [Autoplay],
              }
            : {
                slidesPerView: "auto",
                grabCursor: true,
                centeredSlides: true,
                effect: "coverflow",
                coverflowEffect: {
                  rotate: -10,
                  stretch: -62,
                  depth: 200,
                  modifier: 1,
                  slideShadows: true,
                },
                modules: [EffectCoverflow],
              })}
          loop={true}
          style={{ width: "100%" }}
        >
          {videoLink.map((link, index) => (
            <SwiperSlide
              key={index}
              style={{
                width: "500px",
                height: "auto",
              }}
            >
              <Box
                borderRadius={"4px"}
                overflow={"hidden"}
                width={"100%"}
              >
              {/* <video style={{width:"100%"}} controls>
                <source style={{width:"100%"}} src={link} type="video/mp4" />
              </video> */}
              <video
                id="my-video"
                controls
                preload="auto"
                data-setup="{}"
              >
                <source src={link} type="video/mp4" />
              </video>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <Hide below="sm">
          <ChevronRightIcon
            bg="#00cfb4"
            borderRadius="100%"
            boxSize={7}
            cursor="pointer"
            onClick={slideNext}
            color="white.100"
          />
        </Hide>
      </Flex>
    </Box>
  );
}
