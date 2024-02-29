import { useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { NavMobile } from "./nav-mobile";
import { Nav } from './nav';

export const HomeDefaultMenu = ({ isWhite, backgroundColor="white", fixed, fullWidth, height, isTrading }: HomeDefaultMenuProps) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isTablet] = useMediaQuery("(max-width: 1024px)");
  const menuColor = useColorModeValue("black", "white.100");
  // const backgroundColor = useColorModeValue("white.100", "dark.background.100");

  
  // console.log({menuColor})
  const menu = isTablet ? (
    <NavMobile isWhite={isWhite} backgroundColor={"white"} />
  ) : (
    <Nav
      isWhite={isWhite}
      backgroundColor={backgroundColor}
      menuColor={menuColor}
      fixed={fixed}
      fullWidth={fullWidth}
      height={height}
      isTrading={isTrading}
    />
  );
  return <header id="default-nav-menu">{menu}</header>;
};

interface HomeDefaultMenuProps {
  isWhite: boolean;
  backgroundColor: string;
  fixed?: boolean;
  fullWidth?: boolean;
  height?: string;
  isTrading?: boolean;
}