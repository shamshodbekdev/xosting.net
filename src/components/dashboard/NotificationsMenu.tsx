"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, BellOff, FileText, Globe, MessageSquare, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDismiss } from "@/hooks/useDismiss";
import { useDashboardFormat } from "@/lib/dashboard/format";
import type { NotificationKind } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";
import { useDashboardData } from "./DashboardDataProvider";

const icons: Record<NotificationKind, LucideIcon> = {
  invoice: FileText,
  ticket: MessageSquare,
  domain: Globe,
};

export function NotificationsMenu() {
  const t = useTranslations("Dashboard");
  const { notifications, markAllNotificationsRead } = useDashboardData();
  const { date } = useDashboardFormat();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={unread > 0 ? `${t("Topbar.notifications")} — ${t("Topbar.unread", { count: unread })}` : t("Topbar.notifications")}
        aria-expanded={open}
        aria-haspopup="true"
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-bold text-white ring-2 ring-background">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-x-4 top-[calc(4.5rem+env(safe-area-inset-top,0px))] z-50 origin-top overflow-hidden rounded-2xl border border-white/10 bg-surface/95 shadow-[0_0_40px_rgba(59,130,246,0.15)] backdrop-blur-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-96 sm:origin-top-right"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3">
              <p className="text-sm font-semibold text-white">{t("Topbar.notifications")}</p>
              {unread > 0 && (
                <button
                  type="button"
                  onClick={markAllNotificationsRead}
                  className="text-xs font-medium text-primary-400 transition-colors hover:text-primary-100"
                >
                  {t("Topbar.markAllRead")}
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-sm text-gray-400">
                <BellOff size={20} className="text-gray-500" />
                {t("Topbar.empty")}
              </div>
            ) : (
              <ul className="max-h-[60dvh] divide-y divide-white/5 overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = icons[notification.kind];
                  return (
                    <li key={notification.id} className={cn("flex gap-3 px-4 py-3.5", !notification.read && "bg-primary-500/[0.04]")}>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-primary-400">
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 text-sm font-medium text-white">
                          {t(`Notifications.${notification.kind}.title`)}
                          {!notification.read && <span className="h-1.5 w-1.5 rounded-full bg-primary-400" aria-hidden="true" />}
                        </p>
                        <p className="mt-0.5 text-sm text-gray-400">
                          {t(`Notifications.${notification.kind}.text`, notification.params)}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">{date(notification.createdAt)}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
