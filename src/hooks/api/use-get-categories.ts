import { useQuery } from '@tanstack/react-query';
import { useCategoryApi } from "../useApi";
import { NftType } from "@/types/NftType";
import { Category } from "@/types/nft/category";

export function useGetCategory(nftType: NftType) {
  const { getCategories } = useCategoryApi();
  return useQuery({
    queryKey: ["categories", nftType],
    queryFn: () =>
      getCategories({ nftType }).then((res) => {
        return res.data.map((category: any) => {
          return {
            id: category.id,
            name: category.name,
            translateKey: category.translateKey,
          } as Category;
        });
      }),
  });
}