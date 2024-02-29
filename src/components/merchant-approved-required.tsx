import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/modules/provider/user-info-provider";
import { showErrorToast, showInfoToast } from "./toast";
import Spinner from "./spinner";
import { MerchantApprovalStatus } from "@/types/MerchantApprovalRequest";

export default function MerchantApproveRequired({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { nftUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!nftUser || Object.keys(nftUser).length === 0)  return;
    
        const decision = nftUser?.merchantApprovalRequest?.approvalStatus;
        if (decision !== MerchantApprovalStatus.Approved) {
            if (!decision) {
                showInfoToast('You need to send merchant request.')
                router.push('/onboarding')
            } else if (decision === MerchantApprovalStatus.Waiting) {
                showInfoToast('Wait. Your merchant application is under review.')
                router.push("/account");
            } else {
                showErrorToast('You are not merchant.')
                router.push("/account");
            }
            return;
        } else {
            setLoading(false);
        }
      }, [nftUser]);

    return (<>
        {
            loading ?
                <Spinner></Spinner>
            :
                children
        }
    </>)
}