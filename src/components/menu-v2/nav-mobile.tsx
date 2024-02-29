import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { logout } from '../../modules/auth/auth-service'
import { authSession } from '@/modules/auth/auth-session';
import { __ } from '@/helpers/common';
import { EMenu, ELoginMenu } from "./enum/menu-enum";


// import LogoutIcon from "@/assets/icons/menu/logouticon.svg";
import { HomeLogo } from "@/components/home-logo";
import NewMenu from "@/assets/icons/menu/new-menu";
import { MenuLogo } from "./logo";
import LoginButtons from "../../modules/auth/login-buttons";
import { WarningLog } from "../modals-alert/warning-log";
import { AlertMetamask } from "../modals-alert/alert-metamask";
import LocaleMenuOption from "./locale-button";
import useMarketAuth from "@/hooks/use-market-auth";
import { Button } from "antd";


interface MobileMenuProps {
  backgroundColor: string;
  isWhite: boolean;
}

interface menuProps {
  id: string | number;
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

const mobileMenuItems = EMenu.MOBILE_PAGES;
const mobileMenuLoginItems = ELoginMenu.MOBILE_PAGES;

const MenuItemLocale = () => (
  <Box>
    <LocaleMenuOption showCurrentLocale={true} />
  </Box>
);
const MenuItemHeader = (name: string) => (
  <h2>
    <AccordionButton>
      <Text
        as="span"
        flex="1"
        textAlign="left"
        fontSize="14px"
        py="18px"
        color="dark.100"
      >
        {__(name)}
      </Text>
      <AccordionIcon color="dark.100" />
    </AccordionButton>
  </h2>
);

const dividerMenu = (
  <Box
    my="2px"
    h="2px"
    bg="linear-gradient(90deg, rgba(0,71,187,0) 0%, rgba(0,71,187,1) 50%, rgba(0,71,187,0) 100%)"
  ></Box>
);

function HamburgerMenuButton({ onOpen, isWhite }: any) {
  const [scrollY, setHeight] = useState<any>(0);
  useEffect(() => {
    const handleScroll = () => {
      setHeight(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box
      w="100%"
      paddingX="24px"
      paddingY="10px"
      zIndex={100}
      {...(isWhite ? { bg: "white" } : {})}
      {...(scrollY > 0
        ? {
            bg: "white",
            position: "fixed",
            top: 0,
            left: 0,
            className: "header-mobile-fixed",
          }
        : { position: "absolute", top: 0, left: 0 })}
    >
      <HStack justifyContent={"space-between"}>
        <MenuLogo scrollY={scrollY} isWhite={isWhite} />
        <Box
          height="1.5rem"
          width="1.5rem"
          onClick={onOpen}
          style={{ cursor: "pointer" }}
        >
          <NewMenu color={scrollY > 0 || isWhite ? "black" : "white"} />
        </Box>
      </HStack>
    </Box>
  );
}

export function NavMobile({ backgroundColor, isWhite }: MobileMenuProps) {
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authenticated, setAuthenticated] = useState<boolean>(
    authSession.hasSession
  );

  const [showWalletConnectModal, setShowWalletConnectModal] = useState(false);
  const { logoutMarket, isAuthenticatedMarket } = useMarketAuth()

  const router = useRouter();

  const handleLogout = () => {
    logoutMarket()
    logout();
    router.replace("/logout");
  };

  const MenuItemBox = (item: menuProps) => (
    <HStack
      key={item.name}
      py="12px"
      cursor="pointer"
      onClick={() => {
        switch (item.id) {
          case "logout":
            handleLogout();
            return;
        }
        return item.path ? router.push(item.path) : null;
      }}
    >
      {
        (()=>{switch(item.id){
          case "account":
            return  <Text
            onClick={() => {
              !authenticated
                ? openLog()
                : !isAuthenticatedMarket()
                ? openAlert()
                : router.push("/account");
            }}
          >
            {__(item.name)}
          </Text>;
              case "wallet-connect":
                return <Button
                style={{
                  padding:0,
                  border:"none"
                }}
                onClick={onClose}><w3m-button /></Button>
          default:
            return  <>
            {item.icon}
            <Text>{__(item.name)}</Text>
          </>
        }})()
      }
    </HStack>
  );

  const accordionItemList = (menuItems: any) =>
    menuItems.map((d: any) =>
      d.child === undefined ? (
        MenuItemBox(d)
      ) : (
        <AccordionItem key={d.name}>
          {MenuItemHeader(d.name)}
          <AccordionPanel p={0}>
            {dividerMenu}
            <Stack spacing="0" pt="3px">
              {d.child &&
                d.child.map((submenu: menuProps) => MenuItemBox(submenu))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      )
    );

  return (
    <Box id="default-nav-mobile" zIndex={1000}>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size={["full", "xs", "sm", "md"]}
      >
        <DrawerOverlay />
        <DrawerContent
          backgroundColor={backgroundColor}
          border={0}
          borderRightRadius={0}
        >
          <DrawerCloseButton margin="20px" />
          <DrawerHeader margin="8px">
            <HomeLogo />
          </DrawerHeader>
          <DrawerBody>
            <Box
              {...(!authenticated ? { display: "flex" } : { display: "none" })}
              h={"3rem"}
              w={"100%"}
              flexDirection={"column"}
              justifyContent={"center"}
              pt="12px"
            >
              <LoginButtons />
            </Box>
            <Accordion defaultIndex={[0]} allowToggle>
              {accordionItemList(mobileMenuItems)}
            </Accordion>
            {authenticated && (
              <>
                <Divider my="4px" />
                <Accordion allowToggle>
                  {accordionItemList(mobileMenuLoginItems)}
                </Accordion>
                <Divider mt="4px" />
              </>
            )}
            <MenuItemLocale />
            <Box py="24px">{/* <MobileLogoutLink /> */}</Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <HamburgerMenuButton isWhite={isWhite} onOpen={onOpen} />
      <WarningLog onClose={onLogClose} isOpen={isLogOpen} />
      <AlertMetamask onClose={onAlertClose} isOpen={isAlertOpen} />
    </Box>
  );
}
