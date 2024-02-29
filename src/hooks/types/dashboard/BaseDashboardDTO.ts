import { NftType } from "@/types/NftType"

export class BaseDashboardDTO {

    userAddress: string =''

    startTime: number = 0

    endTime: number = 0

    nftType?: NftType
}
