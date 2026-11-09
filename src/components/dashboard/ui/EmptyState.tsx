import type { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-6 py-12 text-center">
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-gray-500">
        <Icon size={22} />
      </span>
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  );
}
