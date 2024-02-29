import { Link, Image, useColorModeValue } from "@chakra-ui/react";
import NextLink from 'next/link'

export function MenuLogo() {
    const logoUrl = useColorModeValue("/images/logo.svg", "/images/logoDark.svg");
    return <Link as={NextLink} href="/">
        <Image
            src={logoUrl}
            alt="Meteor logo"
            height="36px"
            width="36px"
        />
    </Link>
}