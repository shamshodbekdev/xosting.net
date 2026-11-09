import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-gray-600 transition-colors focus:bg-white/[0.05] focus:outline-none focus:ring-2 sm:text-sm";
const controlState = (error?: string) =>
  error
    ? "border-red-500/50 focus:ring-red-500/30"
    : "border-white/10 hover:border-white/20 focus:border-primary-500/60 focus:ring-primary-500/30";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

/** Yorliq, xato matni va aria bog'lanishlari bilan forma maydoni */
export function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}

type ControlProps<T> = T & { error?: string };

const ariaFor = (id: string | undefined, error?: string) => ({
  "aria-invalid": !!error,
  "aria-describedby": error && id ? `${id}-error` : undefined,
});

export const TextInput = React.forwardRef<HTMLInputElement, ControlProps<React.InputHTMLAttributes<HTMLInputElement>>>(
  ({ className, error, id, ...props }, ref) => (
    <input ref={ref} id={id} className={cn(controlBase, controlState(error), className)} {...ariaFor(id, error)} {...props} />
  )
);
TextInput.displayName = "TextInput";

export const TextArea = React.forwardRef<HTMLTextAreaElement, ControlProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>>>(
  ({ className, error, id, ...props }, ref) => (
    <textarea
      ref={ref}
      id={id}
      className={cn(controlBase, controlState(error), "min-h-32 resize-y", className)}
      {...ariaFor(id, error)}
      {...props}
    />
  )
);
TextArea.displayName = "TextArea";

export const Select = React.forwardRef<HTMLSelectElement, ControlProps<React.SelectHTMLAttributes<HTMLSelectElement>>>(
  ({ className, error, id, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        id={id}
        className={cn(controlBase, controlState(error), "appearance-none pr-10 [&>option]:bg-surface", className)}
        {...ariaFor(id, error)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  )
);
Select.displayName = "Select";
