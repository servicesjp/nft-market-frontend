import MEbreadcrumb, { IBreadCrumbData } from "@/components/MEbreadcrumb";
import { ExperienceList } from "@/modules/account/experience-list";
import { ExperiencePurchase } from "@/modules/account/experience-purchase";
import { DigitalArtList } from "@/modules/account/digital-art-list";
import PersonalInfo from "@/modules/account/personal-info";
import ProfileSidebar from "@/modules/account/profile-sidebar";
import LoginRequired from "@/components/required/login-required";
import MetamaskRequired from "@/components/required/metamask-required";
import { __ } from "@/helpers/common";
import useResponsive from "@/hooks/useResponsive";
import { MainLayout } from "@/layouts/main-layout";
import WrappedContent from "@/layouts/wrapped-content";
import { authSession } from "@/modules/auth/auth-session";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import {
  Flex,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import { useContext, useEffect, useState } from "react";
import { FaBoxOpen, FaUserCircle, FaChalkboardTeacher, FaChartPie, FaStore, FaTicketAlt, FaBell } from "react-icons/fa";
import TransactionTable from "@/modules/account/transactions-table";
import NotificationsList from "@/modules/account/notifications-list";

function AccountSectionPage() {
  const router = useRouter();
  const { isConnected: walletIsConnected, address } =
    useContext(WalletConnectContext);

  const {
    isOpen: isAlertOpen,
    onOpen: openAlert,
    onClose: onAlertClose,
  } = useDisclosure();

  const sidebarItems = [
    { id: 'vouchers', icon: FaBoxOpen, label: __('my_vouchers') },
    { id: 'collections', icon: FaBoxOpen, label: __('my_nft') },
    { id: 'notifications', icon: FaBell, label: __('notifications') },
    { id: 'personal_info', icon: FaUserCircle, label: __('personal_info') },
    // { id: 'merchant_info', icon: FaStore, label: __('merchant_info') },
    { id: 'my_experience', icon: FaChalkboardTeacher, label: __('my_experience') },
    { id: 'my_tickets', icon: FaTicketAlt, label: __('my_tickets') },
    { id: 'overview', icon: FaChartPie, label: __('overview_dashboard') },
    { id: 'transactions', icon: FaStore, label: __('transactions') },
  ];

  const [selectedItemId, setSelectedItemId] = useState(sidebarItems[0].id);
  const [breadcrumb, _] = useState<IBreadCrumbData[]>([
    { text: "Account", link: "/account" },
    { text: "Profile NFT", link: "#", isCurrentPage: true },
  ]);

  useEffect(() => {
    const section = router.query.section;
    if (section && typeof section === 'string') {

      setSelectedItemId(section);
    }

    if (authSession.hasSession) {
      if (!walletIsConnected) openAlert();
    }
  }, []);

  return (
    <LoginRequired>
      <MetamaskRequired>
        <MainLayout>
          <WrappedContent>
            <MEbreadcrumb py="0" items={breadcrumb}></MEbreadcrumb>
            <Flex
              gap={{ base: "6px", lg: "64px" }}
              w={"100%"}
              flexDirection={{ base: "column", md: "row" }}
            >
              <ProfileSidebar items={sidebarItems} selected={selectedItemId} />
              <Stack flex="1">
                {selectedItemId === 'vouchers' && <DigitalArtList voucher={true} />}
                {selectedItemId === 'collections' && <DigitalArtList voucher={false} />}
                {selectedItemId === 'notifications' && <NotificationsList />}
                {selectedItemId === 'personal_info' && <PersonalInfo />}
                {/* {selectedItemId === 'merchant_info' && <MerchantInfoCard nftUser={nftUser} />} */}
                {selectedItemId === 'my_experience' && <ExperienceList />}
                {selectedItemId === 'my_tickets' && <ExperiencePurchase />}
                {selectedItemId === 'transactions' && <TransactionTable />}
              </Stack>
            </Flex>
          </WrappedContent>
        </MainLayout>
      </MetamaskRequired>
    </LoginRequired>
  );
}

export default AccountSectionPage;
