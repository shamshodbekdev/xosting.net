"use client";

import { useFormatter, useTranslations } from "next-intl";

/** Panel bo'ylab sana va summalarni joriy tilga mos formatlash */
export function useDashboardFormat() {
  const format = useFormatter();
  const t = useTranslations("Dashboard.Common");

  return {
    date: (iso: string) =>
      format.dateTime(new Date(iso), { day: "numeric", month: "short", year: "numeric" }),
    money: (amount: number) => `${format.number(amount)} ${t("currency")}`,
  };
}
