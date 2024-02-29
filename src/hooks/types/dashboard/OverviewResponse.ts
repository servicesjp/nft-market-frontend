import { TimeStat } from "@/types/TimeStat"
import { TopProductsResponseDTO } from "./TopProductsResponseDTO"

export interface OverviewResponse {
    totalSales: {
        total: number
        marketplaceTotal: number
        experienceTotal: number
        salesOverTime: TimeStat[]
    }
    totalVisits: {
        total: number
        visitToday: TimeStat[]
        visitYesterday: TimeStat[]
    }
    topProducts: TopProductsResponseDTO[]
}