import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { showInfoToast } from "./toast";
import Spinner from "./spinner";
import { isValidString } from "@/modules/utils";
import { UserContext } from "@/modules/provider/user-info-provider";
import { __ } from "@/helpers/common";

export default function AboutMeFieldsRequired({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const { nftUser } = useContext(UserContext)

    useEffect(() => {

        if (!nftUser) return;

        if (!isValidString(nftUser?.firstName) || !isValidString(nftUser?.lastName) || !isValidString(nftUser?.bio)) {
            showInfoToast(__('required_about_me_fields'))
            // showInfoToast(__('Please, fill all about me fields.'))
            router.push('/account/edit')
            return;
        } else {
            setLoading(false)
        }
    }, [nftUser])

    return (<>
        {
            loading ?
            <Spinner></Spinner>
            :
            children
        }
    </>)
}