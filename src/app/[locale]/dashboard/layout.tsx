import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthProvider } from "@/components/dashboard/AuthProvider";
import { DashboardDataProvider } from "@/components/dashboard/DashboardDataProvider";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ToastProvider } from "@/components/dashboard/ToastProvider";
import type { Locale } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "Dashboard.Metadata" });

  return {
    title: { template: "%s — xosting.net", default: t("default") },
    // Shaxsiy kabinet qidiruv tizimlarida ko'rinmasligi kerak
    robots: { index: false, follow: false },
    alternates: null,
  };
}

export default async function DashboardLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <AuthProvider>
      <DashboardDataProvider>
        <ToastProvider>
          <DashboardShell>{children}</DashboardShell>
        </ToastProvider>
      </DashboardDataProvider>
    </AuthProvider>
  );
}
