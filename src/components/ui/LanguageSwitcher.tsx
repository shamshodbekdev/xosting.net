"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Flag } from "@/components/ui/Flag";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** "dropdown" — desktop navbar uchun, "inline" — mobil menyu uchun */
  variant?: "dropdown" | "inline";
  onChange?: () => void;
}

export function LanguageSwitcher({ variant = "dropdown", onChange }: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tashqariga bosilganda yoki Escape bosilganda dropdown yopiladi
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectLocale = (next: Locale) => {
    setOpen(false);
    onChange?.();
    if (next === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  if (variant === "inline") {
    return (
      <div role="group" aria-label={t("label")} className="grid grid-cols-2 gap-2">
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => selectLocale(code)}
            aria-pressed={code === locale}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm font-medium transition-all",
              code === locale
                ? "border-primary-500/50 bg-primary-500/15 text-white"
                : "border-white/10 bg-white/5 text-gray-400 hover:text-white"
            )}
          >
            <Flag locale={code} className="h-6 w-6" />
            <span className="truncate">{localeLabels[code].name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={isPending}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 disabled:opacity-60"
      >
        <Flag locale={locale} />
        {localeLabels[locale].short}
        <ChevronDown size={14} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t("label")}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full z-50 mt-3 w-56 max-w-[calc(100vw-2rem)] origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-1.5 shadow-[0_0_40px_rgba(59,130,246,0.15)] backdrop-blur-xl"
          >
            {locales.map((code) => {
              const selected = code === locale;
              return (
                <li key={code} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => selectLocale(code)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                      selected ? "bg-primary-500/15 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Flag locale={code} className="h-6 w-6" />
                    <span className="flex-1 truncate">{localeLabels[code].name}</span>
                    <span className="text-xs font-semibold text-gray-500">{localeLabels[code].short}</span>
                    <Check size={14} className={cn("shrink-0 text-primary-400", selected ? "opacity-100" : "opacity-0")} />
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
