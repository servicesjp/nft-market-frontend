import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import {
  KYCLevel,
  KYCReviewStatus,
  kycStatusAtom,
} from "@/services/kyc-service";
import { showInfoToast } from "@/components/toast";
import Spinner from "@/components/spinner";

export default function KycRequired({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [decision, setDecision] = useState(false)
  const [kyc] = useAtom(kycStatusAtom);

  useEffect(() => {
    if (!kyc || decision) return;

    if (kyc.status !== KYCReviewStatus.Approved && kyc.level !== KYCLevel.Lvl2) {
      showInfoToast('Please, you need to have kyc level 2 to access this page.')
      router.push("/account");
    } else {
      setLoading(false);
    }
    setDecision(true)
  }, [kyc])


  return (<>
    {
        loading ?
        <Spinner></Spinner>
        :
        children
    }
  </>)
}
