"use client";

import { useState } from "react";
import { CalendarClock, CheckCircle2, Wallet, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDashboardFormat } from "@/lib/dashboard/format";
import type { InvoiceStatus } from "@/lib/dashboard/types";
import { useDashboardData } from "../DashboardDataProvider";
import { InvoiceTable } from "../InvoiceTable";
import { Card, CardHeader } from "../ui/Card";
import { PageHeader } from "../ui/PageHeader";
import { Segmented } from "../ui/Segmented";

type Filter = "all" | InvoiceStatus;

export function BillingView() {
  const t = useTranslations("Dashboard.Billing");
  const { invoices, services } = useDashboardData();
  const { date, money } = useDashboardFormat();
  const [filter, setFilter] = useState<Filter>("all");

  const currentYear = String(new Date().getFullYear());
  const pending = invoices.filter((i) => i.status === "pending");
  const balanceDue = pending.reduce((sum, i) => sum + i.amount, 0);
  const paidThisYear = invoices
    .filter((i) => i.status === "paid" && i.issuedAt.startsWith(currentYear))
    .reduce((sum, i) => sum + i.amount, 0);
  const nextService = services
    .filter((s) => s.status === "active")
    .sort((a, b) => a.nextDue.localeCompare(b.nextDue))[0];

  const summary: { label: string; value: string; hint?: string; icon: LucideIcon; tone: string }[] = [
    {
      label: t("balanceDue"),
      value: money(balanceDue),
      hint: t("pendingCount", { count: pending.length }),
      icon: Wallet,
      tone: "bg-amber-500/10 text-amber-300",
    },
    { label: t("paidThisYear"), value: money(paidThisYear), icon: CheckCircle2, tone: "bg-emerald-500/10 text-emerald-300" },
    {
      label: t("nextPayment"),
      value: nextService ? money(nextService.price) : "—",
      hint: nextService ? `${nextService.name} · ${date(nextService.nextDue)}` : t("noPayment"),
      icon: CalendarClock,
      tone: "bg-primary-500/10 text-primary-400",
    },
  ];

  const visible = filter === "all" ? invoices : invoices.filter((i) => i.status === filter);

  return (
    <>
      <PageHeader title={t("title")} description={t("subtitle")} />

      <ul className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summary.map(({ label, value, hint, icon: Icon, tone }) => (
          <li key={label} className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5 last:sm:col-span-2 last:lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                <Icon size={20} />
              </span>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
            <p className="mt-4 text-2xl font-bold tabular-nums text-white">{value}</p>
            {hint && <p className="mt-1 truncate text-sm text-gray-500">{hint}</p>}
          </li>
        ))}
      </ul>

      <Card aria-labelledby="invoices-title">
        <CardHeader
          id="invoices-title"
          title={t("invoices")}
          action={
            <Segmented
              label={t("filterLabel")}
              value={filter}
              onChange={setFilter}
              options={[
                { value: "all", label: t("filters.all"), count: invoices.length },
                { value: "paid", label: t("filters.paid"), count: invoices.filter((i) => i.status === "paid").length },
                { value: "pending", label: t("filters.pending"), count: pending.length },
              ]}
            />
          }
        />
        <InvoiceTable invoices={visible} downloadable caption={t("invoices")} />
      </Card>
    </>
  );
}
