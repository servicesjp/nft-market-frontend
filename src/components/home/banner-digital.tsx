import { Box, Flex, Text, Button, Heading, Show, Stack,
  Image} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { __ } from "@/helpers/common";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import {DigitalArtCard} from "../cards/digital-art-card";
import useResponsive from "@/hooks/useResponsive";
export default function BannerDigital({ products }: any) {
  const router = useRouter();
  const {isMobile, isTablet} = useResponsive()
  return (
    <Flex
      mt={4}
      borderRadius={4}
      align={"center"}
      flexDirection={{ base: "column", md: "row" }}
      gap={"32px"}
    >
      <Stack
        py={{ base: "0", md: "35px" }}
        gap={"24px"}
        w={{ base: "100%", md: "35%" }}
      >
        <Heading fontWeight="500" fontSize={{ base: "28px", lg: "40px" }}>
          {__("digital_art_at_your_fingertips")}
        </Heading>
        <Text fontSize={{ base: "18px", lg: "16px" }} color={"gray.100"}>
          <Show above="sm">{__("explore_virtual_gallery_and_discover")}</Show>
          <Show below="sm">{__("digital_art_section_desc_short")}</Show>
        </Text>
        <Show above="md">
          <Button
            onClick={() => {
              router.push("/marketplace/digital-art");
            }}
          >
            {__("view_more")}
          </Button>
        </Show>
      </Stack>
      <Box w={{ base: "100%", md: "65%" }} borderRadius="4px">
      <Box
      display={"flex"}
      alignItems={"center"}
      borderRadius="4px"
      {...(isMobile ? { p: "0" } : { p: "0px", bg: "white" })}
      height={"auto"}
    >
      {products?.length == 0 && (
        <Box
          h={"330px"}
          w="100%"
          display={"flex"}
          justifyContent="center"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Image
              h="80px"
              w="80px"
              src="/nft/data-notfound.svg"
              alt="Not found"
            />
            <Text className="SF Pro Text" color="gray.400" fontSize="14px">
              {__("no_records_found")}
            </Text>
          </Box>
        </Box>
      )}
      {products?.length >= 3 && (
        <Box height={"100%"} display={"flex"} overflow={"hidden"}>
          <Swiper
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            pagination={
              !isMobile
                ? false
                : {
                    dynamicBullets: true,
                    clickable: true,
                  }
            }
            modules={[Autoplay, Pagination]}
            spaceBetween={12}
            loop={true}
            slidesPerView={isMobile ? 2 : isTablet ? 2 : 3}
            style={{ width: "100%", paddingBottom: "4px" }}
          >
            {products.map((item: any) => (
              <SwiperSlide
                key={item.id}
                style={{
                  height: "100%",
                  paddingBottom: "4px",
                }}
              >
                <DigitalArtCard data={item} />
                <Show below="md">
                  <Box h={"32px"}></Box>
                </Show>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
      {products?.length > 0 && products?.length <= 2 && (
        <Box
          height={"100%"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((item: any) => (
            <DigitalArtCard key={item?.id} data={item} />
          ))}
        </Box>
      )}
    </Box>
      </Box>
      <Show below="md">
        <Button
          onClick={() => {
            router.push("/marketplace/digital-art");
          }}
        >
          {__("view_more")}
        </Button>
      </Show>
    </Flex>
  );
}
