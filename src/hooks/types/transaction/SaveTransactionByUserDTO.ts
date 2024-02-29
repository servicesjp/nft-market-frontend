import { TransactionType } from "../contracts/events"
export interface SaveTransactionByUserDTO {

    userAddress: string

    transactionHash: string

    chainId: number

    eventType: TransactionType 

    nftContractAddress?: string

    tokenId?: number

    productId: string 

    quantity: number
}
