import { Link, Image } from "@chakra-ui/react";
import NextLink from "next/link";

export function Logo({ scrollY, isWhite}: any) {
    return (
        <Link as={NextLink} href="/">
          <Image
            src={
              scrollY> 0 || isWhite
                ? "/images/logo-green-black.svg"
                : "/images/logo-green-white.svg"
            }
            alt="Meteor logo"
            height="32px"
            width="143.001px"
          />
        </Link>
      );
    
}
