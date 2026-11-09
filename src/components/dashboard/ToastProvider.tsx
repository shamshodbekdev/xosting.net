"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

const ToastContext = createContext<((message: string, variant?: ToastVariant) => void) | null>(null);

const TOAST_DURATION = 4500;
let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Dashboard.Common");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = ++toastId;
      setToasts((list) => [...list.slice(-2), { id, message, variant }]);
      setTimeout(() => dismiss(id), TOAST_DURATION);
    },
    [dismiss]
  );

  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-[80] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:items-end"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const Icon = toast.variant === "success" ? CheckCircle2 : AlertCircle;
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                role="status"
                className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-surface/95 p-4 text-sm text-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
              >
                <Icon
                  size={18}
                  className={cn("mt-0.5 shrink-0", toast.variant === "success" ? "text-emerald-400" : "text-red-400")}
                />
                <p className="flex-1 leading-relaxed">{toast.message}</p>
                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  aria-label={t("close")}
                  className="-m-1 rounded-lg p-1 text-gray-500 transition-colors hover:text-white"
                >
                  <X size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast faqat ToastProvider ichida ishlatiladi");
  return context;
}
