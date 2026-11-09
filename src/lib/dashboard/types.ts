export interface User {
  name: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface Usage {
  used: number;
  total: number;
}

export type ServiceType = "hosting" | "vps";
export type ServiceStatus = "active" | "cancellationRequested";
export type BillingCycle = "monthly" | "yearly";

export interface Service {
  id: string;
  name: string;
  domain: string;
  type: ServiceType;
  status: ServiceStatus;
  billingCycle: BillingCycle;
  price: number;
  nextDue: string;
  panelUrl: string;
  usage: { disk: Usage; bandwidth: Usage };
  specs: string[];
}

export interface Domain {
  name: string;
  registeredAt: string;
  expiresAt: string;
  autoRenew: boolean;
}

export type DomainStatus = "active" | "expiringSoon" | "expired";

export type InvoiceStatus = "paid" | "pending";
export type InvoiceItem =
  | { kind: "service"; name: string }
  | { kind: "domainRenewal"; domain: string };

export interface Invoice {
  number: string;
  issuedAt: string;
  dueAt: string;
  amount: number;
  status: InvoiceStatus;
  item: InvoiceItem;
}

export type TicketStatus = "open" | "answered" | "closed";
export type TicketDepartment = "technical" | "billing" | "sales";
export type TicketPriority = "low" | "normal" | "high";
/** Namunaviy murojaatlar mavzusi tarjima fayllaridan olinadi */
export type TicketSampleKey = "ssl" | "payment" | "upgrade" | "migration";

export interface Ticket {
  id: string;
  subject?: string;
  subjectKey?: TicketSampleKey;
  department: TicketDepartment;
  priority: TicketPriority;
  status: TicketStatus;
  updatedAt: string;
}

export type NotificationKind = "invoice" | "ticket" | "domain";

export interface Notification {
  id: string;
  kind: NotificationKind;
  params: Record<string, string>;
  createdAt: string;
  read: boolean;
}
