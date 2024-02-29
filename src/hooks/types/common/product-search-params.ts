import { NftType } from "@/types/NftType";
import { GeneralPagination } from "./GeneralPagination"
import { ProductSortType } from "@/types/ProductSortType";
import { ApprovalStatus } from "@/types/ApprovalStatus";

export class ProductSearchParams extends GeneralPagination {
  q?: string;
  s?: ProductSortType;
  as?: ApprovalStatus;
  currencyType?: string;
  nftType?: NftType;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  rating?: number;
}