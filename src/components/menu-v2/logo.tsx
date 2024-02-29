import { domainsConfig } from "@/config";
import { getCurrentLocale } from "@/modules/locale/locale";
import { Link, Image, useColorModeValue } from "@chakra-ui/react";
import NextLink from 'next/link'
import { useEffect, useState } from "react"

export function MenuLogo({scrollY, colorLogo, isWhite}: any) {
    const [changeLogo, setChangeLogo] = useState<boolean>(false)
    const logoUrl = useColorModeValue("/images/logo-green-white.svg", "/images/logoDark.svg");
    const logoUrlScroll= useColorModeValue("/images/logo-green-black.svg", "/images/logoDark.svg");
    
    
    useEffect(()=>{
        // console.log('scroll in logo')
    },[scrollY])

    return <Link as={NextLink} href={`${domainsConfig.urlMeteor}/${getCurrentLocale()}`}>
        <Image
            src={colorLogo ? logoUrlScroll: scrollY >0 || isWhite?logoUrlScroll : logoUrl}
            alt="Meteor logo"
            height="36px"
            width="94.001px"
        />
    </Link>
}