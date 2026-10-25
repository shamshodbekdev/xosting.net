import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50 disabled:pointer-events-none",
          {
          "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5":
            variant === "primary",
            "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm":
              variant === "secondary",
            "border border-white/20 text-white hover:bg-white/5":
              variant === "outline",
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";