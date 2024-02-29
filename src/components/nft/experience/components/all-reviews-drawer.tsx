import StarRating from "@/components/stars-rating";
import { useInfiniteGetReviews } from "@/hooks/api/use-infinite-get-reviews";
import useResponsive from "@/hooks/useResponsive";
import { Product } from "@/types/nft/product";
import { IReview } from "@/types/nft/review";
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";

interface AllReviewsDrawerProps {
  disclosure: any;
  product: Product;
}

export default function AllReviewsDrawer({
  disclosure,
  product,
}: AllReviewsDrawerProps) {
  const { isMobile } = useResponsive();
  const { data: reviewPages } = useInfiniteGetReviews({
    productId: product.experience!.id,
    params: {
      limit: 100,
    },
  });
  const reviews = reviewPages
    ? reviewPages.pages.flatMap((page) => page.items)
    : [];

  const averageRate =
    reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length;

  const countPerRate = reviews.reduce((acc: any, review: IReview) => {
    const rate = Math.round(review.rate);
    acc[rate] = (acc[rate] || 0) + 1;
    return acc;
  }, {});

  const percentagePerRate = Object.keys(countPerRate).reduce(
    (acc: any, rate) => {
      acc[rate] = (countPerRate[rate] / reviews.length) * 100;
      return acc;
    },
    {}
  );

  function renderContent() {
    return (
      <Stack
        direction={{ base: "column", md: "row" }}
        columnGap={"40px"}
        rowGap={"16px"}
      >
        <Stack
          direction={{ base: "row", md: "column" }}
          gap={"31px"}
          align={"center"}
          justify={"center"}
          py={{ base: "24px", md: "40px" }}
          w={"100%"}
        >
          <VStack>
            <Text
              fontSize={{ base: "40px", md: "56px" }}
              fontWeight={"500"}
              lineHeight={"64px"}
            >
              {averageRate.toFixed(1)}
            </Text>
            <StarRating
              initialRating={averageRate}
              viewMode
              boxSize={"16px"}
              onRate={() => true}
            />
          </VStack>
          <VStack>
            {[5, 4, 3, 2, 1].map((rate) => (
              <HStack
                gap={"16px"}
                key={"rate-" + rate}
                justify={"center"}
                w={"100%"}
              >
                <Text fontWeight={"500"}>{rate}</Text>
                <Progress
                  borderRadius={"6px"}
                  value={percentagePerRate[rate] || 0}
                  minW={{ base: "156px", md: "244px" }}
                  w={"100%"}
                  bg={"#E6E6E6"}
                  sx={{
                    "& > div": {
                      backgroundColor: "primary.100",
                    },
                  }}
                />
              </HStack>
            ))}
          </VStack>
        </Stack>
        <VStack
          gap={"16px"}
          h={{ base: "100%", md: "600xp" }}
          py={"20px"}
          overflowY={"auto"}
          align={"flex-start"}
          w={"100%"}
        >
          {reviews.map((review) => (
            <Stack
              key={"review-" + review.id}
              pe={{ base: "0", md: "40px" }}
              w={"100%"}
            >
              <Stack
                w={"100%"}
                borderBottom={"1px solid #E6E6E6"}
                gap={"16px"}
                py={"16px"}
              >
                <HStack justify="space-between" w="100%" gap={"12px"}>
                  <HStack gap={"12px"}>
                    <Avatar src={review.user.avatarUrl} />
                    <Stack gap="4px">
                      <Text fontSize="14px" fontWeight="500">
                        {review.user.username}
                      </Text>
                      <Text fontSize="12px" color="gray.500" mt="-5px">
                        {moment(review.createdAt).format("MMM, YYYY")}
                      </Text>
                    </Stack>
                  </HStack>
                  <StarRating
                    initialRating={review.rate}
                    viewMode
                    boxSize={"16px"}
                    onRate={() => true}
                  />
                </HStack>
                <Text fontSize={"14px"} lineHeight={"24px"}>
                  {review.description}
                </Text>
              </Stack>
            </Stack>
          ))}
        </VStack>
      </Stack>
    );
  }

  if (isMobile)
    return (
      <Drawer
        placement={"bottom"}
        onClose={disclosure.onClose}
        size={"full"}
        isOpen={disclosure.isOpen}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius={"24px"}>
          <DrawerHeader borderBottomWidth="1px" py={"16px"}>
            <HStack justify={"space-between"}>
              <Text lineHeight={"28px"} fontWeight={"500"} fontSize={"20px"}>
                Reviews
              </Text>
              <DrawerCloseButton
                position={"static"}
                borderRadius={"50%"}
                boxSize={"40px"}
                bg="#F2F6FC"
              />
            </HStack>
          </DrawerHeader>
          <DrawerBody p={"24px"}>{renderContent()}</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  else
    return (
      <Modal
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        isCentered={true}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="4xl" minW="min-content">
          <ModalHeader borderBottom={"1px solid #E6E6E6"}>
            <HStack justify={"space-between"}>
              <Text lineHeight={"28px"} fontWeight={"500"} fontSize={"20px"}>
                Reviews [{reviews.length}]
              </Text>
              <DrawerCloseButton
                position={"static"}
                borderRadius={"50%"}
                boxSize={"40px"}
                bg="#F2F6FC"
              />
            </HStack>
          </ModalHeader>
          <ModalBody px={"40px"}>{renderContent()}</ModalBody>
        </ModalContent>
      </Modal>
    );
}
