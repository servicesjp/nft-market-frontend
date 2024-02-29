import { ExperienceCard } from "@/components/cards/experience-card";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { WalletConnectContext } from "../provider/wallet-connect-provider";
import { useUserApi } from "@/hooks/useApi";
import { authSession } from "../auth/auth-session";
interface IExperienceList {
  experiences: any[];
}

export const ExperienceList = () => {
  const [myexperience, setMyExperience] = useState<any[]>([]);
  const { fetchUserMyExperience } = useUserApi();

  const { isConnected: walletIsConnected, address } =
  useContext(WalletConnectContext);

  const getUserMyExperience = async () => {
    try {
      const params = {
        limit: 9,
        offset: 0,
        userAddress: address,
      };
      const response = await fetchUserMyExperience(params);
      setMyExperience(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
      if (authSession.hasSession) {
        getUserMyExperience();
      }
  }, []);

  return (
    <SimpleGrid
      columns={{
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
      }}
      gridGap={{ base: "15px", md: "24px" }}
    >
      {myexperience.map((product) => (
        <Box key={product.id} w={"100%"}>
          <ExperienceCard data={product} />
        </Box>
      ))}
    </SimpleGrid>
  );
};
