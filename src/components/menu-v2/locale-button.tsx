import Modal from "@/components/common/components/modal";
import {
  Box,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  Hide,
} from "@chakra-ui/react";
import LocaleIcon from "./icons/locale-icon";
import { useEffect, useState } from "react";
import { StorageClass } from "@/services/storage-service";
import { useRouter } from "next/router";
import Lines from "@/assets/langauge/lines.svg";
import Dummy from "@/assets/langauge/dummy.svg";
import { __ } from "@/helpers/common";
import { getCurrentLocale, setLangCookie } from "@/modules/locale/locale";
import { useUserApi } from "@/hooks/useApi";
import useMarketAuth from "@/hooks/use-market-auth";
import { authSession } from "@/modules/auth/auth-session";

type ILang = {
  Id: number;
  Name: string;
  Code: string;
  IsActive: number;
};

export default function LocaleMenuButton({
  showCurrentLocale,
  color,
}: {
  showCurrentLocale?: boolean;
  color?: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [langs, setLangs] = useState<ILang[]>([]);
  const storage = StorageClass.getInstance();
  const router = useRouter();
  const selectedLanguageLocal = getCurrentLocale();
  const bgColor = useColorModeValue("white.100", "background.dark.100");
  const { changeLangUser, } = useUserApi()
  const {  } = useMarketAuth()

  const changeLanguage = async (item: ILang) => {
    setLangCookie(item.Code);
    // added call to api2 to change lang of user when is login with metamask
    if (authSession.hasSession) {
      await changeLangUser(item.Code)
    }

    await router.push(router.asPath, undefined, {
      locale: item.Code,
    });
    onClose();
  };

  useEffect(() => {
    (async () => {
      setLangs(JSON.parse(storage.get("activelang")!) ?? []);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box position="relative">
      <Modal title={""} isOpen={isOpen} onClose={onClose} width="medium">
        <VStack alignItems="start" width="100%">
          <Box position="absolute" right="0" top="0" zIndex="-1">
            <Lines />
          </Box>
          <Hide below="md">
            <Box position="absolute" right="4" bottom="2" zIndex="-1">
              <Dummy />
            </Box>
          </Hide>
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            fontFamily="Geomanist"
            fontWeight="500"
          >
            {__("choose_your_language_header")}
          </Text>
          <Text opacity="0.7">{__("choose_your_language_desc")}</Text>
          <VStack
            width={{ base: "70%", lg: "40%" }}
            alignItems="start"
            mt="20px"
            gap="10px"
          >
            {langs.map((item: ILang) => (
              <Box
                cursor="pointer"
                border={
                  item.Code == selectedLanguageLocal
                    ? "solid 2px #0047bb"
                    : "solid 2px #DDE3EE"
                }
                bg={bgColor}
                borderRadius="4px"
                p="10px"
                width="100%"
                key={item.Code}
                onClick={() => changeLanguage(item)}
              >
                {item.Name}
              </Box>
            ))}
          </VStack>
        </VStack>
        {/*  */}
      </Modal>
      <Box style={{ cursor: "pointer" }} onClick={onOpen}>
        {showCurrentLocale === true ? (
          MenuButtonWithText({ color })
        ) : (
          <Icon color={color} />
        )}
      </Box>
    </Box>
  );
}

function Icon({ color }: { color?: string }) {
  return <LocaleIcon color={color} />;
}

function MenuButtonWithText({ color }: any) {
  const { locale } = useRouter();
  return (
    <HStack py="18px" gap="0">
      <Icon color={color} />
      <Text paddingLeft="8px" color={color}>
        {locale!.toUpperCase()}
      </Text>
    </HStack>
  );
}