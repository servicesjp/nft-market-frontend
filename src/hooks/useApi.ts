import { __ } from "@/helpers/common"
import { NFTUser, UserContext } from "@/modules/provider/user-info-provider"
import { ExperienceReview } from "@/types/CreateReview"
import { IBuyMarketPlace } from "@/types/IBuyMarketPlace"
import { ICancelMarketPlace } from "@/types/ICancelMarketPlace"
import { NftType } from "@/types/NftType"
import _axios from "axios"
import { useContext } from "react"
import { toast } from "react-toastify"
import { OverviewDashboardDTO } from "./types/dashboard/OverviewDashboardDTO"
import { SaleHistoryDTO } from "./types/dashboard/SaleHistoryDTO"
import { DetailSalesDTO } from "./types/dashboard/DetailSalesDTO"
import { VisitorHistoryDTO } from "./types/dashboard/VisitorHistoryDTO"
import { DetailVisitsDTO } from "./types/dashboard/DetailVisitsDTO"
import { OverviewResponse } from "./types/dashboard/OverviewResponse"
import { TimeStat } from "@/types/TimeStat"
import { BuyListingDTO } from "./types/listing/BuyListingDTO"
import { CancelListingDTO } from "./types/listing/CancelListingDTO"
import { ListingProductDTO } from "./types/listing/ListingProductDTO"
import { MiningProductDTO } from "./types/product/MiningProductDTO"
import { CreateOfferDTO } from "./types/offer/CreateOfferDTO"
import { AcceptOfferDTO } from "./types/offer/AcceptOfferDTO"
import { CancelOfferDTO } from "./types/offer/CancelOfferDTO"
import { CreateExpInstanceDTO } from "./types/experience-instance/CreateExpInstanceDTO"
import { ExpInstancesParamsDTO } from "./types/experience-instance/ExpInstancesParamsDTO"
import { CancelTicketsDTO } from "./types/experience-instance/CancelTicketsDTO"
import { BurnInfoTicketDTO } from "./types/info-tickets/BurnInfoTicketDTO"
import { ApproveInfoTicketDTO } from "./types/info-tickets/ApproveInfoTicketDTO"
import { InfoTicketsByUserDTO } from "./types/info-tickets/InfoTicketsByUserDTO"
import { ProductSearchParams } from "./types/common/product-search-params"
import { TransactionByUserDTO } from "./types/transaction/TransactionByUserDTO"
import { OwnerAddressesDTO } from "./types/product/OwnerAddressesDTO"
import { RefreshTransactionByUserDTO } from "./types/transaction/RefreshTransactionByUserDTO"


export const axios = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_NFT_BACKEND_BASE_URL,
    // baseURL: 'http://localhost:8080/api',
})

const getAccessTokenHeader = () => {
    const accessToken = localStorage.getItem("access_token")
    return {
        "X-ACCESS-TOKEN": accessToken,
    }
}

const useUserApi = () => {
    const { setNFTUser, setFinishRegistrationModal } = useContext(UserContext)
    const fetchUser = async (token: any) => {

        return await axios.get("/users/me", {
            headers: {
                "X-ACCESS-TOKEN": token
            }
        })
            .then((res) => {
                const user = res.data
                if (user.acceptedTerms === false) {
                    // console.log({ setFinishRegistrationModal });
                    setFinishRegistrationModal?.(true)
                }
                return user as NFTUser
            })
            .catch((err) => {
                // console.log(err)
                return null
            })

    }

    const fetchUserPubilc = async (userId: string) => {
        try {
            const result = await axios.get(`/users/${userId}/public`)

            return result.data

        } catch (error) {
            console.log(error)
            return null
        }

    }

    const updateUser = async (values: any) => {
        return await axios.post(`/users/me`, values, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token"),
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((res) => {
                setNFTUser(res.data)
                toast.success(__("user_updated_successfully"))
                return true
            })
            .catch((err) => {
                console.log(err)
                toast.success(err)
                return false
            })
    }

    const changeLangUser = async (lang: string) => {
        return await axios.post(`/users/me/language`,
            {
                lang,
            },
            {
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token"),
                }
            })
            .then((res) => {
                return res
            })
            .catch((err) => {
                console.log(err)
                return false
            })
    }

    const sendNewMerchantRequest = async (data: any) => {
        try {
            const response = await axios.post(
                "/users/merchant/request",
                data,
                {
                    headers: {
                        "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                    }
                })
            return response
        } catch (error) {
            return error
        }
    }

    const sendMerchantRequest = async (reason: string, description: string) => {
        const data = {
            reason: reason,
            businessDescription: description
        }
        return await axios.post(
            "/users/merchant/request",
            data,
            {
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
    }

    const fetchUserSellingNfts = async () => {
        return await axios.get("/products/mine", {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            },
            params: {
                onSell: true
            }
        })
    }

    const fetchUserDigitalArts = async (_params: any) => {
        return await axios.get("/products/mine", {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            },
            params: {
                ..._params,
                nftType: NftType.DIGITAL_ART,
                // onSell: true,
            }
        })
    }

    const fetchUserActivity = async () => {
        return await axios.get("/users/me/activity/transactions", {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })

    }

    const fetchMerchants = async () => {
        return await axios.get("/users/merchants")
    }

    const getSingleUser = async (address: string) => {
        return await axios.get("/users", {
            params: {
                publicAddress: address
            }
        })
    }

    const getArtistActivities = async (userId: string) => {
        return await axios.get(`users/${userId}/activity/transactions`)
    }

    //NFT721
    const sendRedeemNFT721 = async (payload: any) => {
        const data = {
            voucher: payload
        }
        return await axios.post(
            "/nft721/redeem",
            data,
            {
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
    }
    const fetchUserMyExperience = async (_params: any) => {
        return await axios.get("/products/mine", {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            },
            params: {
                ..._params,
                nftType: NftType.EXPERIENCE,
            }
        })
    }

    return {
        fetchUser,
        updateUser,
        changeLangUser,
        sendMerchantRequest,
        sendNewMerchantRequest,
        fetchUserSellingNfts,
        fetchUserActivity,
        fetchMerchants,
        getSingleUser,
        getArtistActivities,
        sendRedeemNFT721,
        fetchUserDigitalArts,
        fetchUserMyExperience,
        fetchUserPubilc,
    }
}

const useProductsApi = () => {

    const manyProducts = async (params: ProductSearchParams | undefined) => {
        return await axios.get("/products", {
            params: params,
        })
    }

    const manyProductsByUserId = async (userId: string, params: any | undefined) => {

        try {
            const result = await axios.get(`/products/user/${userId}`, {
                params: params
            })

            return result.data

        } catch (error) {
            console.log(error)
            return null
        }
    }

    const getListingsByProduct = async (productId: string, params: any | undefined) => {

        try {
            const result = await axios.get(`/listing/${productId}`, {
                params: params
            })

            return result.data

        } catch (error) {
            console.log(error)
            return null
        }
    }

    const singleProduct = async (id: string, ownerAddressesDTO?: OwnerAddressesDTO) => {
        return await axios.get(`/product/${id}/info`, {
            params: ownerAddressesDTO,
            // agregar de donde vino, type: web, mobile
        })
    }

    const createProduct = async (data: any) => {
        return await axios.post("/product", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const buyProduct = async (id: any, instanceId: any, transactionHash: any) => {
        return await axios.post(`/product/${id}/buy/${instanceId}`, { transactionHash: transactionHash }, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const purchaseApprove = async (purchaseId: any) => {
        return axios.post(`/purchase/${purchaseId}/approve`, { approvalStatus: true }, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const purchaseConfirm = async (purchaseId: any) => {
        return axios.post(`/purchase/${purchaseId}/approve`, { approvalStatus: true }, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const listProduct = async (id: string, price: string) => {
        return await axios.post(`/product/${id}/list`, { price: price }, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const getCollectedProducts = async (params: JSON | undefined) => {
        return await axios.get("/products/mine", {
            params: params,
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const getLikedProducts = async (params: JSON | undefined) => {
        return await axios.get("/products/liked", {
            params: params,
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const likeProduct = async (productId: string) => {
        return await axios.post(`/product/${productId}/like`, {}, {
            params: {},
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const getProductPrices = async (productId: string) => {
        return await axios.get(`/product/${productId}/prices`, {
        })
    }

    const getActivity = async (productId: string) => {
        return await axios.get(`/product/${productId}/activity`)
    }

    const makeOffer = async (productId: string, productInstanceId: string, data: any) => {
        return await axios.post(`/product/${productId}/${productInstanceId}/offer`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }



    const deleteListing = async (productId: string) => {
        return await axios.delete(`/product/${productId}/cancel`, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const getMineOffers = async () => {
        return await axios.get("/offer/mine", {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const getProductOffers = async (productId: string) => {
        return await axios.get(`/offer/product/${productId}`, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const getMerchantProducts = async (userId: string) => {
        return await axios.get(`/product/user-products/${userId}`)
    }

    const acceptOfferBackend = async (offerId: string, txHash: string) => {
        return await axios.post(`/offer/${offerId}/accept`, { transactionHash: txHash }, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const initProduct = async (data: any) => {
        return await axios.post("/product/init", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const sendToApproveDigitalArtNft = async (id: string, data: any) => {
        return await axios.post(`/product/${id}/on-sale-voucher`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const saveInitialProduct = async (id: string | undefined, data: any) => {
        return await axios.post(`/product/${id}/save-init-product`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const miningProduct = async (id: string, data: MiningProductDTO) => {
        return await axios.post(`/product/${id}/mining`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const createExperience = async (data: any) => {
        return await axios.post(`/product/create-experience`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const burnEventExperience = async (productInstanceId: string, data: any) => {
        return await axios.post(`/product/burn-event/${productInstanceId}`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const createExperienceInstance = async (productId: string, data: CreateExpInstanceDTO) => {
        return axios.post(`/product/${productId}/experience-instance`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const createReview = async (data: ExperienceReview) => {
        return await axios.post(`/review`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            },
        })
    }

    const getExperiencePurchased = async (params: InfoTicketsByUserDTO) => {
        return await axios.get(`/info-tickets`, {
            params: params,
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const listProductMarketplace = async (id: string, data: ListingProductDTO) => {
        return await axios.post(`/product/${id}/list-marketplace`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const createOfferToProduct = async (id: string, data: CreateOfferDTO) => {
        return await axios.post(`/product/${id}/create-offer`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const getListingsByProductId = async (productId: string, _params: any) => {
        return await axios.get(`/product/${productId}/listings`, {
            params: {
                ..._params,
            }
        })
    }

    const userIsOwnerOfProduct = async (productId: string, _params: any) => {
        return await axios.get(`/product/${productId}/is-user-owner`, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            },
            params: {
                ..._params,
            }
        })
    }

    const getOffersByProductId = async (productId: string, _params: any) => {
        return await axios.get(`/product/${productId}/offers`, {
            params: {
                ..._params,
            }
        })
    }

    const buyListProductMarketplace = async (id: string | undefined, data: IBuyMarketPlace) => {
        return await axios.post(`/product/${id}/buy-marketplace`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const cancelListProductMarketplace = async (id: string | undefined, data: ICancelMarketPlace) => {
        return await axios.post(`/product/${id}/cancel-list-marketplace`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }
    const testNotification = async () => {
        return await axios.post(`/product/test/notification`, {}, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }


    const testChatInvitation = async (productInstanceId: string) => {

        return await axios.get(`/experience-instance/testInvitation/${productInstanceId}`, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        });
    }


    const priceHistoryProduct = async (productId: string) => {

        try {
            const result = await axios.get<TimeStat[]>(`/product/${productId}/price-history`, {
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
            return result.data

        } catch (error) {
            console.log(error)
            return []
        }
    }

    return {
        testChatInvitation,
        manyProducts,
        manyProductsByUserId,
        getListingsByProduct,
        createProduct,
        singleProduct,
        purchaseApprove,
        purchaseConfirm,
        buyProduct,
        listProduct,
        getCollectedProducts,
        getLikedProducts,
        likeProduct,
        getProductPrices,
        getActivity,
        makeOffer,
        deleteListing,
        getMineOffers,
        getProductOffers,
        getMerchantProducts,
        acceptOfferBackend,
        initProduct,
        saveInitialProduct,
        miningProduct,
        createExperience,
        createExperienceInstance,
        sendToApproveDigitalArtNft,
        burnEventExperience,
        getExperiencePurchased,
        listProductMarketplace,
        getListingsByProductId,
        getOffersByProductId,
        buyListProductMarketplace,
        cancelListProductMarketplace,
        testNotification,
        createOfferToProduct,
        userIsOwnerOfProduct,
        createReview,
        priceHistoryProduct,
    }
}

const useCurrencyApi = () => {
    const getAllCurrency = async (params: any = {}) => {
        return await axios.get(`/currency`, {
            params: params
        })
    }

    return {
        getAllCurrency
    }
}

const useOfferApi = () => {

    const acceptOffer = async (id: string, data: AcceptOfferDTO) => {
        return await axios.post(`/offer/${id}/accept`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const cancelOffer = async (id: string, data: CancelOfferDTO) => {
        return await axios.post(`/offer/${id}/cancel`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    return {
        acceptOffer,
        cancelOffer,
    }
}

const useExperienceApi = () => {

    const baseNameEndpoints = '/experience'

    const getReviewByExperienceId = async (experienceId: string, _params: any) => {
        return await axios.get(`${baseNameEndpoints}/${experienceId}/reviews`, {
            params: {
                ..._params,
            }
        })
    }

    const getExpInstancesByExpId = async (experienceId: string, _params: ExpInstancesParamsDTO) => {
        return await axios.get(`${baseNameEndpoints}/${experienceId}/instances`, {
            params: {
                ..._params,
            },
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    return {
        getReviewByExperienceId,
        getExpInstancesByExpId,
    }
}

const useExperienceInstanceApi = () => {

    const baseNameEndpoints = '/experience-instance'

    const buyTicketsExperienceInstance = async (expInstanceId: string, data: any) => {
        return await axios.post(`${baseNameEndpoints}/${expInstanceId}/buy`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const cancelTicketsExperienceInstance = async (expInstanceId: string, data: CancelTicketsDTO) => {
        return await axios.post(`${baseNameEndpoints}/${expInstanceId}/cancel`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    return {
        buyTicketsExperienceInstance,
        cancelTicketsExperienceInstance,
    }
}

const useListingApi = () => {

    const baseNameEndpoints = '/listing'

    const buyListing = async (id: string, data: BuyListingDTO) => {
        return await axios.post(`${baseNameEndpoints}/${id}/buy`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const cancelListing = async (id: string, data: CancelListingDTO) => {
        return await axios.post(`${baseNameEndpoints}/${id}/cancel`, data, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    return {
        buyListing,
        cancelListing,
    }
}

const useTransactionApi = () => {

    const baseNameEndpoints = '/transaction'

    const getTransactionsByUser = async (params: TransactionByUserDTO) => {
        return await axios.get(`${baseNameEndpoints}`, {
            params: params,
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const saveTransactionByUser = async (data: any) => {

        try {

            await axios.post(`${baseNameEndpoints}`, data, {
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
        } catch (error) {
            console.log(error)

        }
    }

    const saveTransactionInstanceByUser = async (data: any) => {

        try {

            await axios.post(`${baseNameEndpoints}/instance`, data, {
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
        } catch (error) {
            console.log(error)

        }
    }

    const refreshTransactionByUser = async (id: string, data: RefreshTransactionByUserDTO) => {
        try {

            const result = await axios.post(`${baseNameEndpoints}/${id}/refresh`, data, {
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })

            return result.data
        } catch (error) {
            console.log(error)

        }

    }

    return {
        getTransactionsByUser,
        saveTransactionByUser,
        saveTransactionInstanceByUser,
        refreshTransactionByUser,
    }
}

const useCategoryApi = () => {
    const getCategories = async (params: any) => {
        return await axios.get(`/categories`, {
            params,
        })
    }

    return {
        getCategories,
    }
}

const useInfoTicketsApi = () => {
    const getOneInfoTicketsById = async (infoTicketsId: string, userAddress: string) => {
        return await axios.get(`/info-tickets/${infoTicketsId}`, {
            params: {
                userAddress,
            },
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    const burnTicketsById = async (infoTicketsId: string, data: BurnInfoTicketDTO) => {
        return await axios.post(`/info-tickets/${infoTicketsId}/burn`, data,
            {
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
    }

    const approveInfoTicketByEventOwner = async (infoTicketsId: string, data: ApproveInfoTicketDTO) => {
        return await axios.post(`/info-tickets/${infoTicketsId}/approve`, data,
            {
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
    }

    return {
        getOneInfoTicketsById,
        burnTicketsById,
        approveInfoTicketByEventOwner,
    }
}

const useDashboardApi = () => {

    const baseNameEndpoints = '/dashboard'

    const overview = async (params: OverviewDashboardDTO) => {

        try {
            const result = await axios.get<OverviewResponse>(`${baseNameEndpoints}/overview`, {
                params,
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
            return result.data

        } catch (error) {
            console.log(error)
            return null
        }
    }

    const saleHistory = async (params: SaleHistoryDTO) => {
        try {
            const result = await axios.get(`${baseNameEndpoints}/sale-history`, {
                params,
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
            return result.data

        } catch (error) {
            console.log(error)
            return null
        }
    }

    const detailSales = async (params: DetailSalesDTO) => {
        try {
            const result = await axios.get(`${baseNameEndpoints}/detail-sales`, {
                params,
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
            return result.data

        } catch (error) {
            console.log(error)
            return null
        }
    }

    const visitorHistory = async (params: VisitorHistoryDTO) => {
        try {
            const result = await axios.get(`${baseNameEndpoints}/visitor-history`, {
                params,
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
            return result.data

        } catch (error) {
            console.log(error)
            return null
        }
    }

    const detailVisits = async (params: DetailVisitsDTO) => {
        try {
            const result = await axios.get(`${baseNameEndpoints}/detail-visits`, {
                params,
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                }
            })
            return result.data

        } catch (error) {
            console.log(error)
            return null
        }
    }



    return {
        overview,
        saleHistory,
        detailSales,
        visitorHistory,
        detailVisits,
    }
}

export { useCurrencyApi, useProductsApi, useUserApi, useOfferApi, useCategoryApi, useInfoTicketsApi, useDashboardApi, useListingApi, useExperienceApi, useExperienceInstanceApi, useTransactionApi, };

