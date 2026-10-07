"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  as?: React.ElementType;
}

/**
 * Lightweight, accessible section and card reveal component.
 * Uses native IntersectionObserver to animate content once as it enters the viewport.
 * Automatically falls back to fully visible content when prefers-reduced-motion is active
 * or in non-browser/test environments.
 */
export function Reveal({
  children,
  delayMs = 0,
  className,
  as: Component = "div",
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is not available, reveal asynchronously without synchronous render cascade
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger strictly once
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );

    const currentEl = ref.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Component
      ref={ref}
      style={delayMs > 0 && isVisible ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
