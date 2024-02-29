import { MOROLIS_API_KEY, NameChain, URLBASE } from "@/constants/env"
import axios from "axios"

interface AllowanceInfo {
  chainId: any
  address: string
  ownerAddress: string
  spenderAddress: string
}

interface GetTokenInfo {
  chainId: any
  address: string
}

interface GetSymbol {
  symbol: any
}

const useApiTokens = () => {
  const headers = {
    accept: "application/json",
    "X-API-Key": `${MOROLIS_API_KEY}`,
  }
  const getAllowance = async ({
    chainId,
    address,
    ownerAddress,
    spenderAddress,
  }: AllowanceInfo) => {
    const url = `${URLBASE}/api/v2.2/erc20/${address}/allowance?chain=${NameChain(
      chainId
    )}&owner_address=${ownerAddress}&spender_address=${spenderAddress}`

    try {
      const response = await axios.get(url, { headers })
      return { status: response?.status, result: response?.data }
    } catch (err) {
      return {
        status: false,
        error: "Allowance not found",
      }
    }
  }
  const getTokenMetadata = async ({ chainId, address }: GetTokenInfo) => {
    const url: any = `${URLBASE}/api/v2/erc20/metadata?chain=${NameChain(chainId)}&addresses%5B0%5D=${address}`
    const headers = {
      accept: "application/json",
      "X-API-Key": `${MOROLIS_API_KEY}`
    }

    try {
      let token = await axios.get(url, { headers })
      if (token.data[0].decimals == "") {
        return { status: false, error: "Token not found" }
      }
      return { status: true, result: token.data[0] }
    } catch (err) {
      return {
        status: false,
        error: "Token not found",
      }
    }
  }

  const getTokenMetadatabySymbol = async ({ symbol }: GetSymbol) => {
    const url: any = `${URLBASE}/api/v2/erc20/metadata/symbols?chain=eth`
    const headers = {
      accept: "application/json",
      "X-API-Key": `${MOROLIS_API_KEY}`
    }

    try {
      let token = await axios.get(url, { headers })
      if (token.data[0].decimals == "") {
        return { status: false, error: "Token not found" }
      }
      return { status: true, result: token.data[0] }
    } catch (err) {
      return {
        status: false,
        error: "Token not found",
      }
    }
  }

  return { getAllowance, getTokenMetadata, getTokenMetadatabySymbol }
}

export { useApiTokens }