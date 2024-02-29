import { Box, useMediaQuery } from "@chakra-ui/react";
function DefaultOnBoardingLayout({ children}: any) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isTablet] = useMediaQuery("(max-width: 1024px)");
  return (
    <Box minH={'100vh'} height={"auto"} backgroundColor={"background"}>
        {children}
    </Box>

  );
}

export default DefaultOnBoardingLayout;
