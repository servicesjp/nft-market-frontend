import { __ } from "@/helpers/common";
import { 
  Avatar,
  Container, 
  Flex, 
  HStack, 
  Text,
  Heading,
  Stack,
  Link,
} from "@chakra-ui/react";

import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

interface PublicUserInfoCardProps {
  nftUser: any;
}

const socialMediaLinks = [
  { name: 'Facebook', icon: FaFacebook, url: 'https://facebook.com' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com' },
  { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
];

export function PublicInfoBanner({ nftUser }: PublicUserInfoCardProps) {
  return (

      <Flex
        w="100%"
        minH="256px"
        overflow="hidden"
        bgImage={`url('${ImgMockUrl}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgAttachment="scroll"
        position="relative"
        align="center"
        _after ={{
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(1,6,12,0.2) 43%, rgba(1,6,12,0.85) 100%)`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <Container maxW='container.xl' zIndex="2">
          <HStack
            color="white"
            spacing="32px"
          >
            <Flex 
              borderRadius="full" 
              boxSize="156px"
              backdropFilter="blur(10px)" 
              bg="whiteAlpha.200"
            >
              <Avatar boxSize="132px" name="avatar" src={nftUser?.avatarUrl} margin="auto" />
            </Flex>


            <Stack
              spacing="6px"
            >
              <Heading
                fontSize="24px"
                fontWeight="medium"
                textTransform={"capitalize"}
                as="h3"
              >
                {`${nftUser?.username}`}
              </Heading>

              <Text fontSize="14px" textAlign="justify" minH={"21px"}>
                {nftUser?.bio !== "undefined" && nftUser?.bio !== ""
                  ? nftUser?.bio
                  :
                  __('not_about_info_user')
                }
              </Text>

              <HStack>
                {socialMediaLinks.map((social, index) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    isExternal
                    ml={index !== 0 ? 4 : 0} // Solo añade margen si no es el primer ícono
                    p="2.5"
                    borderRadius="full"
                    bg="whiteAlpha.300"
                    backdropFilter="blur(10px)"
                  >
                    <social.icon color="white" size="20px" />
                  </Link>
                ))}
              </HStack>
            </Stack>

            
          </HStack>
        </Container>
      </Flex>
  )
}

const ImgMockUrl = 'https://plus.unsplash.com/premium_photo-1682091872078-46c5ed6a006d?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'