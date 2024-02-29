import { useContext, useEffect, useRef } from "react";
import { TicketContext } from "@/components/tickets";
import { Box, Divider, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";

import BgArrow from "@/assets/home/bg-arrow.svg";
import RedArrow from "@/assets/home/red-bg.svg";

export default function SliderInfinity() {
  const dataFetchedRef = useRef(false);
  const swiperRef = useRef<SwiperRef>(null);
  const { tickets }: any = useContext(TicketContext);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isTablet] = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setTimeout(() => {
      const start = () => {
        swiperRef.current?.swiper?.slideNext();
      };
      start();
    }, 2000);
  }, [tickets]);

  function calcPercentage(lastprice: any, prevdayprice: any) {
    const result = (lastprice / prevdayprice) * 100 - 100;
    const ispositive = result > 0;
    const parseResult = `${ispositive ? "+" : ""}${result.toFixed(2)}%`;
    return (
      <>
        <Text color={ispositive ? "green.50" : "red.50"}>{parseResult}</Text>
        <Box position="absolute" top="-2" right="-7">
          {ispositive ? <BgArrow /> : <RedArrow />}
        </Box>
      </>
    );
  }

  const drawPar = (data: any) => {
    const link = data?.tradingPair?.symbol.replace(/\//g, "-");
    return (
      <Box
        h={isMobile ? "76px" : "100px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
        position="relative"
        onClick={() => {
          window.open(`https://dev.themeteor.io/spot/${link}`, "_blank");
        }}
        cursor="pointer"
      >
        <VStack
          fontSize="14px"
          gap="1px"
          alignItems="start"
          fontWeight="medium"
          position="relative"
        >
          <Text color={"white"}>{data?.tradingPair?.symbol}</Text>
          <Text color={"white"}>{data?.lastPrice}</Text>
          {calcPercentage(data?.lastPrice, data?.prevDayPrice)}
        </VStack>
        <Divider orientation="vertical" borderColor={"gray.700"} h="60px" />
      </Box>
    );
  };
  return (
    <Box backdropFilter={"blur(10px)"} display={"flex"} alignItems={"end"}>
      <Swiper
        ref={swiperRef}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={1000}
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        spaceBetween={24}
        slidesPerView={isMobile ? 2 : isTablet ? 4 : 6}
        slidesPerGroup={1}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        style={{ paddingBlock: "10px" }}
      >
        {tickets?.length >= 0 &&
          tickets.map((d: any, i: any) => (
            <SwiperSlide key={"tickets" + i}>{drawPar(d)}</SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}
