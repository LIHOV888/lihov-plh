import type { SupportedLocale } from "@/config/business";
import { en } from "./en";
import { km } from "./km";
import type { SiteDictionary } from "./types";

export const dictionaries: Record<SupportedLocale, SiteDictionary> = {
  en,
  km,
};

export function getDictionary(locale: SupportedLocale): SiteDictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
