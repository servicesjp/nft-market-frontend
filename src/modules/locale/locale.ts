import { atom } from "jotai";
import { GetServerSidePropsContext } from "next/types";

export const defaultLocale = "en";

export function getLangCookie(): string | null {
  if (typeof window === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${"Clang"}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export function setLangCookie(value: string, days: number = 365) {
  if (typeof window === "undefined") return;

  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  // Extract the domain from the current URL
  let domain = window.location.hostname;

  // If it's not localhost, format it for cookie domain (e.g., .themeteor.io)
  if (domain !== "localhost") {
    domain = `.${domain.split(".").slice(-2).join(".")}`; // This will handle both "themeteor.io" and "nft-dev.themeteor.io"
  } else {
    domain = ""; // For localhost, we don't set the domain attribute
  }

  document.cookie = `${"Clang"}=${value}; expires=${expires}; path=/; domain=${domain};`;
}

export const languageAtom = atom(
  getLangCookie() || undefined,
  (get, set, newLanguage: string) => {
    setLangCookie(newLanguage);
    set(languageAtom, newLanguage);
  }
);

export function getCurrentLocale() {
  return getLangCookie() || defaultLocale;
}

export function getCurrentLocaleOrUndefined() {
  return getLangCookie() || undefined;
}

export function getDefaultLocale() {
  return defaultLocale;
}

export function getContextLocale(context: GetServerSidePropsContext) {
  return context.locale || defaultLocale;
}
