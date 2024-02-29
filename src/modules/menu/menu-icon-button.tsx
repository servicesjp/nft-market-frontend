import { Box, forwardRef } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Global from '@/assets/icons/menu/global.svg';
import Home from '@/assets/icons/menu/home.svg';
import Notification from '@/assets/icons/menu/notification.svg';
import Profile from '@/assets/icons/menu/profile-circle.svg';
import ShoppingCart from '@/assets/icons/menu/shopping-cart.svg';
import Trade from '@/assets/icons/menu/trade.svg';
import Wallet from '@/assets/icons/menu/wallet.svg';
import Finance from '@/assets/icons/menu/finance.svg';
import Game from '@/assets/icons/menu/game.svg';

import styles from './menu-icon-button.module.css';

// forward ref is required for chakra-ui popover hovering to work
export const MenuIconButton = forwardRef<MenuIconProps, 'div'>(({ icon, route, name, matchRoute, ...rest }, ref) => {
    const router = useRouter();
    const selected = router.pathname === (matchRoute || route);
    const navigate = selected ? () => {} : () => router.push(route);
    const className = styles.menuIcon + (selected ? ' ' + styles.selected : '');
    return <Box {...rest} ref={ref} className={className} onClick={navigate}>{ selected ? icon.selected : icon.default }</Box>;
})

interface MenuIconProps {
    icon: MenuIconStates;
    route: string;
    name: string;
    matchRoute?: string; // selected if this route matches
}

export interface MenuIconStates {
    default: React.ReactNode;
    selected: React.ReactNode;
}

export const HomeIcon = { default: <Home width="24px" height="24px" />, selected: <Home width="24px" height="24px" /> }
export const TradeIcon = { default: <Trade width="24px" height="24px" />, selected: <Trade width="24px" height="24px" /> }
export const WalletIcon = { default: <Wallet width="24px" height="24px" />, selected: <Wallet width="24px" height="24px" /> }
export const GlobalIcon = { default: <Global width="24px" height="24px" />, selected: <Global width="24px" height="24px" /> }
export const NotificationIcon = { default: <Notification width="24px" height="24px" />, selected: <Notification width="24px" height="24px" /> }
export const ShoppingCartIcon = { default: <ShoppingCart width="24px" height="24px" />, selected: <ShoppingCart width="24px" height="24px" /> }
export const ProfileIcon = { default: <Profile width="24px" height="24px" />, selected: <Profile width="24px" height="24px" /> }
export const GameIcon = { default: <Game width="24px" height="24px" />, selected: <Game width="24px" height="24px" /> }
export const FinanceIcon = { default: <Finance width="24px" height="24px" />, selected: <Finance width="24px" height="24px" /> }