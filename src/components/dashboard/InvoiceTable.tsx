"use client";

import { Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDashboardFormat } from "@/lib/dashboard/format";
import { downloadInvoicePdf } from "@/lib/dashboard/invoice-pdf";
import type { Invoice } from "@/lib/dashboard/types";
import { useAuth } from "./AuthProvider";
import { EmptyState } from "./ui/EmptyState";
import { StatusBadge } from "./ui/StatusBadge";

interface InvoiceTableProps {
  invoices: Invoice[];
  /** PDF yuklab olish tugmasini ko'rsatish */
  downloadable?: boolean;
  caption: string;
}

export function InvoiceTable({ invoices, downloadable = false, caption }: InvoiceTableProps) {
  const t = useTranslations("Dashboard.Billing");
  const { user } = useAuth();
  const { date, money } = useDashboardFormat();

  if (invoices.length === 0) return <EmptyState icon={FileText} text={t("empty")} />;

  const describe = (invoice: Invoice) =>
    invoice.item.kind === "service"
      ? invoice.item.name
      : t("domainRenewal", { domain: invoice.item.domain });

  const download = (invoice: Invoice) => downloadInvoicePdf(invoice, user);

  return (
    <>
      {/* Planshet va kompyuter: jadval */}
      <div className="-mx-5 hidden overflow-x-auto sm:-mx-6 md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-gray-500">
              <th scope="col" className="px-5 pb-3 font-medium sm:px-6">{t("number")}</th>
              <th scope="col" className="px-3 pb-3 font-medium">{t("description")}</th>
              <th scope="col" className="px-3 pb-3 font-medium">{t("date")}</th>
              <th scope="col" className="px-3 pb-3 font-medium">{t("dueDate")}</th>
              <th scope="col" className="px-3 pb-3 text-right font-medium">{t("amount")}</th>
              <th scope="col" className="px-3 pb-3 font-medium">{t("status")}</th>
              {downloadable && (
                <th scope="col" className="px-5 pb-3 text-right font-medium sm:px-6">
                  <span className="sr-only">{t("download")}</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {invoices.map((invoice) => (
              <tr key={invoice.number} className="transition-colors hover:bg-white/[0.02]">
                <td className="whitespace-nowrap px-5 py-4 font-medium text-white sm:px-6">{invoice.number}</td>
                <td className="px-3 py-4 text-gray-300">{describe(invoice)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-gray-400">{date(invoice.issuedAt)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-gray-400">{date(invoice.dueAt)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-right font-medium tabular-nums text-white">{money(invoice.amount)}</td>
                <td className="px-3 py-4"><StatusBadge status={invoice.status} /></td>
                {downloadable && (
                  <td className="px-5 py-4 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => download(invoice)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-white"
                    >
                      <Download size={14} />
                      {t("downloadShort")}
                      <span className="sr-only">— {invoice.number}</span>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobil: kartalar */}
      <ul className="space-y-3 md:hidden" aria-label={caption}>
        {invoices.map((invoice) => (
          <li key={invoice.number} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-white">{invoice.number}</p>
                <p className="mt-0.5 truncate text-sm text-gray-400">{describe(invoice)}</p>
              </div>
              <StatusBadge status={invoice.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-gray-500">{t("date")}</dt>
                <dd className="mt-0.5 text-gray-300">{date(invoice.issuedAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">{t("amount")}</dt>
                <dd className="mt-0.5 font-medium tabular-nums text-white">{money(invoice.amount)}</dd>
              </div>
            </dl>
            {downloadable && (
              <button
                type="button"
                onClick={() => download(invoice)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Download size={16} />
                {t("download")}
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
