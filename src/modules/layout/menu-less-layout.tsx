import { MenuLessHeader } from "@/components/menu-less-header";
import { Box, useColorMode, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect } from "react";

export const MainWrapper = styled.div`
  min-height: 100vh;
  height: auto;
  width: 100vw;
  width: 100%;
  @media screen and (max-width: 767px) {
    height: 100%;
    min-height: auto;
    width: 100%;
    background-color: var(--chakra-colors-white-100);
  }
  display: flex;
  justify-content: center;

  @media screen and (min-width: 767px) {
    padding: 4% 108px;
  }
}
`;

export const MenuLessLayout = ({ children, header }: MenuLessLayoutProps) => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("light");
  }, [ setColorMode ]);

  return (
    <MainWrapper>
      <VStack width="100%" maxWidth="65rem">
        <MenuLessHeader>{header}</MenuLessHeader>
        <Box width="100%" padding={["24px", "0"]}>
          {children}
        </Box>
      </VStack>
    </MainWrapper>
  );
};

interface MenuLessLayoutProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
}
