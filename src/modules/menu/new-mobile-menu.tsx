// import { HomeLogo } from "@/components/home-logo";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  HomeIcon,
  ProfileIcon,
  ShoppingCartIcon,
  TradeIcon,
  WalletIcon,
} from "@/modules/menu/menu-icon-button";
import React, { useContext } from "react";
import LogoutIcon from "@/assets/icons/logout.svg";
import TeacherIcon from "@/assets/icons/teacher-icon.svg";
import NewMenu from "@/assets/icons/menu/hamburger";
import { MenuItem } from "@/modules/menu/menu-item";

import styles from "./mobile-menu.module.css";
import { useEffect, useState } from "react";
// import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
// import { DEFAULT_SPOT_PAIR_URL } from "../configuration/default-pair";

import { ProfileMenuLinks } from "@/modules/menu/profile-menu";
import { WalletMenuLinks } from "@/modules/menu/wallet-menu";
// import { NewMenuLogo } from "@/modules/menu/new-menu-logo";
import useHelpCenter from "@/modules/help-center/use-help-center";
import LocaleMenuOption from "@/modules/menu/locale-menu-button";
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { __ } from "@/helpers/common";
import { SolidLogo } from "@/assets/logo/solid";

interface MobileMenuProps {
  backgroundColor: string;
}

const ExchangeMenuLinks = [
  // { text: "Spot Trading", route: DEFAULT_SPOT_PAIR_URL },
  { text: "Derivatives", route: "/derivative/BTCUSDT" },
  { text: "Market Overview", route: "/market-overview/market-overview" },
];

const HomeMenuLinks = [
  { text: "Home", route: "/" },
  { text: "Affiliate Program", route: "/affiliate/affiliate-program" },
  { text: "Transaction fee information", route: "/fees" },
  { text: "Blog", route: "/blogs" },
];

/** Maps the accordion items to indices */
const ACCORDION_INDEX_MAPPING = [
  ExchangeMenuLinks,
  WalletMenuLinks,
  ProfileMenuLinks,
];

function getExpandedMenuIndex(currentPath: string) {
  // special rule for spot
  if (currentPath.startsWith("/spot/")) {
    return 0;
  }

  for (let i = 0; i < ACCORDION_INDEX_MAPPING.length; i++) {
    const subPageSelected = ACCORDION_INDEX_MAPPING[i].some(
      (item) => item.route == currentPath
    );
    if (subPageSelected) {
      return i;
    }
  }
  return -1;
}

export function NewMobileMenu({ backgroundColor }: MobileMenuProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [showNft, setShowNft] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setExpandedIndex(getExpandedMenuIndex(router.pathname));
    setShowNft(router.pathname.startsWith("/nft"));
  }, [router]);
  return (
    <Box id="new-mobile-menu">
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size={["xs", "sm","md"]}
      >
        <DrawerOverlay />
        <DrawerContent
          backgroundColor={backgroundColor}
          border={0}
          borderRightRadius={0}
        >
          <DrawerCloseButton margin="20px" />
          <DrawerHeader margin="8px">
            <SolidLogo isWhite={true}/>
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems={"start"} gap={12} paddingLeft="16px">
              {/* <LoginButtons /> */}
              <Accordion
                defaultIndex={expandedIndex}
                className={styles.mobileMenu}
              >
                <MobileMenuAccordion
                  title="Home"
                  items={HomeMenuLinks}
                  icon={HomeIcon}
                  selected={expandedIndex === 0}
                />
                {!showNft && (
                  <>
                    <MobileMenuAccordion
                      title="Exchange"
                      items={ExchangeMenuLinks}
                      icon={TradeIcon}
                      selected={expandedIndex === 1}
                    />
                    <AccordionItem>
                      <MenuItem
                        icon={ShoppingCartIcon}
                        route="/nft/marketplace"
                        label="NFT"
                      />
                    </AccordionItem>
                    <MobileMenuAccordion
                      title="Wallet"
                      items={WalletMenuLinks}
                      icon={WalletIcon}
                      selected={expandedIndex === 4}
                    />
                  </>
                )}
                {showNft && (
                  <>
                    <AccordionItem>
                      <MenuItem
                        icon={ShoppingCartIcon}
                        route="/nft/marketplace"
                        label="marketplace"
                      />
                    </AccordionItem>
                    <AccordionItem>
                      <MenuItem
                        icon={ShoppingCartIcon}
                        route="/nft/artist"
                        label="artist"
                      />
                    </AccordionItem>
                    <AccordionItem>
                      <MenuItem
                        icon={ShoppingCartIcon}
                        route="/nft/artist"
                        label="blog"
                      />
                    </AccordionItem>
                  </>
                )}
                <Box
                  height="1px"
                  className="divider"
                  background="menu.100"
                  width="calc(100% - 72px)"
                />
                <LocaleMenuOption showCurrentLocale={true} />
                <HelpCenterLink />
                <AccordionItem>
                      {/* <MenuItem
                        icon={ShoppingCartIcon}
                        route="/nft/marketplace"
                        label="NFT"
                      /> */}
                      {/* <WalletConnectModal /> */}
                    </AccordionItem>
                <MobileMenuAccordion
                  title="Profile"
                  items={ProfileMenuLinks}
                  icon={ProfileIcon}
                  selected={expandedIndex === 4}
                />
                <MobileLogoutLink />
                
              </Accordion>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <HamburgerMenuButton onOpen={onOpen} />
    </Box>
  );
}

interface MobileMenuAccordionProps {
  title: string;
  icon: any;
  items: { text: string; route: string }[];
  selected: boolean;
}

function MobileMenuAccordion({
  title,
  icon,
  items,
  selected,
}: MobileMenuAccordionProps) {
  const selectedColor = useColorModeValue("primary.100", "white.100");
  const color = useColorModeValue("menu.100", "white.75");
  return (
    <AccordionItem>
      <AccordionButton>
        <HStack className={styles.accordionButton}>
          {selected ? icon.selected : icon.default}
          <Text
            paddingLeft="0.5rem"
            fontFamily="Euclid Regular"
            color={selected ? selectedColor : color}
          >
            {__(title)}
          </Text>
        </HStack>
      </AccordionButton>
      <AccordionPanel>
        {items.map((link, index) => (
          <MobileMenuAccordionLink
            key={index}
            route={link.route}
            text={link.text}
          />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
}

function MobileMenuAccordionLink({
  text,
  route,
}: {
  text: string;
  route: string;
}) {
  const router = useRouter();

  let isSelected = router.pathname === route;
  console.log(`path [${route}] is selected: ${isSelected}`);

  // special case for spot, this needs further refactoring
  // if (route === DEFAULT_SPOT_PAIR_URL) {
  //   isSelected = router.pathname.startsWith("/spot/");
  // }

  const className =
    styles.menuItem + (isSelected ? " " + styles.menuItemSelected : "");
  return (
    <Text className={className} onClick={() => router.push(route)}>
      {text}
    </Text>
  );
}

function HelpCenterLink() {
  const { openHelpCenter } = useHelpCenter();
  const color = useColorModeValue("menu.100", "white.75");

  return (
    <HStack
      onClick={openHelpCenter}
      style={{ cursor: "pointer" }}
      marginTop="1rem"
    >
      <TeacherIcon />
      <Text paddingLeft="8px" fontFamily="Euclid Regular" color={color}>
        Help Center
      </Text>
    </HStack>
  );
}

function MobileLogoutLink() {
  // const isLoggedIn = useAtomValue(isLoggedInAtom);
  const { disconnect, isConnected } = useContext<any>(WalletConnectContext);
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/logout");
    disconnect()
  };

  // if (!isLoggedIn) return <></>;

  return (
    <HStack onClick={handleLogout} style={{ cursor: "pointer" }}>
      <LogoutIcon className={styles.logoutButton} />
      <Text
        paddingLeft="8px"
        fontFamily="Euclid Regular"
        className={styles.menuOption}
      >
        Logout
      </Text>
    </HStack>
  );
}

function HamburgerMenuButton({ onOpen }: { onOpen: () => void }) {
const [scrollY, setHeight] = useState<any>(0)
useEffect(() => {
    const handleScroll = () => {
      setHeight(window.scrollY)
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Box
      w="100%"
      paddingX="24px"
      paddingY="10px"
      zIndex={100}
      {...(scrollY> 0 ? { bg:"white" ,position:"fixed", top:0, left:0, className:"header-mobile-fixed"}: {position:"absolute", top:0, left:0})}
    >
      <HStack justifyContent={"space-between"}>
        <SolidLogo isWhite={true}/>
        <Box
          height="1.5rem"
          width="1.5rem"
          onClick={onOpen}
          style={{ cursor: "pointer" }}
        >
          <NewMenu color={scrollY> 0 ? 'black':'white'} />
        </Box>
      </HStack>
    </Box>
  );
}
