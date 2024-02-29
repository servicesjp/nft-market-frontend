import { Temporality } from "@/types/Temporality";
import { BaseDashboardDTO } from "./BaseDashboardDTO";

export class SaleHistoryDTO extends BaseDashboardDTO {
    temporality: Temporality = Temporality.Day
}
