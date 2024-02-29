import { createContext, useContext, useEffect, useState } from "react";
import UserSession from "@/types/UserSession";
import { getUserId, getUserSession } from "@/modules/auth/auth-service";
import { useUserApi } from "@/hooks/useApi";
import { useRouter } from "next/router";
import { WalletConnectContext } from "./wallet-connect-provider";

let isInIframe = false;

if (typeof window !== 'undefined') {
  isInIframe = !(window.self === window.parent);
}

export interface NFTUser {
    id?: string;
    acceptedTerms?: boolean;

    firstName?: string;

    lastName?: string;

    email?: string;

    username?: string;

    bio?: string;

    publicAddress: string;

    meteorUserId: string;
}

export const UserContext = createContext<{
    user: UserSession,
    userId: string | null,
    nftUser: any,
    setUser: any,
    setNFTUser: any,
    finishRegistrationModal: boolean,
    setFinishRegistrationModal: any,
    sameWalletWarning: boolean,
    setSameWalletWarning: any,
    loggedIn: boolean,
    setLoggedIn: any,
    setAccessToken: any,
    accessToken: boolean
    loading: boolean,
    setLoading: any,
    fetchDataNftUser: any,
}>({} as any);

function UserInfoProvider({ children }: any) {
    const [user, setUser] = useState<UserSession>({} as any);
    const [userId, setUserId] = useState<string | null>(null);
    const [nftUser, setNFTUser] = useState<any>({} as any);
    const [finishRegistrationModal, setFinishRegistrationModal] = useState(false)
    const [sameWalletWarning, setSameWalletWarning] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)
    const { fetchUser } = useUserApi();
    const [accessToken, setAccessToken] = useState<boolean>(false)
    const router = useRouter()
    const { disconnect } = useContext(WalletConnectContext)
    const fetchDataNftUser = async () => {
        console.log("fetchDataNftUser")
        try {
        const userSession =  getUserSession();
        const userId = getUserId()
        const accessToken =  localStorage.getItem("access_token");
        
        if (userId) {
            setUserId(userId)
        }
        
        if (userSession) {
            setUser(userSession)
            setLoggedIn(true)
            if(!accessToken) 
            return;
        }
    
        if (accessToken) {
            setAccessToken(true)
            const nftUser = await fetchUser(accessToken);
            setNFTUser(nftUser)
            if (!nftUser) {
                disconnect();
            }
        }
        if(!accessToken){
            disconnect();
        }
            setFinishRegistrationModal(!nftUser.acceptedTerms)
        } catch(error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if(!isInIframe){
            fetchDataNftUser()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    

    useEffect(() => {
        let onMessage: any = ()=>{}
        if(!isInIframe) {

        } else {
            onMessage = (event: { origin: string; data: any; }) => {

                // check if the message is from a trusted source (optional)
                // if (event.origin !== 'https://example.com') return;
                
                const { user } = event.data;
                if (user?.Id) {
                    setUserId(user?.Id)
                    setUser(user);
                }
            };
    
            window.addEventListener('message', onMessage);
        
        }
        
        return () => {
            window.removeEventListener('message', onMessage);
        }
    }, [setUser]);
    return (
        <UserContext.Provider
            value={{
                user: user,
                userId: userId,
                setUser: setUser,
                nftUser: nftUser,
                setNFTUser: setNFTUser,
                finishRegistrationModal: finishRegistrationModal,
                setFinishRegistrationModal: setFinishRegistrationModal,
                sameWalletWarning: sameWalletWarning,
                setSameWalletWarning: setSameWalletWarning,
                loggedIn: loggedIn,
                setLoggedIn: setLoggedIn,
                loading: loading,
                setLoading: setLoading,
                accessToken:accessToken,
                setAccessToken: setAccessToken,
                fetchDataNftUser: fetchDataNftUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserInfoProvider;