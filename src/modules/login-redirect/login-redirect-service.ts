import { NextRouter } from "next/router"
import { getCurrentLocale } from "../locale/locale";
import { domainsConfig } from "@/config";

const REDIRECT_STORAGE_KEY = "redirectUrl";

/**
 * Returns the login url with the redirect url encoded as a query parameter.
 * @param redirectUrl The url to redirect to after login.
 * @returns The login url with the redirect url encoded as a query parameter.
 * @example
 * ```
 * const loginUrl = getLoginUrlWithRedirect(router.asPath);
 * ```
 */
export function getLoginUrlWithRedirect(redirectUrl: string): string {
  let locale = getCurrentLocale();
  let url = domainsConfig.urlMeteor;
  if (locale !== "en") {
    url = `${url}/${locale}`;
  }
  return `${url}/login?redirectUrl=${encodeURIComponent(
    `${domainsConfig.urlNFT}${redirectUrl}`
  )}`;
}

export function saveRedirectUrl() {
  const params = new URLSearchParams(window.location.search)
  // console.log({ params })
  if (params.get('redirectUrl')) {
    const redirectUrl = params.get('redirectUrl') as string
    // console.log('saving redirect url: ' + redirectUrl)
    localStorage.setItem(REDIRECT_STORAGE_KEY, redirectUrl)
  }
}

export function pushLoginCompletedNavigation(router: NextRouter) {
  const savedUrl = localStorage.getItem(REDIRECT_STORAGE_KEY)
  if (savedUrl) {
    localStorage.removeItem(REDIRECT_STORAGE_KEY)
    router.push(savedUrl)
  } else {
    router.push('/')
  }
}