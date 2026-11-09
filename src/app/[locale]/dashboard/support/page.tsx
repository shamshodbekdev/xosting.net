import { setRequestLocale } from "next-intl/server";
import { SupportView } from "@/components/dashboard/views/SupportView";
import type { Locale } from "@/i18n/routing";
import { dashboardMetadata } from "@/lib/dashboard/metadata";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ new?: string }>;
};

export function generateMetadata({ params }: Props) {
  return dashboardMetadata(params, "support");
}

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const { new: openNew } = await searchParams;

  return <SupportView initialNewOpen={openNew === "1"} />;
}
