import "@/styles/globals.css";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { extendTheme, Spinner } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { theme } from "@/modules/theme";
import { Provider } from "jotai";
import { TranslationInit } from "@/helpers/language";
import {
  getCurrentLocaleOrUndefined,
  getDefaultLocale,
} from "@/modules/locale/locale";
import { ToastContainer } from "@/components/toast";
import MarketUserInfoProvider from "@/modules/provider/user-info-provider";
import TransitionLayout from "@/layouts/transition-layout";
import WalletProvider from "@/modules/provider/wallet-provider";
import { TicketsProvider } from "@/components/tickets";
import UserInfoProvider from "@/modules/provider/user-info-provider";
import { SocketProvider } from "@/modules/provider/websocket-provider";
import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";
import { useAccount } from "wagmi";
import useMarketAuth from "@/hooks/use-market-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useERC20 } from "@/hooks/useERC20";
import LoadingAnim from "@/components/loader/loading-anim";
const customTheme = extendTheme(theme);

const StartUp = () => {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [isLoadingToken, setLoadingToken] = useState<boolean>(false);
  const router = useRouter();
  const { initialGetTokens } = useERC20();
  useEffect(() => {
    setLoadingComplete(false);
    const currentLocale = getCurrentLocaleOrUndefined();
    try {
      TranslationInit.getLanguages().then(() => {
        if (router.locale && router.locale !== currentLocale) {
          TranslationInit.getTranslation(router.locale, true, true).then(() =>
            setLoadingComplete(true)
          );
        } else if (currentLocale) {
          TranslationInit.getTranslation(currentLocale, false, true).then(() =>
            setLoadingComplete(true)
          );
        } else {
          TranslationInit.getTranslation(getDefaultLocale(), true, true).then(
            () => setLoadingComplete(true)
          );
        }
      });
    } catch (e) {
      console.warn(e);
    }
  }, [router.locale]);
  useEffect(() => {
    (async () => {
      try {
        await initialGetTokens();
        setLoadingToken(true);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  return isLoadingComplete && isLoadingToken;
};

const Content = ({ children }: any) => {
  const { address, isConnected } = useAccount();
  const { loginMarket, logoutMarket, isAuthenticatedMarket } = useMarketAuth();

  useEffect(() => {
    if (address && isConnected && !isAuthenticatedMarket()) {
      loginMarket(address);
    }
    if (!address && !isConnected) {
      logoutMarket();
    }
  }, [address, isConnected]);

  return <>{children}</>;
};

const queryClient = new QueryClient();

function MetaTagsAndScripts() {
  return (
    <>
      <Head>
        <title>The Meteor NFT | The epicenter of Crypto Empowerment!</title>
        <meta
          name="description"
          content="Unlock the power of web3 technologies with Meteor. Dive into a unique crypto ecosystem offering innovative solutions, unmatched security, and a vision to revolutionize the blockchain world."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <meta
          name="keywords"
          content="Meteor Exchange, web3 technologies, cryptocurrency, blockchain solutions, NFTs, Launchpad, crypto security, Peruvian crypto enterprise"
        />
        <meta name="author" content="The Meteor Company"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" as="font" />
      </Head>
    </>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const isStartupComplete = StartUp();

  if (!isStartupComplete) {
    return <LoadingAnim />;
  } else {
    return (
      <>
        <MetaTagsAndScripts />
        <ChakraProvider theme={customTheme}>
          <QueryClientProvider client={queryClient}>
            <CookiesProvider>
              <TicketsProvider>
                <WalletProvider>
                  <MarketUserInfoProvider>
                    <Provider>
                      <UserInfoProvider>
                        <SocketProvider>
                          <ToastContainer />
                          <TransitionLayout>
                            {!isStartupComplete ? (
                              <LoadingAnim />
                            ) : (
                              <>
                                <PrivacyPolicyModal />
                                <Content>
                                  <Component {...pageProps} />
                                </Content>
                              </>
                            )}
                          </TransitionLayout>
                        </SocketProvider>
                      </UserInfoProvider>
                    </Provider>
                  </MarketUserInfoProvider>
                </WalletProvider>
              </TicketsProvider>
            </CookiesProvider>
          </QueryClientProvider>
        </ChakraProvider>
      </>
    );
  }
}
function getCurrentLocaleOrUndefiend() {
  throw new Error("Function not implemented.");
}
