import { Temporality } from "@/types/Temporality";
import { BaseDashboardDTO } from "./BaseDashboardDTO";

export class VisitorHistoryDTO extends BaseDashboardDTO {
    temporality: Temporality = Temporality.Day
}
