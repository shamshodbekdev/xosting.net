import { defineRouting } from "next-intl/routing";

export const locales = ["uz", "uz-cyrl", "en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "uz",
  // O'zbekcha (lotin) sahifa prefikssiz ("/"), qolganlari: /uz-cyrl, /en, /ru
  localePrefix: "as-needed",
  // Standart til har doim o'zbekcha bo'lishi uchun brauzer tilini avtomatik aniqlamaymiz
  localeDetection: false,
});

/** Interfeysda ko'rsatiladigan til nomlari va qisqa belgilari */
export const localeLabels: Record<Locale, { short: string; name: string }> = {
  uz: { short: "UZ", name: "O'zbekcha" },
  "uz-cyrl": { short: "ЎЗ", name: "Ўзбекча" },
  en: { short: "EN", name: "English" },
  ru: { short: "RU", name: "Русский" },
};

/** <html lang> uchun to'g'ri BCP 47 kodlari */
export const htmlLang: Record<Locale, string> = {
  uz: "uz",
  "uz-cyrl": "uz-Cyrl",
  en: "en",
  ru: "ru",
};

/** Open Graph uchun locale kodlari */
export const ogLocale: Record<Locale, string> = {
  uz: "uz_UZ",
  "uz-cyrl": "uz_UZ",
  en: "en_US",
  ru: "ru_RU",
};
