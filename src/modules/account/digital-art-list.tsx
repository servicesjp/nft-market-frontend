import GridCollection from "../../components/cards/card-grid-collection";
import useResponsive from "@/hooks/useResponsive";
import { DigitalArtCard } from "@/components/cards/digital-art-card";
import { ExperienceCard } from "@/components/cards/experience-card";
import { NftType } from "@/types/NftType";
import { useContext, useEffect, useState } from "react";

import { authSession } from "../auth/auth-session";
import { useUserApi } from "@/hooks/useApi";
import { WalletConnectContext } from "../provider/wallet-connect-provider";

interface IDigitalArtList {
    list: any[]
}

export const DigitalArtList = ({voucher}: {voucher: boolean}) => {
    const [myNFT, setNft] = useState<any[]>([]);
    const { fetchUserDigitalArts } = useUserApi();

    const { isConnected: walletIsConnected, address } =
    useContext(WalletConnectContext);

    const fetchMySalesUserDigitalArtVoucher = async () => {
        console.log("fetchMySalesUserDigitalArtVoucher", voucher, address)
        try {
          const params = {
            limit: 9,
            offset: 0,
            userAddress: address,
            isVoucher: voucher,
          };
          const { data } = await fetchUserDigitalArts(params)
          setNft(data.items);
        } catch (error) {
          console.log(error)
        }
    };

    useEffect(() => {
        if (authSession.hasSession) {
            fetchMySalesUserDigitalArtVoucher();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const {isMobile} = useResponsive()

    return (
        <>
            <GridCollection
                key="merchantProfileCollectiongrip"
                products={myNFT as Array<any>}
                cols={isMobile ? 1: 4}
                options={{ gap: 24 }}
            >
                <ExperienceCard nftType={NftType.EXPERIENCE} />
                <DigitalArtCard nftType={NftType.DIGITAL_ART} />
            </GridCollection>
        </>
    )
};