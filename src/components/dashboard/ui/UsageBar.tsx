import { cn } from "@/lib/utils";

interface UsageBarProps {
  label: string;
  used: number;
  total: number;
  /** Masalan: "5 / 20 GB" */
  valueText: string;
}

export function UsageBar({ label, used, total, valueText }: UsageBarProps) {
  const percent = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;
  const tone =
    percent >= 95 ? "from-red-500 to-red-400" : percent >= 80 ? "from-amber-500 to-amber-400" : "from-primary-600 to-accent-500";

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
        <span className="font-medium text-gray-300">{label}</span>
        <span className="tabular-nums text-gray-400">
          {valueText} <span className="text-gray-600">· {percent}%</span>
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={used}
        aria-valuetext={valueText}
        className="h-2 overflow-hidden rounded-full bg-white/[0.06]"
      >
        <div className={cn("h-full rounded-full bg-gradient-to-r", tone)} style={{ width: `${Math.max(percent, 2)}%` }} />
      </div>
    </div>
  );
}
