import StarRating from "@/components/stars-rating";
import { showErrorToast } from "@/components/toast";
import { GeneralPagination } from "@/hooks/types/common/GeneralPagination";
import { useExperienceApi } from "@/hooks/useApi";
import { ApprovalStatus } from "@/types/ApprovalStatus";
import { ListResult } from "@/types/list-result";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { WriteRewiewDrawer } from "./components/write-review-drawer";
import AllReviewsDrawer from "./components/all-reviews-drawer";

interface IReviewSection {
  product: any;
}

export function ReviewSection({ product }: IReviewSection) {
  const { getReviewByExperienceId } = useExperienceApi();
  const [reviews, setReviews] = useState<any[]>();
  const [meanRate, setMeanRate] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reachedLimited, setReachedLimited] = useState<boolean>(false);
  const [pagination, setPagination] = useState<GeneralPagination>({
    limit: 3,
    offset: 0,
  });


  useEffect(() => {
    async function fetchReviews(
      pagination: GeneralPagination
    ): Promise<ListResult<any>> {
      try {
        setIsLoading(true);
        const response = await getReviewByExperienceId(
          product?.experience?.id,
          pagination
        );

        if (response.status === HttpStatusCode.Ok) {
          return response.data;
        } else {
          console.log(response);
        }
      } catch (error) {
        if (error instanceof Error) showErrorToast(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
      return new ListResult<any>();
    }

    async function getReviews() {
      const listReviews = await fetchReviews(pagination);
      setReviews(listReviews.items);
      console.log("listReviews", listReviews);
      if (
        listReviews.items.length === 0 ||
        listReviews.count <= listReviews.limit + listReviews.offset
      ) {
        setReachedLimited(true);
      }
    }
    getReviews();
  }, [pagination]);

  useEffect(() => {
    function getMeanRateReviews() {
      if (!reviews) return;
      if (reviews.length === 0) {
        setMeanRate("0.00");
        return;
      }
      try {
        const sum = reviews?.reduce(
          (accumulator, review) => accumulator + review?.rate,
          0
        );
        const average = sum / reviews.length;
        setMeanRate(average.toFixed(2));
      } catch (error) {
        setMeanRate("");
        console.log(error);
      }
    }
    getMeanRateReviews();
  }, [reviews]);




  const CardCommentItem = ({ data = {} }: any) => {
    return (
      <Card>
        <CardBody padding="16px" display={"flex"} gap={"16px"} flexDirection={"column"}>
          <Flex alignItems="center">
            <HStack gap={"12px"}>
              <Avatar src={data?.user?.avatarUrl} />
              <Stack gap="4px">
                <Text fontSize="14px" fontWeight="500">
                  {data?.user?.username}
                </Text>
                <Text fontSize="12px" color="gray.500" mt="-5px">
                  {moment(data?.createdAt).format("MMM, YYYY")}
                </Text>
              </Stack>
            </HStack>
            <Box ml={"auto"}>
              <StarRating
                initialRating={data?.rate}
                viewMode
                boxSize={"16px"}
                onRate={() => true}
              />
            </Box>
          </Flex>
          <Text fontSize="14px" color="#0F244E" lineHeight={"24px"}>
            {data?.description}
          </Text>
        </CardBody>
      </Card>
    );
  };

  const reviewDrawerDisclosure = useDisclosure();
  const allReviewsDisclosure = useDisclosure();

  return (
    <Stack gap={"24px"}>
      <WriteRewiewDrawer
        disclosure={reviewDrawerDisclosure}
        product={product}
      />
      <AllReviewsDrawer disclosure={allReviewsDisclosure} product={product} />
      <Stack gap={"8px"}>
        {reviews?.map((review: any, index: number) => (
          <CardCommentItem data={review} key={"review-" + index} />
        ))}
      </Stack>
      <Flex mt="10px" gap="20px">
        <Button
          w={"50%"}
          variant="outline"
          marginX={"auto"}
          isDisabled={
            (product.approvalStatus as ApprovalStatus) !==
            ApprovalStatus.APPROVED
          }
          onClick={() => {
            reviewDrawerDisclosure.onOpen();
          }}
        >
          Leave review
        </Button>
        <Button
          w={"50%"}
          marginX={"auto"}
          onClick={allReviewsDisclosure.onOpen}
        >
          See all Reviews
        </Button>
      </Flex>
    </Stack>
  );
}

