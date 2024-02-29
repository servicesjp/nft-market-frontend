import ArrowRigthIcon from "@/assets/icons/arrow-right.svg";
import AccountSecurity from "@/assets/icons/menu/accountsecurity.svg";
import Wallet from "@/assets/icons/menu/connect-wallet.svg";
import Help from "@/assets/icons/menu/help.svg";
import Vip from "@/assets/icons/menu/vip.svg";
import Logout from "@/assets/icons/menu/logout.svg";
import Notification from "@/assets/icons/menu/notification-new.svg";
import SubMenuOption from "@/modules/menu/sub-menu-option";
import { isLoggedInAtom } from "@/modules/auth/auth-state";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import styles from "./styles/mobile-menu.module.css";
import { useContext } from "react";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { logout } from "@/modules/auth/auth-service";
import TopLevelPopupMenu from "@/modules/menu/top-level-popup-menu";
import { authSession } from "@/modules/auth/auth-session";
import { getLoginUrlWithRedirect } from "@/modules/login-redirect/login-redirect-service";

export const ProfileMenuLinks = [
  { route: "/account", text: "Account and security" },
  { route: "/vip", text: "VIP" },
  { route: "/notifications", text: "Notification" },
];

export default function ProfileMenu({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isLoggedIn] = useAtom(isLoggedInAtom)
  const { disconnect, isConnected } = useContext<any>(WalletConnectContext);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    if (authSession.hasSession) {
      logout();
      disconnect();
    }
    router.replace("/logout");
  };

  return (
    <TopLevelPopupMenu trigger={children}>
      <SubMenuOption
        leftElement={<AccountSecurity />}
        icon={<ArrowRigthIcon />}
        onClick={() => router.push("/profile")}
        text="account_and_security"
      />
      <SubMenuOption
        leftElement={<Help />}
        onClick={() => router.push("/help")}
        text="help_center"
      />
      {!isLoggedIn && (
        <>
          <SubMenuOption onClick={() => router.push(getLoginUrlWithRedirect(router.asPath))} text="sign_in" />
          <SubMenuOption
            onClick={() => router.push("/signup")}
            text="sign_up"
          />
        </>
      )}
      {isLoggedIn && (
        <>
          <SubMenuOption leftElement={<Wallet />} key="wallet-connect">
          </SubMenuOption>
          <SubMenuOption
            leftElement={<Vip />}
            onClick={() => router.push("/vip")}
            text="vip"
          />
          <SubMenuOption
            leftElement={<Notification />}
            onClick={() => router.push("/notifications")}
            text="notification"
          />
          <SubMenuOption
            leftElement={<Logout />}
            className={styles.subMenuLogout}
            onClick={handleLogout}
            text="logout"
          />
        </>
      )}
    </TopLevelPopupMenu>
  );
}
