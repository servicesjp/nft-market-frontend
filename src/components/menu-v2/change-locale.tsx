import { HStack, Text } from "@chakra-ui/react";
import LocaleMenuOption from "./locale-button";

const changeLocaleComponent = ({
  isWhite,
  menuColor,
  selectedLanguage,
  fixed,
  isTrading,
}: any) => (
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
      textTransform="uppercase"
      color={
        (scrollY > 0 && fixed) || isWhite
          ? "black"
          : !isWhite
            ? "white"
            : menuColor
      }
    >
      {selectedLanguage}
    </Text>
  </HStack>
);

export default changeLocaleComponent;