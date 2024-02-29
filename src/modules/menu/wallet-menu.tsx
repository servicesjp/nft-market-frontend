
import SubMenuOption from '@/modules/menu/sub-menu-option'
import { useRouter } from 'next/router'

import SpotIcon from '@/assets/icons/menu/spot-wallet.svg'
import WalletIcon from '@/assets/icons/menu/wallet.svg'
import TransactionsIcon from '@/assets/icons/menu/transactions.svg'

import styles from './wallet-menu.module.css'
import React from 'react'
// import WalletConnectModal from '@/components/modal/wallet-connect-modal'
import TopLevelPopupMenu from './top-level-popup-menu'
import { Box } from '@chakra-ui/react'

export const WalletMenuLinks = [
  { route: '/wallet/overview', text: 'Overview', leftItem: <WalletIcon className={styles.icon} /> },
  { route: '/wallet/spot', text: 'Spot', leftItem: <SpotIcon className={styles.icon} /> },
  { route: '/wallet/derivative', text: 'Derivative', leftItem: <SpotIcon className={styles.icon} /> },
  { route: '/wallet/margin', text: 'Margin', leftItem: <SpotIcon className={styles.icon} /> },
  { route: '/wallet/transaction-history', text: 'Transactions', leftItem: <TransactionsIcon className={styles.icon} /> },
]

export default function WalletMenu({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return <TopLevelPopupMenu trigger={children}>
    {WalletMenuLinks.map((link, index) => (<SubMenuOption key={index} leftElement={<Box>{link.leftItem}</Box>} onClick={() => router.push(link.route)} text={link.text} />))}
    {/* {
      <SubMenuOption leftElement={<Box><WalletIcon className={styles.icon} /></Box>} key='wallet-connect'   >
        <WalletConnectModal />
      </SubMenuOption>
    } */}
  </TopLevelPopupMenu>
}