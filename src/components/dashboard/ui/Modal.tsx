"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md";
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const subscribe = () => () => {};

/** Brauzerda ekanligimizni SSR bilan mos ravishda aniqlaydi (portal uchun) */
function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function Modal({ open, onClose, title, description, children, size = "md" }: ModalProps) {
  const t = useTranslations("Dashboard.Common");
  const isClient = useIsClient();
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  // Eng so'nggi onClose ni saqlaymiz, shunda effekt har renderda qayta ishlamaydi
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Ochilganda birinchi maydonga fokus beramiz
    const frame = requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>("input, select, textarea") ??
        panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      // Fokusni modal ichida ushlab turish
      if (event.key === "Tab" && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={cn(
              "relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-surface/95 p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_0_60px_rgba(59,130,246,0.15)] backdrop-blur-xl sm:rounded-3xl sm:pb-6",
              size === "sm" ? "sm:max-w-md" : "sm:max-w-lg"
            )}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id={titleId} className="text-lg font-semibold text-white">{title}</h2>
                {description && (
                  <p id={descriptionId} className="mt-1 text-sm leading-relaxed text-gray-400">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("close")}
                className="-m-1 rounded-full bg-white/5 p-1.5 text-gray-400 transition-colors hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
