// import { Header } from "@/components/header";
import { HomeDefaultMenu } from "@/components/menu-v2";
import { Box, BoxProps, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";
import HeaderContent from "@/layouts/header-content";
import Footer from "@/components/footer";
import useResponsive from "@/hooks/useResponsive";

interface CleanLayoutProps  extends BoxProps  {
  children?: React.ReactNode;
}

export const CleanLayout = ({
  children,
  ...props
}: CleanLayoutProps) => {
  const { isMobile } = useResponsive();
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode('light');
  }, [colorMode, setColorMode]);


  const header = React.Children.toArray(children).filter(
    (child: any) => child.type === HeaderContent
  );
  return (
    <Box id="main-layout" bg={"white"}>
      <HomeDefaultMenu
        isWhite={header.length <= 0}
        backgroundColor="white"
        fixed={true}
      />
      <Box id="pageGeneral"
          w="100%"
          my={"40px"}
          {...props}
        >
          {children}
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};
