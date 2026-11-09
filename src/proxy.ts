import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // API, Next ichki yo'llari va statik fayllar (nuqta bor yo'llar) bundan mustasno
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
