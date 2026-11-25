"use client";

import React, { createContext, useContext, useEffect } from "react";
import type { SupportedLocale } from "@/config/business";
import { getDictionary } from "@/content";
import type { SiteDictionary } from "@/content/types";

interface SiteContextValue {
  locale: SupportedLocale;
  dict: SiteDictionary;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProviders({ children }: { children: React.ReactNode }) {
  const locale: SupportedLocale = "en";

  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.classList.remove("dark");
    try {
      window.localStorage.removeItem("lihov_locale");
      window.localStorage.removeItem("lihov_theme");
    } catch {
      // Ignore storage access errors in restricted privacy modes
    }
  }, []);

  const dict = getDictionary(locale);

  return (
    <SiteContext.Provider value={{ locale, dict }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error("useSite must be used inside SiteProviders");
  }
  return ctx;
}
