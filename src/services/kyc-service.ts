import { getExchangeClient } from "@/modules/encrypted-exchange/encrypted-exchange-client";
import { atom } from "jotai";

export enum KYCLevel {
  None,
  Lvl1 = "kyc-lvl-1",
  Lvl2 = "kyc-lvl-2",
}

export enum KYCReviewStatus {
  Unknow = -1,
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export interface KYCStatus {
  level: KYCLevel;
  status: KYCReviewStatus;
}

export const kycStatusAtom = atom<KYCStatus | undefined>(undefined);

kycStatusAtom.onMount = (setAtom) => {
  getKycLevel().then((kyc) => {
    setAtom(kyc);
  });
};

export async function getKycLevel(): Promise<KYCStatus> {
  const client = getExchangeClient();
  const response = await client.get("/accountsettings/user-kyc-info", {
    useToken: true,
  });
  const data = response.data;
  const kycStatus = {
    level: data["KycLevel"] || KYCLevel.None,
    status:
      data["Status"] !== undefined && data["Status"] !== null
        ? data["Status"]
        : KYCReviewStatus.Unknow,
  } as KYCStatus;
  return kycStatus;
}

export async function getKYCToken(level: KYCLevel): Promise<string> {
  const client = getExchangeClient();
  const response = await client.post(
    "/kyc/get-sumsub-access-token/",
    { LevelName: level.toString() },
    { useToken: true, encodeBody: false }
  );
  return response.data["Token"] as string;
}
