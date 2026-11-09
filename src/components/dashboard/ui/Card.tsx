import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
}

/** Panel kartasi: asosiy saytdagi glass uslubida, lekin hover effektisiz */
export function Card({ as: Tag = "section", className, ...props }: CardProps) {
  return (
    <Tag
      className={cn("rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6", className)}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  description,
  action,
  id,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 id={id} className="text-lg font-semibold text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
