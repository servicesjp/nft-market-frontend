import { domainsConfig } from "@/config";
import { getCurrentLocale } from "@/modules/locale/locale";
import { Image, Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

export const HomeLogo = () => {
  const logoUrl = useColorModeValue(
    "/images/logo-green-black.svg",
    "/images/logo-green-black.svg"
  );
  //const logoUrl= useColorModeValue("/images/logo-green-black.svg", "/images/logoDark.svg");
  return (
    <Link as={NextLink} href={`${domainsConfig.urlMeteor}/${getCurrentLocale()}`}>
      <Image src={logoUrl} alt="Meteor logo" height="2rem" />
    </Link>
  );
};
