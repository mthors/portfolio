import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "cta";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "aria-label"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  showArrow?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-(--accent) text-(--bg-primary) font-semibold hover:bg-(--accent-hover) hover:-translate-y-0.5 hover:shadow-md hover:shadow-(--accent)/20 shadow-sm",
  secondary:
    "bg-(--surface) text-(--text-primary) border border-(--border) hover:bg-(--surface-hover) hover:border-(--accent)/50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-(--accent)/10",
  cta: "bg-(--surface) text-(--text-primary) border border-(--border) hover:bg-(--surface-hover) hover:border-(--accent)/60 hover:text-(--accent) hover:-translate-y-0.5 hover:shadow-md hover:shadow-(--accent)/15",
  outline:
    "border border-(--accent) text-(--accent) bg-transparent hover:bg-(--accent-soft) hover:-translate-y-0.5",
  ghost: "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--surface)",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md min-h-[36px]",
  md: "px-5 py-2.5 text-sm rounded-lg min-h-[44px]",
  lg: "px-6 py-3 text-base font-medium rounded-lg min-h-[48px]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  showArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    "group inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none motion-reduce:transition-none motion-reduce:hover:transform-none active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-primary)",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span
          className="inline-block transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
          aria-hidden="true"
        >
          &rarr;
        </span>
      )}
    </>
  );

  if (href) {
    const anchorProps = {
      "aria-label": props["aria-label"],
    };

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {content}
    </button>
  );
}
