"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { DesktopSidebar, MobileSidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Dashboard.Nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="relative min-h-dvh bg-background lg:pl-72">
      <a
        href="#dashboard-content"
        className="sr-only z-[90] rounded-full bg-white px-4 py-2 text-sm font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("skipToContent")}
      </a>

      {/* Yumshoq fon nurlari */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-aurora absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-primary-600/10 blur-[120px]" />
        <div
          className="animate-aurora absolute bottom-[-20%] left-[20%] h-[24rem] w-[24rem] rounded-full bg-accent-500/[0.07] blur-[120px]"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <DesktopSidebar />
      <MobileSidebar open={menuOpen} onClose={closeMenu} />

      <div className="relative flex min-h-dvh flex-col">
        <Topbar menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
        <main id="dashboard-content" tabIndex={-1} className="flex-1 px-4 py-6 focus:outline-none sm:px-6 sm:py-8 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
