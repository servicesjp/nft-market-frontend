import _axios from "axios"

const axios = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_CMS,
})

const useStrapiApi = () => {
    const getTermsAndConditions = async () => {
        try {
            const response = await axios.get(
                "/termsandconditions?filters[web][$contains]=nft"
            )
            return response
        } catch (error) {
            return error
        }
    }

    return {
        getTermsAndConditions,
    }
}

export { useStrapiApi }
