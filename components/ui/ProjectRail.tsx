"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface ProjectRailProps {
  projects: Project[];
}

export function ProjectRail({ projects }: ProjectRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    // Allow small epsilon for floating-point zoom scaling
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, projects]);

  const handleScroll = (direction: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;

    // Scroll by roughly one card width + gap
    const scrollAmount = Math.max(300, Math.floor(el.clientWidth * 0.8));
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {/* Navigation Controls Bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-(--text-muted)">
          <span className="h-1.5 w-1.5 rounded-full bg-(--accent)/70" aria-hidden="true" />
          <span>Horizontal Project Rail</span>
          <span className="hidden sm:inline text-(--border)">&bull;</span>
          <span className="hidden sm:inline">Swipe or use arrows</span>
        </div>

        <div className="flex items-center gap-2" role="group" aria-label="Project rail navigation">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-(--border) bg-(--surface) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--accent)/50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next projects"
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-(--border) bg-(--surface) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--accent)/50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontally Scrollable Rail */}
      <div
        ref={railRef}
        data-testid="project-rail"
        role="region"
        aria-label="Featured projects horizontal rail"
        tabIndex={0}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--accent)/40 [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]"
      >
        {projects.map((project) => (
          <div
            key={project.slug}
            className="w-[84vw] max-w-[320px] sm:max-w-none sm:w-[350px] lg:w-[calc((100%-48px)/3.2)] min-w-[290px] shrink-0 snap-start flex flex-col"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
