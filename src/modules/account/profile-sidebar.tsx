import React from 'react';
import {
  List,
  ListItem,
  ListIcon,
  Divider,
  BoxProps,
  Card,
  Menu,
  IconButton,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
// import { HamburgerIcon } from '@chakra-ui/icons';
import { __ } from '@/helpers/common';

interface SidebarItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

interface ProfileSidebarProps extends BoxProps {
  items: SidebarItem[];
  selected: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ items, selected, ...props }) => {
  return (
    <Card
      as="nav"
      bg="white"
      w={{ base: "100%", md: "250px" }}
      px="0"
      py="4"
      h="fit-content"
      {...props}
      zIndex="3"
    >
      {/* Menú para móviles */}
      <Menu>
        <MenuButton
          as={IconButton}
          display={{ base: "block", md: "none" }}
        >
          {__(selected)}
        </MenuButton>
        <MenuList w="calc(100vw - 48px)">
          {items.map((item) => (
            <Link key={item.id} href={`/account/${item.id}`} passHref>
               <MenuItem 
                  as="a"
                  className={selected === item.id ? 'active' : undefined} 
                  icon={React.createElement(item.icon)} // Aquí se cambia a icon=
                  background={selected === item.id ? "primary.100" : "initial"}
                  color={selected === item.id ? "white" : "initial"}
                >
                  {item.label}
                </MenuItem>
            </Link>
          ))}
        </MenuList>
      </Menu>

      {/* Lista para pantallas más grandes */}
      <List spacing={2} variant="menu" display={{ base: "none", md: "block" }}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <Link href={`/account/${item.id}`} passHref style={{color: "initial"}} >
              <ListItem
                className={selected === item.id ? 'active' : undefined}
              >
                <ListIcon as={item.icon} />
                {item.label}
              </ListItem>
            </Link>
            {index < items.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};

export default ProfileSidebar;
