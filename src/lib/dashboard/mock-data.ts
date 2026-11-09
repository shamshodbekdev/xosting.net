import { PANEL_URL } from "./config";
import type { Domain, Invoice, Notification, Service, Ticket, User } from "./types";

// Backend ulanguncha panel shu ma'lumotlar bilan ishlaydi.

export const mockUser: User = {
  name: "Shamshodbek",
  fullName: "Shamshodbek",
  email: "shamshodbek@xosting.net",
  phone: "+998 90 123 45 67",
};

export const mockServices: Service[] = [
  {
    id: "srv-1001",
    name: "Business Hosting",
    domain: "xosting.net",
    type: "hosting",
    status: "active",
    billingCycle: "monthly",
    price: 29000,
    nextDue: "2026-12-05",
    panelUrl: PANEL_URL,
    usage: { disk: { used: 5, total: 20 }, bandwidth: { used: 100, total: 500 } },
    specs: ["25% CPU", "512 MB RAM", "LiteSpeed"],
  },
  {
    id: "srv-1002",
    name: "Premium VPS",
    domain: "vps-01.xosting.net",
    type: "vps",
    status: "active",
    billingCycle: "yearly",
    price: 1490000,
    nextDue: "2027-03-14",
    panelUrl: PANEL_URL,
    usage: { disk: { used: 18, total: 80 }, bandwidth: { used: 420, total: 2000 } },
    specs: ["4 vCPU", "8 GB RAM", "Ubuntu 24.04"],
  },
];

export const mockDomains: Domain[] = [
  { name: "xosting.net", registeredAt: "2024-06-12", expiresAt: "2027-06-12", autoRenew: true },
  { name: "xosting.uz", registeredAt: "2025-11-28", expiresAt: "2026-11-28", autoRenew: false },
  { name: "myshop.uz", registeredAt: "2025-02-03", expiresAt: "2027-02-03", autoRenew: true },
  { name: "oldproject.com", registeredAt: "2023-10-01", expiresAt: "2026-10-01", autoRenew: false },
];

export const mockInvoices: Invoice[] = [
  {
    number: "INV-2026-0151",
    issuedAt: "2026-11-08",
    dueAt: "2026-11-28",
    amount: 45000,
    status: "pending",
    item: { kind: "domainRenewal", domain: "xosting.uz" },
  },
  {
    number: "INV-2026-0142",
    issuedAt: "2026-11-05",
    dueAt: "2026-11-15",
    amount: 29000,
    status: "pending",
    item: { kind: "service", name: "Business Hosting" },
  },
  {
    number: "INV-2026-0128",
    issuedAt: "2026-10-05",
    dueAt: "2026-10-15",
    amount: 29000,
    status: "paid",
    item: { kind: "service", name: "Business Hosting" },
  },
  {
    number: "INV-2026-0117",
    issuedAt: "2026-09-14",
    dueAt: "2026-09-24",
    amount: 89000,
    status: "paid",
    item: { kind: "domainRenewal", domain: "myshop.uz" },
  },
  {
    number: "INV-2026-0103",
    issuedAt: "2026-09-05",
    dueAt: "2026-09-15",
    amount: 29000,
    status: "paid",
    item: { kind: "service", name: "Business Hosting" },
  },
  {
    number: "INV-2026-0089",
    issuedAt: "2026-03-14",
    dueAt: "2026-03-24",
    amount: 1490000,
    status: "paid",
    item: { kind: "service", name: "Premium VPS" },
  },
];

export const mockTickets: Ticket[] = [
  { id: "2041", subjectKey: "ssl", department: "technical", priority: "high", status: "open", updatedAt: "2026-11-07" },
  { id: "2033", subjectKey: "payment", department: "billing", priority: "normal", status: "answered", updatedAt: "2026-11-02" },
  { id: "2019", subjectKey: "upgrade", department: "sales", priority: "low", status: "closed", updatedAt: "2026-10-18" },
  { id: "2004", subjectKey: "migration", department: "technical", priority: "normal", status: "closed", updatedAt: "2026-09-27" },
];

export const mockNotifications: Notification[] = [
  { id: "n-1", kind: "invoice", params: { number: "INV-2026-0151" }, createdAt: "2026-11-08", read: false },
  { id: "n-2", kind: "ticket", params: { id: "2033" }, createdAt: "2026-11-02", read: false },
  { id: "n-3", kind: "domain", params: { domain: "xosting.uz" }, createdAt: "2026-10-29", read: true },
];
