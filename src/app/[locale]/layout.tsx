import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { htmlLang, locales, ogLocale, routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  // Kirill (o'zbek va rus) matnlari uchun kirill to'plamlari ham kerak
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

const SITE_URL = "https://xosting.net";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const pathFor = (l: string) => (l === routing.defaultLocale ? "/" : `/${l}`);

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
    icons: {
      icon: "/logo.png",
    },
    alternates: {
      canonical: pathFor(locale),
      languages: {
        ...Object.fromEntries(locales.map((l) => [htmlLang[l], pathFor(l)])),
        "x-default": pathFor(routing.defaultLocale),
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${SITE_URL}${pathFor(locale)}`,
      siteName: "xosting.net",
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Statik renderlashni yoqish uchun
  setRequestLocale(locale);

  return (
    <html lang={htmlLang[locale]} className={`${inter.variable} scroll-smooth`}>
      <body className="bg-background text-white antialiased selection:bg-primary-500/30">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
