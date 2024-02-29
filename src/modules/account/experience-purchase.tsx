import GridCollection from "../../components/cards/card-grid-collection";
import useResponsive from "@/hooks/useResponsive";
import TicketCard from "@/components/cards/ticket-card";
import { useContext, useEffect, useState } from "react";
import { authSession } from "../auth/auth-session";
import { WalletConnectContext } from "../provider/wallet-connect-provider";
import { useProductsApi } from "@/hooks/useApi";
import { InfoTicketsByUserDTO } from "@/hooks/types/info-tickets/InfoTicketsByUserDTO";

export const ExperiencePurchase = () => {
  const { isMobile } = useResponsive();
  const [experience, setExperience] = useState<any[]>([]);
  const { getExperiencePurchased } = useProductsApi();

  const { isConnected: walletIsConnected, address } =
  useContext(WalletConnectContext);

  
  const fetchMyExperiencePurchased = async () => {
    try {
      const params: InfoTicketsByUserDTO = {
        offset: 0,
        limit: 8,
        userAddress: address,
      };

      const response = await getExperiencePurchased(params);
      setExperience(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
      if (authSession.hasSession) {
        fetchMyExperiencePurchased();
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GridCollection
          key="merchantExperiencePurchase"
          products={experience as Array<any>}
          cols={isMobile ? 1 : 3}
          options={{ gap: 12 }}
        >
          <TicketCard />
        </GridCollection>
    </>
  );
};
