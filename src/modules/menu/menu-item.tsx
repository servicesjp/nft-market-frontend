import { __ } from "@/helpers/common";
import { MenuIconButton, MenuIconStates } from "./menu-icon-button";
import { HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface MenuItemProps {
    icon: MenuIconStates;
    route: string;
    label: string;
}

export const MenuItem = (({ icon, route, label } : MenuItemProps) => {
    const router = useRouter()
    const selected = router.pathname === route;

    const selectedColor = useColorModeValue('primary.100', 'white.100')
    const color = useColorModeValue('menu.100', 'white.75')

    return (
        <HStack onClick={() => router.push(route)} style={{cursor: 'pointer'}}>
            <MenuIconButton icon={icon} name={label} route={route} />
            <Text paddingLeft="8px" fontFamily="Euclid Regular" color={selected ? selectedColor : color}>{ __(label) }</Text>
        </HStack>
    )
})