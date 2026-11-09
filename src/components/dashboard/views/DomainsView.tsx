"use client";

import { useCallback, useState } from "react";
import { Globe, Plus, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getDomainStatus } from "@/lib/dashboard/domain-status";
import { useDashboardFormat } from "@/lib/dashboard/format";
import type { Domain } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";
import { useDashboardData } from "../DashboardDataProvider";
import { useToast } from "../ToastProvider";
import { Card } from "../ui/Card";
import { EmptyState } from "../ui/EmptyState";
import { Field, TextInput } from "../ui/FormControls";
import { Modal } from "../ui/Modal";
import { PageHeader } from "../ui/PageHeader";
import { StatusBadge } from "../ui/StatusBadge";
import { Switch } from "../ui/Switch";

const DOMAIN_PATTERN = /^(?=.{4,253}$)(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})*\.[a-z]{2,}$/i;

export function DomainsView({ initialAddOpen = false }: { initialAddOpen?: boolean }) {
  const t = useTranslations("Dashboard.Domains");
  const { domains, setAutoRenew, renewDomain } = useDashboardData();
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [addOpen, setAddOpen] = useState(initialAddOpen);

  const closeAdd = useCallback(() => {
    setAddOpen(false);
    // "?add=1" orqali ochilgan bo'lsa, manzilni tozalaymiz
    if (initialAddOpen) router.replace(pathname);
  }, [initialAddOpen, pathname, router]);

  const toggleAutoRenew = (domain: Domain, enabled: boolean) => {
    setAutoRenew(domain.name, enabled);
    toast(t(enabled ? "autoRenewOn" : "autoRenewOff", { domain: domain.name }));
  };

  const renew = (domain: Domain) => {
    const invoice = renewDomain(domain.name);
    toast(t("renewSuccess", { domain: domain.name, number: invoice.number }));
  };

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        action={
          <Button onClick={() => setAddOpen(true)} className="w-full gap-2 sm:w-auto">
            <Plus size={18} />
            {t("add")}
          </Button>
        }
      />

      {domains.length === 0 ? (
        <EmptyState icon={Globe} text={t("empty")} />
      ) : (
        <Card className="p-0 sm:p-0">
          <ul className="divide-y divide-white/5">
            {domains.map((domain) => (
              <DomainRow
                key={domain.name}
                domain={domain}
                onToggleAutoRenew={(enabled) => toggleAutoRenew(domain, enabled)}
                onRenew={() => renew(domain)}
              />
            ))}
          </ul>
        </Card>
      )}

      <AddDomainModal open={addOpen} onClose={closeAdd} />
    </>
  );
}

function DomainRow({
  domain,
  onToggleAutoRenew,
  onRenew,
}: {
  domain: Domain;
  onToggleAutoRenew: (enabled: boolean) => void;
  onRenew: () => void;
}) {
  const t = useTranslations("Dashboard.Domains");
  const { date } = useDashboardFormat();
  const { status, daysLeft } = getDomainStatus(domain.expiresAt);
  const switchId = `auto-renew-${domain.name.replace(/\W/g, "-")}`;

  return (
    <li className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
          <Globe size={20} />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-semibold text-white">{domain.name}</p>
            <StatusBadge status={status} />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {t("registered")}: {date(domain.registeredAt)}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-8">
        <div>
          <dt className="text-xs uppercase tracking-wider text-gray-500">{t("expires")}</dt>
          <dd className="mt-1 whitespace-nowrap font-medium text-white">{date(domain.expiresAt)}</dd>
          <dd className={cn("text-xs", status === "active" ? "text-gray-500" : status === "expired" ? "text-red-300" : "text-amber-300")}>
            {status === "expired" ? t("expiredText") : t("daysLeft", { days: daysLeft })}
          </dd>
        </div>
        <div>
          <dt className="mb-1.5 text-xs uppercase tracking-wider text-gray-500">
            <label htmlFor={switchId}>{t("autoRenew")}</label>
          </dt>
          <dd>
            <Switch
              id={switchId}
              checked={domain.autoRenew}
              onChange={onToggleAutoRenew}
              label={`${t("autoRenew")}: ${domain.name}`}
              hideLabel
            />
          </dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onRenew}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-white"
      >
        <RefreshCw size={16} />
        {t("renew")}
        <span className="sr-only">{domain.name}</span>
      </button>
    </li>
  );
}

function AddDomainModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("Dashboard.Domains");
  const toast = useToast();
  const [name, setName] = useState("");
  const [action, setAction] = useState<"register" | "transfer">("register");
  const [error, setError] = useState<string>();

  const close = () => {
    setName("");
    setAction("register");
    setError(undefined);
    onClose();
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const domain = name.trim().toLowerCase();
    if (!DOMAIN_PATTERN.test(domain)) {
      setError(t("domainError"));
      return;
    }
    toast(t(action === "register" ? "registerSuccess" : "transferSuccess", { domain }));
    close();
  };

  return (
    <Modal open={open} onClose={close} title={t("addTitle")} description={t("addText")}>
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field id="domain-name" label={t("domainLabel")} error={error}>
          <TextInput
            id="domain-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(undefined);
            }}
            placeholder={t("domainPlaceholder")}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            inputMode="url"
            error={error}
          />
        </Field>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-gray-300">{t("actionLabel")}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["register", "transfer"] as const).map((value) => (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-colors",
                  action === value ? "border-primary-500/50 bg-primary-500/10 text-white" : "border-white/10 text-gray-400 hover:text-white"
                )}
              >
                <input
                  type="radio"
                  name="domain-action"
                  value={value}
                  checked={action === value}
                  onChange={() => setAction(value)}
                  className="h-4 w-4 accent-primary-500"
                />
                {t(value)}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={close}>
            {t("cancel")}
          </Button>
          <Button type="submit">{t("addSubmit")}</Button>
        </div>
      </form>
    </Modal>
  );
}
