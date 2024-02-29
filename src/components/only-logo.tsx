
import { Image, Link, } from "@chakra-ui/react"
import NextLink from 'next/link'

export const OnlyLogo = (() => {
    const logoUrl = '/images/only-logo-white.svg'
    return <Link as={NextLink} href='/'><Image src={logoUrl} alt="Meteor logo" height='2rem' /></Link>
})