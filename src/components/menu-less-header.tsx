import { Box, Hide, HStack, Show } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SolidLogo } from "@/assets/logo/solid";
import ArrowLeft from "@/assets/icons/paginator/arrow-left";
export interface MenuLessHeaderProps {
  children?: React.ReactNode;
}

export const MenuLessHeader = ({ children }: MenuLessHeaderProps) => {
  const router = useRouter();
  const goBack = () => {
    window.history.length > 1 ? router.back() : router.push("/");
  };
  return (
    <Box width="100%">
      <Hide above="sm">
        <HStack
          justifyContent={"space-between"}
          paddingRight="26px"
          paddingTop="8px"
        >
          <Box w={"50px"} h={"50px"} >
          <ArrowLeft color="black" />
          </Box>
          <SolidLogo isWhite={true} />
          <Box>{children}</Box>
        </HStack>
      </Hide>
      <Show above="sm">
        <SolidLogo isWhite={true} />
      </Show>
    </Box>
  );
};
