"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { DomainStatus, InvoiceStatus, ServiceStatus, TicketStatus } from "@/lib/dashboard/types";

export type Status = ServiceStatus | DomainStatus | InvoiceStatus | TicketStatus;

const styles: Record<Status, string> = {
  active: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/25",
  paid: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/25",
  answered: "bg-accent-500/10 text-accent-400 ring-accent-500/25",
  open: "bg-primary-500/10 text-primary-400 ring-primary-500/25",
  pending: "bg-amber-500/10 text-amber-300 ring-amber-500/25",
  expiringSoon: "bg-amber-500/10 text-amber-300 ring-amber-500/25",
  cancellationRequested: "bg-amber-500/10 text-amber-300 ring-amber-500/25",
  expired: "bg-red-500/10 text-red-300 ring-red-500/25",
  closed: "bg-white/5 text-gray-400 ring-white/10",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const t = useTranslations("Dashboard.Status");

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        styles[status],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {t(status)}
    </span>
  );
}
