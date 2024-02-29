import React, { useContext } from "react";
import { useEffect, useState } from "react";

import router, { useRouter } from "next/router";
import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
// import styles from './wallet-button.module.css'
import { logout } from "../../modules/auth/auth-service";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { authSession } from "@/modules/auth/auth-session";
import { __ } from "@/helpers/common";
import { EMenu, ELoginMenu } from "./enum/menu-enum";

import { MenuLogo } from "./logo";
import LocaleMenuOption from "./locale-button";
import { WalletUser } from "@/modules/menu/wallet-user";
import { NavItem } from "./nav-item";
import { WarningLog } from "../modals-alert/warning-log";
import { AlertMetamask } from "../modals-alert/alert-metamask";
import { getCurrentLocale } from "@/modules/locale/locale";
import useMarketAuth from "@/hooks/use-market-auth";
import { getLoginUrlWithRedirect } from "@/modules/login-redirect/login-redirect-service";
import { useWeb3Modal } from "@web3modal/wagmi/react"
import changeLocaleComponent from "./change-locale";
import NotificationButton from "./notification-button";
interface MenuProps {
  backgroundColor?: string;
  menuColor?: string;
  isWhite?: boolean;
  fixed?: boolean;
  fullWidth?: boolean;
  height?: string;
  isTrading?: boolean;
}

interface menuProps {
  icon?:
  | string
  | number
  | boolean
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | React.ReactFragment
  | React.ReactPortal
  | null
  | undefined;
  name: string;
  path?: string;
}

const menuItems = EMenu.PAGES;
const menuLoginItems = ELoginMenu.PAGES;

const unauthMenu = ({ isWhite, menuColor, selectedLanguage, fixed }: any) => (
  <HStack gap="30px">
    {/* <Button
      size="sm"
      fontSize={"14px"}
      variant="link"
      color={
        (scrollY > 0 && fixed) || isWhite
          ? "black"
          : !isWhite
          ? "white"
          : menuColor
      }
      onClick={() => {
        router.push("/login");
      }}
    >
      
    </Button> */}
    <Button
      size="sm"
      minW="120px"
      fontSize={"14px"}
      onClick={() => {
        router.push(getLoginUrlWithRedirect(router.asPath));
      }}
    >
      {__("login")}
    </Button>
    <HStack alignItems="center">
      <LocaleMenuOption
        color={
          (scrollY > 0 && fixed) || isWhite
            ? "black"
            : !isWhite
              ? "white"
              : menuColor
        }
      />
      <Text
        color={
          (scrollY > 0 && fixed) || isWhite
            ? "black"
            : !isWhite
              ? "white"
              : menuColor
        }
        textTransform="uppercase"
      >
        {selectedLanguage}
      </Text>
    </HStack>
  </HStack>
);

const isActualPath = (currentPath: string, idNav: string) => {
  const currentNamePath = currentPath === "/" ? "home" : currentPath;

  if (currentNamePath === idNav) return true;

  return false;
};

export function Nav({
  backgroundColor,
  menuColor,
  isWhite,
  fixed,
  fullWidth,
  height = "90px",
  isTrading,
}: MenuProps) {
  const selectedLanguage = getCurrentLocale();
  const [authenticated, setAuthenticated] = useState<boolean>(
    authSession.hasSession
  );
  const { open } = useWeb3Modal()
  const [scrollY, setHeight] = useState<any>(0);
  const { isConnected, disconnect } = useContext<any>(WalletConnectContext);
  const { logoutMarket, isAuthenticatedMarket } = useMarketAuth()
  const router = useRouter();
  const currentPath = window.location.pathname;

  const {
    isOpen: isLogOpen,
    onOpen: openLog,
    onClose: onLogClose,
  } = useDisclosure(); // alert not login

  const {
    isOpen: isAlertOpen,
    onOpen: openAlert,
    onClose: onAlertClose,
  } = useDisclosure(); // alert metamask not connected
  
  
  useEffect(() => {
    const handleScroll = () => {
      setHeight(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logoutMarket()
    logout();
    disconnect()
    router.replace("/logout");
  };

  const onSelectSubItem = (id: string) => {
    switch (id) {
      case "logout":
        handleLogout();
        break;
      case "wallet-connect":
        open()
        break;
      case "wallet-disconnect":
        logoutMarket();
        disconnect()
        break;
      default:
        break;
    }
  };

  return (
    <Center
      id="new-horizontal-menu"
      w="100%"
      {...(isWhite ? { bg: "white" } : {})}
      {...(scrollY > 0 && fixed
        ? {
          bg: backgroundColor,
          position: "fixed",
          top: 0,
          left: 0,
          className: "header-mobile--fixed",
        }
        : {
          position: "absolute",
          top: 0,
          left: 0,
          className: "header-mobile",
        })}
      zIndex={1000}
    >
      <HStack
        gap="70px"
        maxWidth={fullWidth ? "100% " : "1200px"}
        h={height}
        width={"100%"}
        alignItems="center"
        justifyContent="space-between"
        px={"24px"}
      >
        <HStack gap="32px" h="100%">
          <Box py="12px">
            <MenuLogo scrollY={scrollY} isWhite={isWhite} />
          </Box>

          <HStack gap="32px" h="100%">
            {menuItems.map((navItem: any) => (
              <NavItem
                key={navItem.name}
                navItem={navItem}
                isWhite={isWhite}
                active={isActualPath(currentPath, navItem.id)}
                fixed={fixed}
              >
                {navItem.id == "account" && (
                  <Text
                    onClick={() => {
                      !authenticated
                        ? openLog()
                        : !isAuthenticatedMarket()
                          ? openAlert()
                          : router.push("/account");
                    }}
                  >
                    {__(navItem.name)}
                  </Text>
                )}
              </NavItem>
            ))}
          </HStack>
        </HStack>
        <HStack h="100%">
          {authenticated && (
            <HStack gap="25px" h="100%">
              <HStack gap="32px" h="100%">
                {menuLoginItems.map((navItem: any) => {
                  return (
                    <NavItem
                      key={navItem.name}
                      navItem={navItem}
                      isWhite={isWhite}
                      fixed={fixed}
                      onSelect={(id: any) => onSelectSubItem(id)}
                    >
                      {navItem.id === "profile" ? (
                        
                        !isConnected ? <WalletUser
                        scrollY={scrollY}
                        isWhite={isWhite}
                        fixed={fixed}
                      /> : <w3m-button  />
                      ) : null}
                    </NavItem>
                  );
                })}
              </HStack>

              <HStack>
                <NotificationButton isWhite={isWhite} fixed={fixed} menuColor={menuColor}/>
              </HStack>

              {changeLocaleComponent({
                isWhite,
                menuColor,
                selectedLanguage,
                fixed,
                isTrading,
              })}
            </HStack>
          )}
          {!authenticated &&
            unauthMenu({ isWhite, menuColor, selectedLanguage, fixed })}
        </HStack>
      </HStack>
      <WarningLog onClose={onLogClose} isOpen={isLogOpen} />
      <AlertMetamask onClose={onAlertClose} isOpen={isAlertOpen} />
    </Center>
  );
}
