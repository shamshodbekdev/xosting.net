"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, LogOut, Sparkles, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "./AuthProvider";
import { NAV_ITEMS, isActive } from "./nav-items";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("Dashboard.Nav");
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <div className="flex h-full flex-col px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] pt-6">
      <Link href="/dashboard" onClick={onNavigate} className="mb-8 inline-flex w-fit px-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-full.png" alt="xosting.net" className="h-8 w-auto object-contain" />
      </Link>

      <nav aria-label={t("label")} className="flex-1">
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ key, href, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <li key={key}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-primary-500/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {active && (
                    <span aria-hidden="true" className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-primary-400 to-accent-400" />
                  )}
                  <Icon size={18} className={cn("shrink-0", active ? "text-primary-400" : "text-gray-500 group-hover:text-gray-300")} />
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="relative mb-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-primary-600/20 via-white/[0.03] to-accent-500/10 p-4">
        <div aria-hidden="true" className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-500/30 blur-2xl" />
        <Sparkles size={18} className="relative mb-2 text-accent-400" />
        <p className="relative text-sm font-semibold text-white">{t("upgradeTitle")}</p>
        <p className="relative mt-1 text-xs leading-relaxed text-gray-400">{t("upgradeText")}</p>
        <Link
          href={{ pathname: "/", hash: "tariflar" }}
          onClick={onNavigate}
          className="relative mt-3 inline-flex text-xs font-semibold text-primary-400 transition-colors hover:text-primary-100"
        >
          {t("upgradeCta")} →
        </Link>
      </div>

      <div className="space-y-1 border-t border-white/5 pt-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft size={18} className="text-gray-500" />
          {t("backToSite")}
        </Link>
        <button
          type="button"
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={18} className="text-gray-500" />
          {t("logout")}
        </button>
      </div>
    </div>
  );
}

/** Katta ekranlar uchun doimiy yon panel */
export function DesktopSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/5 bg-surface/60 backdrop-blur-xl lg:block">
      <SidebarContent />
    </aside>
  );
}

/** Mobil va planshet uchun chiqib keluvchi menyu */
export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("Dashboard.Nav");

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            id="dashboard-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={t("label")}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 w-[min(20rem,86vw)] overflow-y-auto border-r border-white/10 bg-surface/95 pt-[env(safe-area-inset-top,0px)] shadow-2xl backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t("closeMenu")}
              className="absolute right-4 top-[calc(1.5rem+env(safe-area-inset-top,0px))] rounded-full bg-white/5 p-1.5 text-gray-400 transition-colors hover:text-white"
            >
              <X size={18} />
            </button>
            <SidebarContent onNavigate={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
