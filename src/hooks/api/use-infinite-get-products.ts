import { useProductsApi } from "../useApi";
import { ProductSearchParams } from "../types/common/product-search-params";
import { Product } from "@/types/nft/product";
import { ListResult } from "@/types/list-result";
import { useInfiniteQuery } from '@tanstack/react-query'

export function useInfiniteGetProducts(params?: ProductSearchParams) {

  const { manyProducts } = useProductsApi();
  return useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam }) =>
      manyProducts({ ...params, offset: pageParam }).then((res) => {
        const products = res.data.items.map((product: any) => {
          return product as Product;
        });
        return new ListResult<Product>(
          products,
          res.data.count,
          res.data.offset,
          res.data.limit
        );
      }),
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
