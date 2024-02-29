import SubMenuOption from '@/modules/menu/sub-menu-option'
import { useRouter } from 'next/router'
import styles from './profile-menu.module.css'
import useHelpCenter from '../help-center/use-help-center'
import TopLevelPopupMenu from './top-level-popup-menu'
import { authSession } from '../auth/auth-session'
import { useContext, useState } from "react";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { logout } from "../auth/auth-service";
export const ProfileMenuLinks = [
  { route: '/account', text: 'Account and security' },
  { route: '/vip', text: 'VIP' },
  { route: '/notifications', text: 'Notification' },
]

export default function ProfileMenu({ children }: { children: React.ReactNode }) {

  const [authenticated, setAuthenticated] = useState<boolean>(authSession.hasSession)
  const { disconnect, isConnected } = useContext<any>(WalletConnectContext);
  const router = useRouter()
  const { openHelpCenter } = useHelpCenter()
  const handleLogout = () => {
    logout()
    if (authSession.hasSession)  {
      logout();
    }
    router.replace('/logout')
  }

  return <TopLevelPopupMenu trigger={children}>
    {
      !authenticated && <>
      <SubMenuOption onClick={() => router.push('/login')} text="Sign In" />
      </>
    }
    {authenticated && <>
      <SubMenuOption key='wallet-connect'>
        
      </SubMenuOption>
      <SubMenuOption className={styles.subMenuLogout} onClick={handleLogout} text="logout" />

    </>}
  </TopLevelPopupMenu>
}