"use client";

import { useCallback, useState } from "react";
import { ArrowUpCircle, Ban, Cpu, ExternalLink, Server } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { useDashboardFormat } from "@/lib/dashboard/format";
import type { Service } from "@/lib/dashboard/types";
import { useDashboardData } from "../DashboardDataProvider";
import { useToast } from "../ToastProvider";
import { Card } from "../ui/Card";
import { EmptyState } from "../ui/EmptyState";
import { Modal } from "../ui/Modal";
import { PageHeader } from "../ui/PageHeader";
import { StatusBadge } from "../ui/StatusBadge";
import { UsageBar } from "../ui/UsageBar";

export function ServicesView() {
  const t = useTranslations("Dashboard.Services");
  const { services, cancelService } = useDashboardData();
  const toast = useToast();
  const [pendingCancel, setPendingCancel] = useState<Service | null>(null);
  const closeModal = useCallback(() => setPendingCancel(null), []);

  const confirmCancel = () => {
    if (!pendingCancel) return;
    cancelService(pendingCancel.id);
    toast(t("cancelSuccess", { name: pendingCancel.name }));
    setPendingCancel(null);
  };

  return (
    <>
      <PageHeader title={t("title")} description={t("subtitle")} />

      {services.length === 0 ? (
        <EmptyState icon={Server} text={t("empty")} />
      ) : (
        <div className="space-y-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onCancel={() => setPendingCancel(service)} />
          ))}
        </div>
      )}

      <Modal
        open={pendingCancel !== null}
        onClose={closeModal}
        title={t("cancelTitle")}
        description={pendingCancel ? t("cancelText", { name: pendingCancel.name }) : undefined}
        size="sm"
      >
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={closeModal}>
            {t("keep")}
          </Button>
          <Button
            onClick={confirmCancel}
            className="bg-none bg-red-500/90 shadow-red-500/20 hover:bg-red-500 hover:shadow-red-500/30"
          >
            {t("cancelConfirm")}
          </Button>
        </div>
      </Modal>
    </>
  );
}

function ServiceCard({ service, onCancel }: { service: Service; onCancel: () => void }) {
  const t = useTranslations("Dashboard.Services");
  const tc = useTranslations("Dashboard.Common");
  const { date, money } = useDashboardFormat();
  const Icon = service.type === "vps" ? Cpu : Server;
  const cancelled = service.status === "cancellationRequested";

  const details = [
    { label: t("billingCycle"), value: tc(service.billingCycle) },
    {
      label: t("price"),
      value: `${money(service.price)} / ${service.billingCycle === "monthly" ? tc("perMonth") : tc("perYear")}`,
    },
    { label: t("nextDue"), value: date(service.nextDue) },
  ];

  return (
    <Card as="article" aria-labelledby={`${service.id}-title`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600/30 to-accent-500/20 text-primary-400">
            <Icon size={22} />
          </span>
          <div className="min-w-0">
            <h2 id={`${service.id}-title`} className="truncate text-lg font-semibold text-white">
              {service.name}
            </h2>
            <p className="truncate text-sm text-gray-400">
              {t(`types.${service.type}`)} · {service.domain}
            </p>
          </div>
        </div>
        <StatusBadge status={service.status} className="self-start" />
      </div>

      <dl className="mt-6 grid gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:grid-cols-3">
        {details.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-wider text-gray-500">{label}</dt>
            <dd className="mt-1 font-medium text-white">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
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

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={t("specs")}>
        {service.specs.map((spec) => (
          <li key={spec} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-300">
            {spec}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3 border-t border-white/5 pt-5 sm:flex-row sm:items-center">
        <a
          href={service.panelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5 hover:shadow-primary-500/50"
        >
          <ExternalLink size={16} />
          {t("manage")}
          <span className="sr-only">({tc("newTab")})</span>
        </a>
        <Link
          href={{ pathname: "/", hash: "tariflar" }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          <ArrowUpCircle size={16} />
          {t("upgrade")}
        </Link>
        <button
          type="button"
          onClick={onCancel}
          disabled={cancelled}
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:pointer-events-none disabled:opacity-50 sm:ml-auto"
        >
          <Ban size={16} />
          {t("cancel")}
        </button>
      </div>
    </Card>
  );
}
