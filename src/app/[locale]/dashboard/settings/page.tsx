import { setRequestLocale } from "next-intl/server";
import { SettingsView } from "@/components/dashboard/views/SettingsView";
import type { Locale } from "@/i18n/routing";
import { dashboardMetadata } from "@/lib/dashboard/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return dashboardMetadata(params, "settings");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <SettingsView />;
}
