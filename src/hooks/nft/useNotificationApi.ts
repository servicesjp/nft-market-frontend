import { axios } from "@/hooks/nft/apiBase"

interface paramsSearch {
    pageSize?: number
    page?: number
    search?: string
}
export const useNotificationApi = () => {
    const getNotificationAllByUser = async (params?: paramsSearch) => {
        try {
            const response = await axios.get("/notification/all", {
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("access_token")
                },
                params
            })
            return response.data
        } catch (error) {
            console.log(error)
            return null
        }

    }
    const testNotificacion = async () => {
        return await axios.post(`/notification/test/notification`, {}, {
            headers: {
                "X-ACCESS-TOKEN": localStorage.getItem("access_token")
            }
        })
    }

    return {
        getNotificationAllByUser,
        testNotificacion
    }
}