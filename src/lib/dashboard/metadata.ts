import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export type DashboardPage = "overview" | "services" | "domains" | "billing" | "support" | "settings";

/** Har bir panel sahifasi uchun tarjima qilingan sarlavha */
export async function dashboardMetadata(params: Promise<{ locale: string }>, page: DashboardPage): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "Dashboard.Metadata" });
  return { title: t(page) };
}
