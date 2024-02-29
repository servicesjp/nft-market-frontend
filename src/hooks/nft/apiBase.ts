import _axios from "axios"
export const axios = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_NFT_BACKEND_BASE_URL,
})