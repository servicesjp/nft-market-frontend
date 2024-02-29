import { CURRENCY, CURRENCY_ETHER } from "@/constants/env"
import { useApiTokens } from "@/hooks/moralis"

interface Token {
  address: string
  decimals: any
  symbol: string
}
const useERC20 = () => {
  const { getTokenMetadata, getTokenMetadatabySymbol } = useApiTokens()
  const getTokenDetails = (chainId: string, addressToken: string): Token => {
    const data: any = localStorage.getItem(`${chainId}-${addressToken?.toLowerCase()}`)

    return JSON.parse(data) || {decimals: 1, symbol: 1}
  }

  const initialGetTokens = async () => {
    const dataChain = CURRENCY
    for (const chainId in dataChain) {
      for (const currency in dataChain[chainId]) {
        if (dataChain[chainId][currency] != CURRENCY_ETHER) {
          if (
            localStorage.getItem(
              `${chainId}-${dataChain[chainId][currency]?.toLowerCase()}`
            ) == null
          ) {
            const { result } = await getTokenMetadata({
              chainId: parseInt(chainId),
              address: dataChain[chainId][currency],
            })
            localStorage.setItem(
              `${chainId}-${result.address?.toLowerCase()}`,
              JSON.stringify({
                address: result.address,
                decimals: result.decimals,
                symbol: result.symbol,
              })
            )
          }
        } else {
          if (
            localStorage.getItem(
              `${chainId}-${dataChain[chainId][currency]?.toLowerCase()}`
            ) == null
          ) {
            const obj = {
              address: dataChain[chainId][currency],
              decimals: 18,
              symbol: currency
            }
            localStorage.setItem(
              `${chainId}-${dataChain[chainId][currency]?.toLowerCase()}`,
              JSON.stringify(obj)
            )
          }
        }
      }
    }
  }
  return {
    getTokenDetails,
    initialGetTokens,
  }
}


export {
  useERC20,
}