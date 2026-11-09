import { DOMAIN_EXPIRY_WARNING_DAYS } from "./config";
import type { DomainStatus } from "./types";

const DAY_MS = 24 * 60 * 60 * 1000;

export function getDomainStatus(expiresAt: string, now: Date = new Date()): { status: DomainStatus; daysLeft: number } {
  const daysLeft = Math.ceil((new Date(expiresAt).getTime() - now.getTime()) / DAY_MS);

  if (daysLeft < 0) return { status: "expired", daysLeft };
  if (daysLeft <= DOMAIN_EXPIRY_WARNING_DAYS) return { status: "expiringSoon", daysLeft };
  return { status: "active", daysLeft };
}
