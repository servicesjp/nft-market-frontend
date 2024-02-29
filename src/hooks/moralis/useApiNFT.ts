import { MOROLIS_API_KEY, NameChain, URLBASE } from "@/constants/env"
import axios from "axios"


interface NFTInfo {
    chainId: any
    addressNft: string
    tokenId: string
}

const useApiNFT = () => {
    const headers = {
        accept: "application/json",
        "X-API-Key": `${MOROLIS_API_KEY}`,
    }
    const getOwnersByTokenId = async ({
        chainId,
        addressNft,
        tokenId,
    }: NFTInfo) => {
        const url = `${URLBASE}/api/v2.2/nft/${addressNft}/${tokenId}/owners?chain=${NameChain(
            chainId
        )}`

        try {
            const response = await axios.get(url, { headers })
            return { status: response?.status, result: response?.data?.result }
        } catch (err) {
            return {
                status: false,
                error: "Owners not found",
            }
        }
    }
    const getNFTTransfers = async ({
        chainId,
        addressNft,
        tokenId,
    }: NFTInfo) => {
        const url = `${URLBASE}/api/v2.2/nft/${addressNft}/${tokenId}/transfers?chain=${NameChain(
            chainId
        )}&format=decimal`

        try {
            const response = await axios.get(url, { headers })
            return { status: response?.status, result: response?.data?.result }
        } catch (err) {
            return {
                status: false,
                error: "Tranfers not found",
            }
        }
    }
    const getNFTMetadata = async ({
        chainId,
        addressNft,
        tokenId,
    }: NFTInfo) => {
        const url = `${URLBASE}/api/v2.2/nft/${addressNft}/${tokenId}?chain=${NameChain(
            chainId
        )}&normalizeMetadata=true&media_items=true`

        try {
            const response = await axios.get(url, { headers })
            return { status: response?.status, result: response?.data }
        } catch (err) {
            return {
                status: false,
                error: "Metadata not found",
            }
        }
    }

    return { getOwnersByTokenId, getNFTTransfers, getNFTMetadata }
}

export { useApiNFT }