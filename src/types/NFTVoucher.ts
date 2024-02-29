export interface NFTVoucherSimple {
    name: string
    description: string
    tokenId: string
    royalty: string
    minPrice: string
    uri: string
    creator: string
    token: string
    nonce: string
    signature?: string
}

export interface NFTVoucherQuantity {
    name: string
    description: string
    tokenId: string
    royalty: string
    quantity: number
    minPrice: string
    uri: string
    creator: string
    token: string
    nonce: string
    signature?: string
}