import { Box, HStack, Image } from "@chakra-ui/react";
// import ProfileIcon from "@/assets/icons/menu/profile-icon";
import { useContext, useState, useEffect } from "react";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import User from "@/assets/home/mt.svg";
export function WalletUser({scrollY, menuColor, isWhite}: any) {
  const [addressValue, setAddressValue] = useState<any>("");
  const { address } = useContext<any>(WalletConnectContext);
  useEffect(() => setAddressValue(address), [address]);

  function componentAddress() {
    if (addressValue) {
      return (
        <>
          <Box
            h="36px"
            {...( menuColor? {bg:"#EFF0F4"} :scrollY>0 ||isWhite ? {bg:"#EFF0F4"}:{ bg:"rgba(255, 255, 255, 0.2)"})}
            borderRadius="18px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px="4px"
            gap="8px"
          >
            <Box
              h="28px"
              w="28px"
              borderRadius="50%"

            >
              <Image src="/images/metamask/meta2.png" alt="Metamask" />
            </Box>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Box
            h="36px"
            w="36px"
            bg="#EFF0F4"
            borderRadius="18px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* <ProfileIcon color="#626B93" /> */}
              <User />
            </Box>
          </Box>
        </>
      );
    }
  }
  return (
    <HStack gap="10px">
      {componentAddress()}
    </HStack>
  );
}
