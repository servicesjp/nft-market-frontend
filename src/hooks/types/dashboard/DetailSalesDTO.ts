import { NftType } from "@/types/NftType"
import { GeneralPagination } from "../common/GeneralPagination"

export class DetailSalesDTO extends GeneralPagination {

    userAddress: string =''

    startTime: number = 0

    endTime: number = 0

    nftType?: NftType
}
