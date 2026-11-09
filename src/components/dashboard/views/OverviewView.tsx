"use client";

import { ArrowRight, ExternalLink, Globe, LifeBuoy, PlusCircle, Server, Wallet, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PANEL_URL } from "@/lib/dashboard/config";
import { useDashboardFormat } from "@/lib/dashboard/format";
import { useAuth } from "../AuthProvider";
import { useDashboardData } from "../DashboardDataProvider";
import { InvoiceTable } from "../InvoiceTable";
import { Card, CardHeader } from "../ui/Card";
import { EmptyState } from "../ui/EmptyState";
import { StatusBadge } from "../ui/StatusBadge";
import { UsageBar } from "../ui/UsageBar";

const RECENT_INVOICES = 4;

export function OverviewView() {
  const t = useTranslations("Dashboard.Overview");
  const tc = useTranslations("Dashboard.Common");
  const { user } = useAuth();
  const { services, domains, invoices, tickets } = useDashboardData();
  const { money } = useDashboardFormat();

  const activeServices = services.filter((s) => s.status === "active");
  const hostingPlans = activeServices.filter((s) => s.type === "hosting");
  const balanceDue = invoices.filter((i) => i.status === "pending").reduce((sum, i) => sum + i.amount, 0);
  const openTickets = tickets.filter((ticket) => ticket.status !== "closed").length;

  const stats: { label: string; value: string; icon: LucideIcon; href: string }[] = [
    { label: t("stats.services"), value: String(activeServices.length), icon: Server, href: "/dashboard/services" },
    { label: t("stats.domains"), value: String(domains.length), icon: Globe, href: "/dashboard/domains" },
    { label: t("stats.balance"), value: money(balanceDue), icon: Wallet, href: "/dashboard/billing" },
    { label: t("stats.tickets"), value: String(openTickets), icon: LifeBuoy, href: "/dashboard/support" },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {t.rich("welcome", {
            name: user.name,
            highlight: (chunks) => <span className="text-gradient">{chunks}</span>,
          })}
        </h1>
        <p className="mt-2 text-sm text-gray-400 sm:text-base">{t("subtitle")}</p>
      </header>

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="group flex h-full flex-col justify-between gap-4 rounded-3xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:border-primary-500/30 sm:p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-colors group-hover:bg-primary-500/20">
                <Icon size={20} />
              </span>
              <span>
                <span className="block text-lg font-bold tabular-nums text-white sm:text-2xl">{value}</span>
                <span className="mt-1 block text-xs text-gray-400 sm:text-sm">{label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" aria-labelledby="active-services-title">
          <CardHeader
            id="active-services-title"
            title={t("activeServices")}
            description={t("activePlans", { count: hostingPlans.length })}
            action={
              <Link
                href="/dashboard/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-100"
              >
                {t("manageServices")}
                <ArrowRight size={16} />
              </Link>
            }
          />

          {hostingPlans.length === 0 ? (
            <EmptyState icon={Server} text={t("noHosting")} />
          ) : (
            <div className="space-y-5">
              {hostingPlans.map((service) => (
                <div key={service.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600/30 to-accent-500/20 text-primary-400">
                        <Server size={18} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white">{service.name}</p>
                        <p className="truncate text-sm text-gray-400">{service.domain}</p>
                      </div>
                    </div>
                    <StatusBadge status={service.status} />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <UsageBar
                      label={t("disk")}
                      used={service.usage.disk.used}
                      total={service.usage.disk.total}
                      valueText={tc("gb", { used: service.usage.disk.used, total: service.usage.disk.total })}
                    />
                    <UsageBar
                      label={t("bandwidth")}
                      used={service.usage.bandwidth.used}
                      total={service.usage.bandwidth.total}
                      valueText={tc("gb", { used: service.usage.bandwidth.used, total: service.usage.bandwidth.total })}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card aria-labelledby="quick-actions-title">
          <CardHeader id="quick-actions-title" title={t("quickActions")} />
          <div className="space-y-3">
            <QuickAction
              icon={PlusCircle}
              title={t("createSite")}
              text={t("createSiteText")}
              href={PANEL_URL}
              external
              externalLabel={tc("newTab")}
            />
            <QuickAction icon={Globe} title={t("addDomain")} text={t("addDomainText")} href="/dashboard/domains?add=1" />
            <QuickAction icon={LifeBuoy} title={t("contactSupport")} text={t("contactSupportText")} href="/dashboard/support?new=1" />
          </div>
        </Card>
      </div>

      <Card aria-labelledby="recent-invoices-title">
        <CardHeader
          id="recent-invoices-title"
          title={t("recentInvoices")}
          action={
            <Link
              href="/dashboard/billing"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-100"
            >
              {tc("viewAll")}
              <ArrowRight size={16} />
            </Link>
          }
        />
        <InvoiceTable invoices={invoices.slice(0, RECENT_INVOICES)} caption={t("recentInvoices")} />
      </Card>
    </div>
  );
}

interface QuickActionProps {
  icon: LucideIcon;
  title: string;
  text: string;
  href: string;
  external?: boolean;
  externalLabel?: string;
}

function QuickAction({ icon: Icon, title, text, href, external, externalLabel }: QuickActionProps) {
  const className =
    "group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-primary-500/30 hover:bg-primary-500/[0.06]";
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-500/20">
        <Icon size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-white">{title}</span>
        <span className="mt-0.5 block text-sm text-gray-400">{text}</span>
      </span>
      {external ? (
        <ExternalLink size={16} className="shrink-0 text-gray-500 transition-colors group-hover:text-white" />
      ) : (
        <ArrowRight size={16} className="shrink-0 text-gray-500 transition-all group-hover:translate-x-0.5 group-hover:text-white" />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
        <span className="sr-only">({externalLabel})</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
