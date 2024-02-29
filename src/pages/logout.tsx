import useResponsive from "@/hooks/useResponsive";
import { Box, Center, Flex, Image, Text, useTheme, Button } from "@chakra-ui/react";
import { SolidLogo } from "@/assets/logo/solid";
import { useRouter } from "next/router";
import { __ } from "@/helpers/common";
export default function Logout() {
  const { isMobile, isTablet } = useResponsive();
  const theme = useTheme();
  const gradientColor = theme.colors.gradient;
  const router = useRouter();
  return (
    <Flex
    minHeight={"100vh"}
    bg={"white.100"}
    flexDir={'column'}
    {...(isMobile?{paddingX: "24px",paddingTop:"24px" }: {paddingX: "10%", paddingTop:"24px"})}
    gap={'72px'}
    w={"100%"}
    >
      <Box
         display={'flex'}
         width={"100%"}
         justifyContent={isMobile? 'center':'start'}
        
      >
        <SolidLogo isWhite={true} />
      </Box>

      {/* iconos */}
      <Image

        position={'absolute'}
        top={'20%'}
        left={isMobile ? '65%': '75%'}
        zIndex={1}
        w={isMobile ? '105px' : '211px'}
        src={"/images/triangles_horizontal.png"}
        alt="Triangles horizontal"
      />

      <Image
        position={'absolute'}
        top={'75.6%'}
        left={'85%'}
        h={isMobile ? '72px' : '144px'}
        zIndex={1}
        src={"/images/circles.png"}
        alt="circles"
      />

      {
        !isMobile && 
        <Image
          position={'absolute'}
          top={'75.6%'}
          left={'10%'}
          zIndex={1}
          src={"/images/two-squares.png"}
          alt="two squares"
        />
      }

      <Image
        position={'absolute'}
        top={'18%'}
        left={'10%'}
        w={isMobile ? '66px' : '100px'}
        zIndex={1}
        src={"/images/lines.png"}
        alt="lines"
      />
      <Center
        flexDir={'column'}
        w={'80%'}
        h={'80%'}
        alignSelf={'center'}
        bg={'#FCFDFF'}
        padding={'12px'}
        borderRadius={'4px'}
      >
        <Box
          display={'flex'}
          flexDir={'column'}
          justifyContent={'center'}
          gap={'16px'}
          mb={'34px'}
          >
          <Text
            w={"100%"}
            fontSize={"40px"}
            fontWeight={"500"}
            lineHeight={"120%"}
            textAlign={"center"}
            >
            {__('goodbye') +''+ '!'}{" "}
            {/* <Text as={"span"} bgGradient={gradientColor} bgClip="text">
              Bye!
            </Text> */}
          </Text>
          <Text
            fontSize={"14px"}
            fontWeight={"400"}
            lineHeight={"140%"}
            textAlign={"center"}
          >
            {__('s_thank_using_met')}
          </Text>
        </Box>
       
        <Box width={isMobile ? '100%' : '232px'}>
        <Button
          onClick={()=>{ router.push("/")}}
        >
          {__('s_return_top_page')}
        </Button>
        </Box>

        <Box width={"100%"} display={"flex"} justifyContent={"center"}  >
          <Image
            height={"40vh"}
            zIndex={1}
            src={"/images/logout_img.png"}
            alt={"LogOut image"}
          />
        </Box>
      </Center>
    </Flex>
  );
}















// import { PageCard } from "@/components/page-card";
// import { PageTitle } from "@/components/page-title";
// import { __ } from "@/helpers/common";
// import { useLogout } from "@/modules/auth/use-logout";
// import { MenuLessLayout } from "@/modules/layout/menu-less-layout";
// import OnboardingDecoration from "@/modules/onboarding/onboarding-decoration";
// import { Box, Link, Text, VStack } from "@chakra-ui/react";
// import NextLink from "next/link";
// import { useEffect } from "react";

// export default function Logout() {
//   const logout = useLogout();
//   useEffect(() => {
//     logout();
//   }, [logout]);

//   return (
//     <MenuLessLayout
//       header={
//         <Link href="/login" as={NextLink}>
//           {__('sign_in')}
//         </Link>
//       }
//     >
//       <Box
//         display={"flex"}
//         alignItems={"center"}
//         justifyContent={"space-between"}
//         width={"100%"}
//       >
//         <PageCard>
//           <VStack alignItems={"start"} gap={8}>
//             <PageTitle highlight="">{__('goodbye') +''+ '!'}</PageTitle>
//             <Text>
//                 {__('s_thank_using_met')}
//             </Text>
//             <Link as={NextLink} href="/">
//               {__('s_return_top_page')}
//             </Link>
//           </VStack>
//         </PageCard>
//         <OnboardingDecoration />
//       </Box>
//     </MenuLessLayout>
//   );
// }
