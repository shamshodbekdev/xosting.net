"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { usePathname } from "@/i18n/navigation";
import { NotificationsMenu } from "./NotificationsMenu";
import { UserMenu } from "./UserMenu";
import { getActiveItem } from "./nav-items";

export function Topbar({ menuOpen, onOpenMenu }: { menuOpen: boolean; onOpenMenu: () => void }) {
  const t = useTranslations("Dashboard.Nav");
  const pathname = usePathname();
  const active = getActiveItem(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-background/75 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl">
      <div className="flex h-16 items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label={t("openMenu")}
          aria-expanded={menuOpen}
          aria-controls="dashboard-mobile-nav"
          className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
        >
          <Menu size={22} />
        </button>

        <p className="min-w-0 flex-1 truncate text-base font-semibold text-white">{t(active.key)}</p>

        <LanguageSwitcher />
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
}
