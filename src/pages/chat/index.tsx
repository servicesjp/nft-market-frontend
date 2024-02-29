import LoginRequired from "@/components/required/login-required";
import MetamaskRequired from "@/components/required/metamask-required";
import { __ } from "@/helpers/common";
import useResponsive from "@/hooks/useResponsive";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";
import { authSession } from "@/modules/auth/auth-session";
import { UserContext } from "@/modules/provider/user-info-provider";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import {
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import ChatComponent from "@/components/merchant-chat";
import { AlertMetamask } from "@/components/modals-alert/alert-metamask";

function AccountPage() {
  const { fetchDataNftUser } = useContext(UserContext);
  const { isConnected: walletIsConnected } =
    useContext(WalletConnectContext);

  const {
    isOpen: isAlertOpen,
    onOpen: openAlert,
    onClose: onAlertClose,
  } = useDisclosure(); // alert wallet disconnected

  useEffect(() => {
    if (authSession.hasSession) {
      if (!walletIsConnected) openAlert();
      fetchDataNftUser();
    }
  }, []);

  return (
    <LoginRequired>
      <MetamaskRequired>
        <MainLayout px={0} maxW={"none"}>
          <WrappedContent>
            <ChatComponent token={localStorage.getItem("access_token") ?? ""} />
          </WrappedContent>
          <AlertMetamask onClose={onAlertClose} isOpen={isAlertOpen} />
        </MainLayout>
      </MetamaskRequired>
    </LoginRequired>
  );
}

export default AccountPage;
