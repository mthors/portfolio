import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("mb-10", align === "center" ? "text-center mx-auto" : "text-left", className)}
    >
      {eyebrow && (
        <p className="text-xs font-mono uppercase tracking-widest text-(--accent) mb-2 font-medium">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-(--text-primary)">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-base sm:text-lg text-(--text-secondary) leading-relaxed",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-3xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
