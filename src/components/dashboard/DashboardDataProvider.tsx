"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  mockDomains,
  mockInvoices,
  mockNotifications,
  mockServices,
  mockTickets,
} from "@/lib/dashboard/mock-data";
import type { Domain, Invoice, Notification, Service, Ticket } from "@/lib/dashboard/types";

const DOMAIN_RENEWAL_PRICE = 45000;
const PAYMENT_TERM_DAYS = 10;

type NewTicket = Pick<Ticket, "subject" | "department" | "priority">;

interface DashboardDataValue {
  services: Service[];
  domains: Domain[];
  invoices: Invoice[];
  tickets: Ticket[];
  notifications: Notification[];
  cancelService: (id: string) => void;
  setAutoRenew: (domain: string, enabled: boolean) => void;
  renewDomain: (domain: string) => Invoice;
  addTicket: (ticket: NewTicket) => Ticket;
  markAllNotificationsRead: () => void;
}

const DashboardDataContext = createContext<DashboardDataValue | null>(null);

const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

function nextInvoiceNumber(invoices: Invoice[]) {
  const year = new Date().getFullYear();
  const max = Math.max(0, ...invoices.map((i) => Number(i.number.split("-").pop()) || 0));
  return `INV-${year}-${String(max + 1).padStart(4, "0")}`;
}

/**
 * Panel ma'lumotlari va ular ustidagi amallar. Barcha sahifalar bitta holatdan
 * foydalanadi, shuning uchun o'zgarishlar sahifalar orasida saqlanib qoladi.
 * Backend ulanganda amallar API so'rovlariga almashtiriladi.
 */
export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState(mockServices);
  const [domains, setDomains] = useState(mockDomains);
  const [invoices, setInvoices] = useState(mockInvoices);
  const [tickets, setTickets] = useState(mockTickets);
  const [notifications, setNotifications] = useState(mockNotifications);

  const cancelService = useCallback((id: string) => {
    setServices((list) => list.map((s) => (s.id === id ? { ...s, status: "cancellationRequested" } : s)));
  }, []);

  const setAutoRenew = useCallback((name: string, enabled: boolean) => {
    setDomains((list) => list.map((d) => (d.name === name ? { ...d, autoRenew: enabled } : d)));
  }, []);

  const renewDomain = useCallback(
    (domain: string) => {
      const today = new Date();
      const due = new Date(today.getTime() + PAYMENT_TERM_DAYS * 24 * 60 * 60 * 1000);
      const invoice: Invoice = {
        number: nextInvoiceNumber(invoices),
        issuedAt: toIsoDate(today),
        dueAt: toIsoDate(due),
        amount: DOMAIN_RENEWAL_PRICE,
        status: "pending",
        item: { kind: "domainRenewal", domain },
      };
      setInvoices((list) => [invoice, ...list]);
      return invoice;
    },
    [invoices]
  );

  const addTicket = useCallback(
    (data: NewTicket) => {
      const max = Math.max(0, ...tickets.map((t) => Number(t.id)));
      const ticket: Ticket = {
        ...data,
        id: String(max + 1),
        status: "open",
        updatedAt: toIsoDate(new Date()),
      };
      setTickets((list) => [ticket, ...list]);
      return ticket;
    },
    [tickets]
  );

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })));
  }, []);

  const value = useMemo(
    () => ({
      services,
      domains,
      invoices,
      tickets,
      notifications,
      cancelService,
      setAutoRenew,
      renewDomain,
      addTicket,
      markAllNotificationsRead,
    }),
    [services, domains, invoices, tickets, notifications, cancelService, setAutoRenew, renewDomain, addTicket, markAllNotificationsRead]
  );

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext);
  if (!context) throw new Error("useDashboardData faqat DashboardDataProvider ichida ishlatiladi");
  return context;
}
