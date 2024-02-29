import { __ } from '@/helpers/common';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import {
    Box,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    AbsoluteCenter,
  } from "@chakra-ui/react";
import { useContext, useState } from 'react';
import { WalletConnectContext } from "@/modules/provider/wallet-connect-provider";
import { useRouter } from 'next/router';


export function NavItem({navItem, isWhite, subitemContent, children, active, onSelect, fixed}:any) {
    const [showSubItemContent, setShowSubItemContent] = useState('');
    const { connectors, isConnected, disconnect, connect, address, chain } =
      useContext(WalletConnectContext);

    const router = useRouter()

    const onSubItemHover = (hasContent: any, id: string) => {
        setShowSubItemContent('')
        if(!hasContent) return
        setShowSubItemContent(id)
    }

    const onSelectSubItem = (id:any) => {onSelect(id)}

    const handleBoxClick = () => {
      if (navItem?.path) {
        router.push(navItem.path)
      }

      return;
    }
    return (
      <Box key={navItem.id} color="dark.100" h="100%">
        <Popover trigger={'hover'}>
          <PopoverTrigger>
            <Box
              as="a"
              display="flex"
              cursor="pointer"
              alignItems="center"
              // href={navItem.path ?? null}
              onClick={handleBoxClick}
              fontSize={'sm'}
              h="100%"
              px="8px"
              fontWeight={active ? 500 : 400}
              color={isWhite || scrollY>0 && fixed  ? "dark.100" : "white"}
              onMouseEnter={() => setShowSubItemContent('')}
            >
                {children ? children : __(navItem.name)}
            </Box>
          </PopoverTrigger>
    
          {navItem.child && (
            <PopoverContent
              position="relative"
              border={0}
              mt="-8px"
              py={"0px"}
              rounded="0px 0px 2px 2px"
              w="280px"
            >
              <AbsoluteCenter w="100%" top="0">
                <Box bg="primary.100" w="40%" h="4px" m="auto"></Box>
              </AbsoluteCenter>
              <Box bg="white" zIndex="99" boxShadow={'md'}>
                {
                filterMenu(navItem?.child, isConnected)
                .map((child: any) => (
                  <Stack key={child.id}
                  onMouseEnter={() => onSubItemHover(child.hasContent, child.id)}
                  onMouseLeave={() => onSubItemHover(child.hasContent, child.id)}>
                    <SubNav {...child} onSelect={() => child.trigger ? onSelectSubItem(child.id) : null} />
                  </Stack>
                ))}
              </Box>
              
              <Box
                position="absolute"
                className="subitem-content-box"
                overflow="hidden"
                bg="white"
                w={showSubItemContent === '' ? "100px" : "280px"}
                opacity={showSubItemContent === '' ? 0 : 1}
                boxShadow={'md'}
                top="0"
                left={showSubItemContent === '' ? "230px" : "100%"}
                pl="2px"
                onMouseLeave={() => setShowSubItemContent('')}
                transition="all .1s ease-out"
              >
                <Box>
                  { showSubItemContent === '' ? null : subitemContent(showSubItemContent) }
                </Box>
              </Box>
    
            </PopoverContent>
            
          )}
        </Popover>
      </Box>
    )
};

const SubNav = ({ id, icon, name, path, subtitle, onSelect }: any) => {
  const onClickSubItem = () => {    
    onSelect()
  }
  return (
    <Box
      as="a"
      cursor="pointer"
      href={path}
      role={'group'}
      display={'flex'}
      p={"14px 24px"}
      onClick={()=> onClickSubItem()}
      _hover={{ bg: useColorModeValue('gray.10', 'white') }}>
      <Stack direction={'row'} align={'center'}
      w="100%"
      justifyContent="space-between">
        <Stack spacing="0">
          <Flex alignItems="center" gap="12px">
            { icon }
            <Text
              fontSize="16px"
              color="dark.100"
              transition={'all .3s ease'}>
              {__(name)}
            </Text>
          </Flex>
          {
            subtitle ? <Text color="gray.400" fontSize={'sm'} lineHeight="1" ml="36px">{__(subtitle)}</Text> : <></>
          }
          
        </Stack>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon w={5} h={5} as={ChevronRightIcon} color="dark.100"/>
        </Flex>
      </Stack>
    </Box>
  )
}
  
const filterMenu = (child: any, isConnected: boolean) => child
  .filter(({wallet}: {wallet: undefined | boolean}) =>
    typeof wallet === 'undefined' || wallet === isConnected)
