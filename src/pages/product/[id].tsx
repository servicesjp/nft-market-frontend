import MEbreadcrumb from "@/components/MEbreadcrumb";
import Spinner from "@/components/spinner";
import { __ } from "@/helpers/common";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";
import {
  Box,
  Button,
  HStack,
  Hide,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import LocationIcon from "../../assets/product/location.svg";
import WhiteColor from "../../assets/product/white.svg";
import Profile from "../../assets/product/profile-icon.svg";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Input } from "@/components/input";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const SingleProduct = () => {
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [productId, _] = useState<any>(router.query.id);
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
    <MainLayout>
      <WrappedContent>
        <Stack spacing="0" w={"100%"}>
          <Hide below="md">
            <MEbreadcrumb
              items={[
                { text: `Meteor ${__("home")}`, link: "/" },
                { text: `NFT ${__("home")}`, link: "/" },
                {
                  text: "Beats Studio3",
                  link: "#",
                  isCurrentPage: true,
                },
              ]}
            />
          </Hide>
          {loading ? (
            <Spinner />
          ) : (
            <Stack
              flexDirection={{ base: "column", md: "row" }}
              w="100%"
              gap="20px"
              alignItems="flex-start"
            >
              <Box width={{ base: "100%", md: "50%" }}>
                <Swiper
                  ref={swiperRef}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  spaceBetween={24}
                  slidesPerView={1}
                >
                  <SwiperSlide>
                    <Image
                      aspectRatio="1"
                      maxW={"100%"}
                      minW={"100%"}
                      bg="gray.50"
                      fit={"cover"}
                      src={"/products/beats.png"}
                      alt="beats"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      aspectRatio="1"
                      maxW={"100%"}
                      minW={"100%"}
                      bg="gray.50"
                      fit={"cover"}
                      src={"/products/beats.png"}
                      alt="beats"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      aspectRatio="1"
                      maxW={"100%"}
                      minW={"100%"}
                      bg="gray.50"
                      fit={"cover"}
                      src={"/products/beats.png"}
                      alt="beats"
                    />
                  </SwiperSlide>
                </Swiper>
                <HStack
                  alignItems="center"
                  justifyContent="center"
                  mt="20px"
                  zIndex="50"
                  gap="70px"
                >
                  <ChevronLeftIcon
                    bg="#00cfb4"
                    borderRadius="100%"
                    boxSize={7}
                    cursor="pointer"
                    onClick={slidePrev}
                    color="white.100"
                  />
                  <ChevronRightIcon
                    bg="#00cfb4"
                    borderRadius="100%"
                    boxSize={7}
                    cursor="pointer"
                    onClick={slideNext}
                    color="white.100"
                  />
                </HStack>
                <HStack alignItems="center" marginTop="30px">
                  <Profile />
                  <VStack alignItems="flex-start" gap="0">
                    <Text
                      fontSize={{ base: "17px", md: "24px" }}
                      fontWeight="500"
                    >
                      Dein Gastgerber Ole
                    </Text>
                    <HStack>
                      <LocationIcon />
                      <Text>Lima - Peru</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Text
                  color="#231c35"
                  fontSize="16px"
                  fontWeight="500"
                  marginTop="20px"
                >
                  About Us
                </Text>
                <Text color="#231C35" fontSize="14px">
                  Our passion for traveling and exploring gave us the
                  opportunity to open our minds and give us another perspective
                  of the world.
                </Text>
                <Text color="#231C35" fontSize="14px">
                  The idea of Travel Buddies, is the consequence of our constant
                  contact with travelers from different parts of the world and
                  their need to try new experiences making them be in contact
                  with the local culture and not only with the touristic.
                </Text>
                <HStack marginTop="30px">
                  <Button>Get in touch</Button>
                  <Button variant="outline">View Profile</Button>
                </HStack>
                <Text
                  textAlign="center"
                  color="#231c35"
                  fontSize="14px"
                  fontWeight="400"
                  marginTop="50px"
                  textTransform="uppercase"
                >
                  Host at Meteor since 2022
                </Text>
              </Box>
              <VStack width={{ base: "100%", md: "50%" }} alignItems="start">
                <HStack>
                  <LocationIcon />
                  <Text>Posted 1 week ago in Lima - Peru</Text>
                </HStack>
                <Text fontSize={{ base: "20px", md: "28px" }} fontWeight="500">
                  Beats Studio3 noise canceling headphones built-in microphone.
                </Text>
                <Text fontSize="14px" fontWeight="500">
                  Beats
                </Text>
                <HStack>
                  <StarIcon color="#0047bb" />
                  <StarIcon color="#0047bb" />
                  <StarIcon color="#0047bb" />
                  <Text color="#231C35" fontSize="12px">
                    4.91 (175 ratings)
                  </Text>
                </HStack>
                <HStack marginTop="20px">
                  <Button variant="outline">Almost new</Button>
                  <Button variant="outline">Technology</Button>
                </HStack>
                <Text color="#999" fontSize="16px" marginTop="30px">
                  Actual Price
                </Text>
                <HStack alignItems="center" marginBottom="30px">
                  <Text
                    fontSize={{ base: "24px", md: "32px" }}
                    fontWeight="500"
                    color="#231c35"
                  >
                    $ 240.00 USDT
                  </Text>
                  <Text
                    color="#999"
                    fontSize="16px"
                    textDecorationLine="line-through"
                  >
                    252 USDT
                  </Text>
                  <Text color="#D9261F" fontSize="15px">
                    5% OFF
                  </Text>
                </HStack>
                <HStack w="100%">
                  <Button width="70%">Buy Now</Button>
                  <Button width="30%" variant="outline">
                    Save
                  </Button>
                </HStack>
                <Text
                  color="#231c35"
                  fontSize="16px"
                  fontWeight="500"
                  marginTop="20px"
                >
                  Product description
                </Text>
                <Text color="#231c35" fontSize="14px" fontWeight="400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  bibendum ante quis odio tempor, in tincidunt risus sagittis.
                  Proin convallis quam hendrerit nibh mollis, non sagittis odio
                  sodales. Etiam iaculis, leo vitae euismod feugiat, nulla ex
                  gravida odio, eu varius nisl erat nec nibh. Donec nulla ex,
                  lobortis vitae felis aliquet, sagittis egestas urna. Fusce
                  placerat nibh in aliquet feugiat. Vivamus varius, sem a
                  lobortis dignissim, justo ante tincidunt sapien, finibus
                  bibendum urna turpis dictum lorem. Vivamus efficitur velit non
                  egestas rhoncus. In dictum purus in nulla.
                </Text>
                <Text
                  color="#231c35"
                  fontSize="16px"
                  fontWeight="500"
                  marginTop="20px"
                >
                  Product condition
                </Text>
                <HStack alignItems="center" width="100%" marginTop="10px">
                  <Box
                    width="15%"
                    height="15px"
                    bg="#00CFB4"
                    borderRadius="50px"
                  />
                  <Box
                    width="15%"
                    height="15px"
                    bg="#00CFB4"
                    borderRadius="50px"
                  />
                  <Box
                    width="15%"
                    height="15px"
                    bg="#00CFB4"
                    borderRadius="50px"
                  />
                  <Box
                    width="15%"
                    height="15px"
                    border="1px solid #00CFB4"
                    borderRadius="50px"
                  />
                  <Button width={{ base: "40%", md: "30%" }} variant="outline">
                    New [Unused]
                  </Button>
                </HStack>
                <Text
                  color="#231c35"
                  fontSize="16px"
                  fontWeight="500"
                  marginTop="20px"
                >
                  Product color
                </Text>
                <HStack>
                  <WhiteColor />
                  <Text color="#231C35" fontSize="14px">
                    White
                  </Text>
                </HStack>
                <Text
                  color="#231c35"
                  fontSize="16px"
                  fontWeight="500"
                  marginTop="20px"
                >
                  Standard Shipping
                </Text>
                <Text color="#231c35" fontSize="14px" fontWeight="300">
                  Best for shipping small items in Peru. We will send you a code
                  by email and you will ship the item. Shipping protection
                  included.
                </Text>
                <Text
                  color="#231c35"
                  fontSize="16px"
                  fontWeight="500"
                  marginTop="20px"
                >
                  Who will pay for delivery?
                </Text>
                <Input placeHolder="Seller" />
              </VStack>
            </Stack>
          )}
        </Stack>
      </WrappedContent>
    </MainLayout>
  );
};

export default SingleProduct;
