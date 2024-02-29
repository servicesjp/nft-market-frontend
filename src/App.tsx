import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import UserInfoProvider from "@/modules/provider/user-info-provider";
import WalletProvider from "@/modules/provider/wallet-provider";
import { theme } from "@/modules/theme";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import type { AppProps } from "next/app";






const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  


  return 
    <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <CookiesProvider>
          <WalletProvider>
            <UserInfoProvider>
            <Component {...pageProps} />
            </UserInfoProvider>
          </WalletProvider>
        </CookiesProvider>
      </BrowserRouter>
    </ChakraProvider>
    </QueryClientProvider>
}
