import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "accent" | "outline" | "success" | "warning";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-(--surface) text-(--text-secondary) border border-(--border)",
  accent: "bg-(--accent-soft) text-(--accent) border border-(--accent)/30",
  outline: "bg-transparent text-(--text-muted) border border-(--border)",
  success: "bg-(--success)/10 text-(--success) border border-(--success)/30",
  warning: "bg-(--warning)/10 text-(--warning) border border-(--warning)/30",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono tracking-wide",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
