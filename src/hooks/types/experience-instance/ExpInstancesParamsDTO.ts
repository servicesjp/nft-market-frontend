import { GeneralPagination } from "../common/GeneralPagination"

export class ExpInstancesParamsDTO extends GeneralPagination {

    userAddress?: string

    startTime?: number

    endTime?: number
}
