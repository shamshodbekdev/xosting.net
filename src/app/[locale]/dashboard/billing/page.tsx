import { setRequestLocale } from "next-intl/server";
import { BillingView } from "@/components/dashboard/views/BillingView";
import type { Locale } from "@/i18n/routing";
import { dashboardMetadata } from "@/lib/dashboard/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return dashboardMetadata(params, "billing");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <BillingView />;
}
