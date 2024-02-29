import axios from "axios"

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_EXCHANGE_BACKEND_BASE_URL,
})

export const apiCoinMarketCap = axios.create({
    baseURL: process.env.NEXT_PUBLIC_COIN_MARKET_CAP_BASE_URL,
    // headers: {
    //     'X-CMC_PRO_API_KEY': '5063a44e-2ade-4c75-8bd5-89377c539349'
    // }
})

const apiProduct = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NFT_BACKEND_BASE_URL
})