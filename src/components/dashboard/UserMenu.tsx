"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LifeBuoy, LogOut, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useDismiss } from "@/hooks/useDismiss";
import { cn } from "@/lib/utils";
import { useAuth } from "./AuthProvider";
import { Avatar } from "./Avatar";

export function UserMenu() {
  const t = useTranslations("Dashboard.Topbar");
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  const itemClass =
    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("userMenu")}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-1 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 sm:pr-3"
      >
        <Avatar name={user.fullName} />
        <span className="hidden max-w-32 truncate text-sm font-medium text-white sm:block">{user.name}</span>
        <ChevronDown size={14} className={cn("hidden text-gray-400 transition-transform sm:block", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full z-50 mt-3 w-64 max-w-[calc(100vw-2rem)] origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-1.5 shadow-[0_0_40px_rgba(59,130,246,0.15)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/5 px-3 pb-3 pt-2">
              <Avatar name={user.fullName} className="h-10 w-10" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{user.fullName}</p>
                <p className="truncate text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="pt-1.5">
              <Link href="/dashboard/settings" onClick={close} className={itemClass}>
                <Settings size={16} className="text-gray-500" />
                {t("settings")}
              </Link>
              <Link href="/dashboard/support" onClick={close} className={itemClass}>
                <LifeBuoy size={16} className="text-gray-500" />
                {t("support")}
              </Link>
              <button type="button" onClick={signOut} className={cn(itemClass, "hover:bg-red-500/10 hover:text-red-300")}>
                <LogOut size={16} className="text-gray-500" />
                {t("logout")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
