import { routing } from "@/i18n/routing";
import messages from "../messages/uz.json";

// next-intl uchun tip xavfsizligi: noto'g'ri kalit yoki til kodi kompilyatsiya xatosini beradi
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
