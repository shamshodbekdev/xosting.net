"use client";

import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  /** Yorliq vizual ko'rinmasa ham ekran o'quvchilar uchun saqlanadi */
  hideLabel?: boolean;
  description?: string;
  id?: string;
}

export function Switch({ checked, onChange, label, hideLabel, description, id }: SwitchProps) {
  const descriptionId = description && id ? `${id}-description` : undefined;

  return (
    <div className="flex items-center justify-between gap-4">
      {!hideLabel && (
        <div className="min-w-0">
          <label htmlFor={id} className="block cursor-pointer text-sm font-medium text-white">
            {label}
          </label>
          {description && (
            <p id={descriptionId} className="mt-0.5 text-sm text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={hideLabel ? label : undefined}
        aria-describedby={descriptionId}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          checked ? "bg-gradient-to-r from-primary-600 to-accent-500" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}
