import { useQuery } from '@tanstack/react-query';
import { useProductsApi } from "../useApi";
import { ProductSearchParams } from "../types/common/product-search-params";
import { Product } from "@/types/nft/product";
import { ListResult } from "@/types/list-result";

export function useGetProducts(params?: ProductSearchParams) {
  const { manyProducts } = useProductsApi();
  return useQuery({
    queryKey: ["products", params],
    queryFn: () =>
      manyProducts(params).then((res) => {
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
  });
}  