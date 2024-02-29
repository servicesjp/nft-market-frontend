import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider"
import { showInfoToast } from "../toast";
import Spinner from "../spinner";
import useMarketAuth from "@/hooks/use-market-auth";
import { __ } from "@/helpers/common";
export default function MetamaskRequired({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const { isConnected,chain }: any = useContext(WalletConnectContext);
    const { isAuthenticatedMarket } = useMarketAuth()

    useEffect(() => {
        
        if(!isAuthenticatedMarket()){
            showInfoToast(__('connect_your_wallet'))
            router.push("/")
            return;
        } else {
            setLoading(false)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected])
    
    return (<>
        {
            loading ?
            <Spinner></Spinner>
            :
            children
        }
    </>)
}