import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authSession } from "@/modules/auth/auth-session";

import { showInfoToast } from "../toast";
import Spinner from "../spinner";
import { __ } from "@/helpers/common";

export default function LoginRequired({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState<boolean>(authSession.hasSession)

    useEffect(() => {
        if (!authenticated) {
            showInfoToast(__('please_login'))
            router.push("/")
            return;
        } else {
            setLoading(false)
        }
    }, [authenticated])

    return (<>
        {
            loading ?
            <Spinner></Spinner>
            :
            children
        }
    </>)
}