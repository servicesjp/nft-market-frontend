import { useInfiniteQuery } from "@tanstack/react-query";
import { useExperienceApi } from "../useApi";
import { IReview } from "@/types/nft/review";
import { ListResult } from "@/types/list-result";

export function useInfiniteGetReviews({
  productId,
  params,
}: {
  productId: string;
  params?: any;
}) {
  const { getReviewByExperienceId } = useExperienceApi();
  return useInfiniteQuery({
    queryKey: ["reviews", productId, params],
    queryFn: ({ pageParam }) =>
      getReviewByExperienceId(productId, { ...params, offset: pageParam }).then(
        (res) => {
          const reviews = res.data.items.map((review: any) => {
            return review as IReview;
          });
          return new ListResult<IReview>(
            reviews,
            res.data.count,
            res.data.offset,
            res.data.limit
          );
        }
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.items.length !== 0) {
        const nextPage = pages.length * lastPage.limit;
        return nextPage;
      }
      return undefined;
    },
  });
}
