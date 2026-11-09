import { setRequestLocale } from "next-intl/server";
import { DomainsView } from "@/components/dashboard/views/DomainsView";
import type { Locale } from "@/i18n/routing";
import { dashboardMetadata } from "@/lib/dashboard/metadata";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ add?: string }>;
};

export function generateMetadata({ params }: Props) {
  return dashboardMetadata(params, "domains");
}

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const { add } = await searchParams;

  return <DomainsView initialAddOpen={add === "1"} />;
}
