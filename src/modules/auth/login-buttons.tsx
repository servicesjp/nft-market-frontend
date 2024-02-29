import { __ } from '@/helpers/common'
import { isLoggedInAtom } from '@/modules/auth/auth-state'
import { HStack, Button } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useRouter } from "next/router";
import { getLoginUrlWithRedirect } from '../login-redirect/login-redirect-service'

export default function LoginButtons() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();
  if (isLoggedIn) {
    return <></>;
  }

  return (
    <HStack
      justifyContent={"start"}
      width={"100%"}
      gap={["16px", "24px"]}
      mb="10px"
    >
      <Button
        width={["100%", "136px"]}
        onClick={() => {
          router.push(getLoginUrlWithRedirect(router.asPath));
        }}
      >
        {__("login")}
      </Button>
    </HStack>
  );
}