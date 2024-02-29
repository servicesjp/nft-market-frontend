import _axios from "axios"
const axios = _axios.create()
const useApiIPFS = () => {
    const readLinkIPFS = async (link: string) => {
        try {
            const { data } = await axios.get(link)
            return data
        } catch (error) {
            console.log(error)
            return null
        }

    }



    return { readLinkIPFS }
}

export default useApiIPFS