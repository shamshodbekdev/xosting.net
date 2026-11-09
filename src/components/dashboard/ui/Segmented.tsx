"use client";

import { cn } from "@/lib/utils";

interface SegmentedProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; count?: number }[];
}

/** Ro'yxatlarni filtrlash uchun tugmalar guruhi */
export function Segmented<T extends string>({ label, value, onChange, options }: SegmentedProps<T>) {
  return (
    <div role="group" aria-label={label} className="inline-flex max-w-full overflow-x-auto rounded-full border border-white/[0.06] bg-white/[0.03] p-1">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              selected ? "bg-white text-black shadow" : "text-gray-400 hover:text-white"
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs tabular-nums",
                  selected ? "bg-black/10 text-black/70" : "bg-white/10 text-gray-400"
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
