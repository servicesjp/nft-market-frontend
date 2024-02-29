// import { Header } from "@/components/header";
import { HomeDefaultMenu } from "@/components/menu-v2";
import { Box, BoxProps, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";
import HeaderContent from "@/layouts/header-content";
import HeaderSemiContent from "@/layouts/header-semi-content";
import WrappedContent from "@/layouts/wrapped-content";
import Footer from "@/components/footer";
import useResponsive from "@/hooks/useResponsive";

interface DefaultLayoutProps  extends BoxProps  {
  children?: React.ReactNode;
}

export const MainLayout = ({
  children,
  ...props
}: DefaultLayoutProps) => {
  const { isMobile } = useResponsive();
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode('light');
  }, [colorMode, setColorMode]);


  const header = React.Children.toArray(children).filter(
    (child: any) => child.type === HeaderContent
  );
  const semiHeader = React.Children.toArray(children).filter(
    (child: any) => child.type === HeaderSemiContent
  );
  const wrapped = React.Children.toArray(children).filter(
    (child: any) => child.type === WrappedContent
  );
  return (
    <Box id="main-layout" bg={"white"}>
      <HomeDefaultMenu
        isWhite={header.length <= 0}
        backgroundColor="white"
        fixed={true}
      />
      <Box className="header-content" width={"100%"}>
        {header.length > 0 && <>{header}</>}
        {semiHeader.length > 0 && <>{semiHeader}</>}
        {header.length <= 0 && (
          <Box {...(isMobile ? { h: "52px" } : { h: "72px" })}></Box>
        )}
      </Box>
      <Box id="pageGeneral" width="100%">
        <Box
          w="100%"
          id="contentBox"
          maxW={"1200px"}
          margin={"auto"}
          px={"24px"}
          my={"40px"}
          {...props}
        >
          {wrapped}
        </Box>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};
