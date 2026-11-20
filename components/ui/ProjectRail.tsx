"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";

interface ProjectRailProps {
  projects: Project[];
}

export function ProjectRail({ projects }: ProjectRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const cycleWidthRef = useRef<number>(0);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Drag tracking refs
  const dragStartXRef = useRef<number>(0);
  const dragStartScrollLeftRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  // Measure single cycle width directly from the DOM children
  const updateCycleWidth = useCallback(() => {
    const el = railRef.current;
    if (!el || projects.length === 0) return;

    const children = el.children;
    const firstCard = children[0] as HTMLElement | undefined;
    const firstClone = children[projects.length] as HTMLElement | undefined;

    if (firstCard && firstClone) {
      const cycleWidth = firstClone.offsetLeft - firstCard.offsetLeft;
      if (cycleWidth > 0) {
        cycleWidthRef.current = cycleWidth;
        return;
      }
    }

    if (el.scrollWidth > 0) {
      cycleWidthRef.current = el.scrollWidth / 2;
    }
  }, [projects.length]);

  // Monitor media queries for reduced motion and mobile viewport/touch pointer
  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px), (pointer: coarse)");

    const updateMedia = () => {
      setPrefersReducedMotion(motionQuery.matches);
      setIsMobile(mobileQuery.matches);
    };

    updateMedia();
    updateCycleWidth();

    motionQuery.addEventListener("change", updateMedia);
    mobileQuery.addEventListener("change", updateMedia);
    window.addEventListener("resize", updateCycleWidth);

    return () => {
      motionQuery.removeEventListener("change", updateMedia);
      mobileQuery.removeEventListener("change", updateMedia);
      window.removeEventListener("resize", updateCycleWidth);
    };
  }, [updateCycleWidth, projects]);

  // Infinite continuous auto-scrolling animation loop
  useEffect(() => {
    const isPaused =
      isUserPaused ||
      prefersReducedMotion ||
      isMobile ||
      isHovered ||
      isFocused ||
      isInteracting ||
      isDragging;

    if (isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastTimeRef.current = null;
      return;
    }

    const loop = (time: DOMHighResTimeStamp) => {
      const el = railRef.current;
      if (!el) return;

      if (lastTimeRef.current !== null) {
        const deltaMs = time - lastTimeRef.current;
        // Skip frame spikes from background tab activation
        if (deltaMs > 0 && deltaMs < 100) {
          const cycleWidth = cycleWidthRef.current || el.scrollWidth / 2;
          // Target ~75 seconds for complete content cycle (within 60-90s requirement)
          const pixelsPerSecond = cycleWidth > 0 ? cycleWidth / 75 : 20;
          const moveBy = (pixelsPerSecond * deltaMs) / 1000;

          el.scrollLeft += moveBy;

          // Seamless infinite wrap without jump
          if (cycleWidth > 0 && el.scrollLeft >= cycleWidth) {
            el.scrollLeft -= cycleWidth;
          }
        }
      }

      lastTimeRef.current = time;
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [
    isUserPaused,
    prefersReducedMotion,
    isMobile,
    isHovered,
    isFocused,
    isInteracting,
    isDragging,
  ]);

  // Clean up cooldown timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  // Manual scroll controls (Next / Previous)
  const handleScroll = (direction: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;

    updateCycleWidth();
    const cycleWidth = cycleWidthRef.current || el.scrollWidth / 2;
    const scrollAmount = Math.max(300, Math.floor(el.clientWidth * 0.8));
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Temporarily pause auto-scroll during manual button interaction
    setIsInteracting(true);
    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    cooldownTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);

    if (direction === "left") {
      // Seamlessly wrap ahead if scrolling backwards past the start
      if (el.scrollLeft < scrollAmount && cycleWidth > 0) {
        el.scrollLeft += cycleWidth;
      }
      el.scrollBy({
        left: -scrollAmount,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    } else {
      el.scrollBy({
        left: scrollAmount,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
  };

  // Normalization on native scroll event
  const handleScrollEvent = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const cycleWidth = cycleWidthRef.current;
    if (cycleWidth > 0) {
      if (el.scrollLeft >= cycleWidth * 1.8) {
        el.scrollLeft -= cycleWidth;
      } else if (el.scrollLeft < 0) {
        el.scrollLeft += cycleWidth;
      }
    }
  }, []);

  // Hover handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Focus handlers
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
    }
  };

  // Desktop Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = railRef.current;
    if (!el) return;

    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = el.scrollLeft;
    hasDraggedRef.current = false;
    setIsDragging(true);

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || e.pointerType !== "mouse") return;
    const el = railRef.current;
    if (!el) return;

    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 5) {
      hasDraggedRef.current = true;
      const cycleWidth = cycleWidthRef.current || el.scrollWidth / 2;

      let newScrollLeft = dragStartScrollLeftRef.current - deltaX;
      if (cycleWidth > 0) {
        if (newScrollLeft >= cycleWidth) {
          newScrollLeft -= cycleWidth;
          dragStartScrollLeftRef.current -= cycleWidth;
        } else if (newScrollLeft < 0) {
          newScrollLeft += cycleWidth;
          dragStartScrollLeftRef.current += cycleWidth;
        }
      }
      el.scrollLeft = newScrollLeft;
    }
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || e.pointerType !== "mouse") return;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore release error
    }

    if (hasDraggedRef.current) {
      setIsInteracting(true);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        setIsInteracting(false);
        hasDraggedRef.current = false;
      }, 1500);
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDraggedRef.current = false;
    }
  };

  const toggleAutoScroll = () => {
    setIsUserPaused((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      {/* Navigation Controls Bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-(--text-muted)">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors duration-200",
              isUserPaused || isHovered || isFocused || prefersReducedMotion || isMobile
                ? "bg-(--warning)"
                : "bg-(--accent)/70 animate-pulse"
            )}
            aria-hidden="true"
          />
          <span>Horizontal Project Rail</span>
          <span className="hidden sm:inline text-(--border)">&bull;</span>
          <span className="hidden sm:inline">
            {isUserPaused
              ? "Auto-scroll paused"
              : isHovered
                ? "Hover paused"
                : isFocused
                  ? "Focus paused"
                  : prefersReducedMotion
                    ? "Manual navigation"
                    : isMobile
                      ? "Swipe to browse"
                      : "Auto-scrolling"}
          </span>
        </div>

        <div className="flex items-center gap-2" role="group" aria-label="Project rail navigation">
          {/* Pause / Resume Button on Desktop */}
          <button
            type="button"
            onClick={toggleAutoScroll}
            aria-label={
              isUserPaused
                ? "Resume project carousel auto-scroll"
                : "Pause project carousel auto-scroll"
            }
            aria-pressed={isUserPaused}
            title={isUserPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-lg border border-(--border) bg-(--surface) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--accent)/50 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
          >
            {isUserPaused ? (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Previous projects"
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-(--border) bg-(--surface) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--accent)/50 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
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
            aria-label="Next projects"
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-(--border) bg-(--surface) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--accent)/50 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
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

      {/* Horizontally Scrollable Continuous Track */}
      <div
        ref={railRef}
        data-testid="project-rail"
        role="region"
        aria-label="Featured projects horizontal rail"
        tabIndex={0}
        onScroll={handleScrollEvent}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClickCapture={handleClickCapture}
        className={cn(
          "flex gap-6 overflow-x-auto pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--accent)/40",
          "[scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]",
          isMobile || prefersReducedMotion ? "snap-x snap-mandatory scroll-smooth" : "snap-none",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        )}
      >
        {/* Primary Project Cards (Original structure, dimensions, and layout) */}
        {projects.map((project) => (
          <div
            key={project.slug}
            data-testid="primary-project-item"
            className="w-[84vw] max-w-[320px] sm:max-w-none sm:w-[350px] lg:w-[calc((100%-48px)/3.2)] min-w-[290px] shrink-0 snap-start flex flex-col"
          >
            <ProjectCard project={project} />
          </div>
        ))}

        {/* Cloned Project Cards (Desktop-only visual infinite loop; hidden on mobile and from assistive tech) */}
        {projects.map((project) => (
          <div
            key={`clone-${project.slug}`}
            data-testid="clone-project-item"
            aria-hidden="true"
            inert
            tabIndex={-1}
            className="hidden md:flex w-[84vw] max-w-[320px] sm:max-w-none sm:w-[350px] lg:w-[calc((100%-48px)/3.2)] min-w-[290px] shrink-0 snap-start flex flex-col select-none pointer-events-none"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
