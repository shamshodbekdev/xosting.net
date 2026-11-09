import { Globe, LayoutDashboard, LifeBuoy, Receipt, Server, Settings, type LucideIcon } from "lucide-react";

export type NavKey = "overview" | "services" | "domains" | "billing" | "support" | "settings";

export interface NavItem {
  key: NavKey;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { key: "overview", href: "/dashboard", icon: LayoutDashboard },
  { key: "services", href: "/dashboard/services", icon: Server },
  { key: "domains", href: "/dashboard/domains", icon: Globe },
  { key: "billing", href: "/dashboard/billing", icon: Receipt },
  { key: "support", href: "/dashboard/support", icon: LifeBuoy },
  { key: "settings", href: "/dashboard/settings", icon: Settings },
];

export function isActive(pathname: string, href: string) {
  return href === "/dashboard" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveItem(pathname: string) {
  return NAV_ITEMS.find((item) => isActive(pathname, item.href)) ?? NAV_ITEMS[0];
}
