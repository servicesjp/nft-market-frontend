import { __ } from "@/helpers/common";
import { Heading, Show, Text, Button, Flex, Hide, Stack  } from "@chakra-ui/react";
import "swiper/css";
import { ExperienceCard } from "@/components/cards/experience-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useRef } from "react"
import useResponsive from "@/hooks/useResponsive";
import { useRouter } from "next/router"
export function ListExperience({products} : any) {
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const {isMobile, isTablet} = useResponsive()
  const slideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const slidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <Stack gap={{base: "28px", md: "16px"}}>
      <Stack gap={{ base: "8px", md: "16px" }}>
        <Heading fontWeight="500" fontSize={{ base: "28px", lg: "40px" }}>
          {__("exciting_experiences_that_may_fascinate_you")}
        </Heading>
        <Text fontSize={{ base: "18px", lg: "16px" }} color={"gray.100"}>
          <Show above="sm">{__("welcome_to_our_unique_experiences")}</Show>
          <Show below="sm">{__("your_next_adventure_just_a_click_away")}</Show>
        </Text>
      </Stack>
      <Flex gap={"30px"} flexDir={"column"}>
      <Stack
        direction={{ base: "row", lg: "row" }}
        alignItems="center"
        justifyContent="space-between"
        overflowX="auto"
      >
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
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={isMobile ? 1 : isTablet ? 2 : 4}
          style={{ paddingBlockEnd: "10px" }}
        >
          {products.slice(0, 8).map((value: any, index: any) => (
            <SwiperSlide key={`nft-${index}`}>
              <ExperienceCard data={value} />
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
      </Stack>
      <Flex w={isMobile ? "100%" : "232px"} mx={"auto"}>
        <Button
          onClick={() => {
            router.push("/marketplace/experience");
          }}
        >
          {__("view_more")}
        </Button>
      </Flex>
    </Flex>
    </Stack>
  );
}
