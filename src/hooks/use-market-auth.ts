import _axios from "axios"
import { useContext } from "react"
import { toast } from "react-toastify"
import { useUserApi } from "./useApi"
import { useSignMessage } from "wagmi"
import { UserContext } from "@/modules/provider/user-info-provider"
import { __ } from "@/helpers/common"
import { domainsConfig } from "@/config"
import { authSession } from "@/modules/auth/auth-session"
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider"
import { setUserSession } from "@/modules/auth/auth-service"
import UserSession from "@/types/UserSession"
const axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_NFT_BACKEND_BASE_URL,
})
const Message = (nonce: string) => {
  return `Welcome to Meteor!\n\nClick to sign in and accept the Meteor Terms of Use (${domainsConfig.urlMeteor
    }/terms-condition) and Privacy Policy (${domainsConfig.urlMeteor
    }/policy).\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nOne-time nonce signing: ${nonce}`
}

const useMarketAuth = () => {
  const { signMessage, signMessageAsync } = useSignMessage()
  const { isConnected, disconnect } =
    useContext(WalletConnectContext)
  const { fetchUser } = useUserApi()
  const { setNFTUser, setLoggedIn, userId, setAccessToken } = useContext(UserContext)

  const loginMarket = async (address: string) => {
    try {
      const { data, status } = await axios.get("/users", {
        params: {
          meteorUserId: userId,
        },
      })
      if (status !== 204) {
        const signature = await signMessageAsync({
          message: Message(data.nonce.toString()),
        })
        await axios
          .post("/auth", {
            signature: signature,
            publicAddress: address,
            muserid: authSession?.authToken?.userId,
            email: authSession?.authToken?.email,
            nonce: data.nonce,
          })
          .then(async (authResp) => {
            localStorage.setItem("access_token", authResp.data.accessToken)
            const user = await fetchUser(authResp.data.accessToken)
            setNFTUser(user)
            if(user) setUserSession({Id: parseInt(user.meteorUserId)} as UserSession)
            setLoggedIn(true)
            setAccessToken(true)
            toast.success(__("login_successful"), {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
          .catch((err) => {
            console.log(err)
            disconnect()
            toast.error(
              `${err?.response?.data?.message || err.message || err}`,
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            )
          })
      } else {
        throw new Error(__("you_are_not_signed_up_please_sign_up_to_continue"))
      }
    } catch (e: any) {
      disconnect()
      toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
      })
      console.error("Error", e)
    }
  }

  const acceptTerms = async () => {
    await axios.get("/auth/register/terms", {
      headers: {
        "X-ACCESS-TOKEN": localStorage.getItem("access_token"),
      },
    })
  }

  const logoutMarket = () => {
    setNFTUser(null)
    localStorage.removeItem("access_token")
  }

  const isAuthenticatedMarket = () => {
    return localStorage.getItem('access_token') != null
  }

  return { loginMarket, logoutMarket, acceptTerms, isAuthenticatedMarket }
}

export default useMarketAuth