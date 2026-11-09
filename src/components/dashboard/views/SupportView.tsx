"use client";

import { useCallback, useState } from "react";
import { LifeBuoy, MessageSquarePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useDashboardFormat } from "@/lib/dashboard/format";
import type { Ticket, TicketDepartment, TicketPriority } from "@/lib/dashboard/types";
import { useDashboardData } from "../DashboardDataProvider";
import { useToast } from "../ToastProvider";
import { Card } from "../ui/Card";
import { EmptyState } from "../ui/EmptyState";
import { Field, Select, TextArea, TextInput } from "../ui/FormControls";
import { Modal } from "../ui/Modal";
import { PageHeader } from "../ui/PageHeader";
import { Segmented } from "../ui/Segmented";
import { StatusBadge } from "../ui/StatusBadge";

type Filter = "all" | "open" | "closed";

const DEPARTMENTS: TicketDepartment[] = ["technical", "billing", "sales"];
const PRIORITIES: TicketPriority[] = ["low", "normal", "high"];
const MIN_SUBJECT = 5;
const MIN_MESSAGE = 20;

const priorityTone: Record<TicketPriority, string> = {
  low: "text-gray-400",
  normal: "text-primary-400",
  high: "text-amber-300",
};

export function SupportView({ initialNewOpen = false }: { initialNewOpen?: boolean }) {
  const t = useTranslations("Dashboard.Support");
  const { tickets } = useDashboardData();
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState<Filter>("all");
  const [formOpen, setFormOpen] = useState(initialNewOpen);

  const closeForm = useCallback(() => {
    setFormOpen(false);
    if (initialNewOpen) router.replace(pathname);
  }, [initialNewOpen, pathname, router]);

  const isClosed = (ticket: Ticket) => ticket.status === "closed";
  const openCount = tickets.filter((ticket) => !isClosed(ticket)).length;
  const visible = tickets.filter((ticket) =>
    filter === "all" ? true : filter === "closed" ? isClosed(ticket) : !isClosed(ticket)
  );

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        action={
          <Button onClick={() => setFormOpen(true)} className="w-full gap-2 sm:w-auto">
            <MessageSquarePlus size={18} />
            {t("newTicket")}
          </Button>
        }
      />

      <div className="mb-4">
        <Segmented
          label={t("filterLabel")}
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: t("filters.all"), count: tickets.length },
            { value: "open", label: t("filters.open"), count: openCount },
            { value: "closed", label: t("filters.closed"), count: tickets.length - openCount },
          ]}
        />
      </div>

      {visible.length === 0 ? (
        <EmptyState icon={LifeBuoy} text={t("empty")} />
      ) : (
        <Card className="p-0 sm:p-0">
          <ul className="divide-y divide-white/5">
            {visible.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} />
            ))}
          </ul>
        </Card>
      )}

      <NewTicketModal open={formOpen} onClose={closeForm} />
    </>
  );
}

function TicketRow({ ticket }: { ticket: Ticket }) {
  const t = useTranslations("Dashboard.Support");
  const { date } = useDashboardFormat();
  const subject = ticket.subjectKey ? t(`samples.${ticket.subjectKey}`) : ticket.subject;

  return (
    <li className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3 sm:block">
          <p className="font-medium text-white">{subject}</p>
          <StatusBadge status={ticket.status} className="sm:hidden" />
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
          <span className="font-mono text-gray-400">#{ticket.id}</span>
          <span aria-hidden="true">·</span>
          <span>{t(`departments.${ticket.department}`)}</span>
          <span aria-hidden="true">·</span>
          <span className={priorityTone[ticket.priority]}>
            {t("priority")}: {t(`priorities.${ticket.priority}`)}
          </span>
        </p>
      </div>
      <p className="text-sm text-gray-500 sm:w-36 sm:text-right">
        {t("updated")}: <span className="text-gray-300">{date(ticket.updatedAt)}</span>
      </p>
      <StatusBadge status={ticket.status} className="hidden sm:inline-flex" />
    </li>
  );
}

function NewTicketModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("Dashboard.Support");
  const { addTicket } = useDashboardData();
  const toast = useToast();
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState<TicketDepartment>("technical");
  const [priority, setPriority] = useState<TicketPriority>("normal");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ subject?: string; message?: string }>({});

  const close = () => {
    setSubject("");
    setDepartment("technical");
    setPriority("normal");
    setMessage("");
    setErrors({});
    onClose();
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = {
      subject: subject.trim().length < MIN_SUBJECT ? t("form.subjectError", { min: MIN_SUBJECT }) : undefined,
      message: message.trim().length < MIN_MESSAGE ? t("form.messageError", { min: MIN_MESSAGE }) : undefined,
    };
    setErrors(nextErrors);
    if (nextErrors.subject || nextErrors.message) return;

    const ticket = addTicket({ subject: subject.trim(), department, priority });
    toast(t("success", { id: ticket.id }));
    close();
  };

  return (
    <Modal open={open} onClose={close} title={t("form.title")} description={t("form.text")}>
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field id="ticket-subject" label={t("form.subject")} error={errors.subject}>
          <TextInput
            id="ticket-subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              if (errors.subject) setErrors((v) => ({ ...v, subject: undefined }));
            }}
            placeholder={t("form.subjectPlaceholder")}
            maxLength={120}
            error={errors.subject}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="ticket-department" label={t("form.department")}>
            <Select id="ticket-department" value={department} onChange={(e) => setDepartment(e.target.value as TicketDepartment)}>
              {DEPARTMENTS.map((value) => (
                <option key={value} value={value}>
                  {t(`departments.${value}`)}
                </option>
              ))}
            </Select>
          </Field>
          <Field id="ticket-priority" label={t("form.priority")}>
            <Select id="ticket-priority" value={priority} onChange={(e) => setPriority(e.target.value as TicketPriority)}>
              {PRIORITIES.map((value) => (
                <option key={value} value={value}>
                  {t(`priorities.${value}`)}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Field id="ticket-message" label={t("form.message")} error={errors.message}>
          <TextArea
            id="ticket-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((v) => ({ ...v, message: undefined }));
            }}
            placeholder={t("form.messagePlaceholder")}
            rows={5}
            maxLength={2000}
            error={errors.message}
          />
        </Field>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={close}>
            {t("form.cancel")}
          </Button>
          <Button type="submit">{t("form.submit")}</Button>
        </div>
      </form>
    </Modal>
  );
}
