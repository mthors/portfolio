import React from "react";
import Image from "next/image";

/**
 * HeroVisual component featuring the full composition of Moh Thoriqi Sahal's portrait
 * integrated seamlessly into the dark navy technical environment.
 *
 * Architecture:
 * - Full Source Image Canvas (1402×1122): Preserves natural aspect ratio without aggressive cropping.
 * - Spans substantially more width across the hero; dark negative space on the left sits behind hero text.
 * - Portrait on the right remains dominant, sharp, and crisp at normal desktop viewing size.
 * - Restrained Animated Technical Background Layer (aria-hidden, z-0): Ambient glows, faint coordinate geometry.
 * - Left-side Readability Gradient (z-10): Smooth transition ensuring maximum text legibility without hard borders.
 */
export function HeroVisual() {
  return (
    <div className="w-full mt-10 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-right-4 xl:-right-8 2xl:-right-12 lg:w-[920px] xl:w-[1080px] 2xl:w-[1240px] flex items-center justify-center lg:justify-end select-none pointer-events-none z-0 animate-hero-6">
      {/* ------------------------------------------------------------------ */}
      {/* 1. Restrained Animated Technical Background Layer (aria-hidden)    */}
      {/* ------------------------------------------------------------------ */}
      <div
        aria-hidden="true"
        data-testid="hero-ambient-visual"
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0"
      >
        {/* Subtle ambient radial glow positioned behind the portrait */}
        <div className="absolute top-[18%] right-[12%] w-72 sm:w-96 lg:w-[500px] h-72 sm:h-96 lg:h-[500px] rounded-full bg-(--accent)/12 blur-3xl lg:blur-[120px] motion-reduce:animate-none animate-pulse [animation-duration:10s]" />
        <div className="absolute top-[26%] right-[16%] w-60 sm:w-80 lg:w-[420px] h-60 sm:h-80 lg:h-[420px] rounded-full bg-blue-600/10 blur-2xl lg:blur-[95px] motion-reduce:animate-none animate-pulse [animation-duration:14s]" />

        {/* Faint technical grid and peripheral geometry */}
        <svg
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-30"
        >
          <defs>
            <radialGradient id="hero-bg-fade" cx="58%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <mask id="hero-grid-mask">
              <rect width="600" height="600" fill="url(#hero-bg-fade)" />
            </mask>
            <pattern id="hero-tech-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="0.8" fill="var(--accent)" fillOpacity="0.3" />
            </pattern>
          </defs>

          {/* Faint masked dot grid */}
          <rect width="600" height="600" fill="url(#hero-tech-dots)" mask="url(#hero-grid-mask)" />

          {/* Outer subtle coordinate crosshairs */}
          <g stroke="var(--accent)" strokeOpacity="0.25" strokeWidth="1">
            <path d="M 80 80 L 80 90 M 80 80 L 90 80" />
            <path d="M 520 80 L 520 90 M 520 80 L 510 80" />
            <path d="M 80 520 L 80 510 M 80 520 L 90 520" />
            <path d="M 520 520 L 520 510 M 520 520 L 510 520" />
          </g>

          {/* Peripheral subtle tech lines and nodes */}
          <g stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.18">
            <line x1="80" y1="300" x2="120" y2="300" strokeDasharray="3 3" />
            <line x1="480" y1="300" x2="520" y2="300" strokeDasharray="3 3" />
            <circle cx="120" cy="300" r="2" fill="var(--accent)" fillOpacity="0.4" />
            <circle cx="480" cy="300" r="2" fill="var(--accent)" fillOpacity="0.4" />
          </g>
        </svg>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Full Source Image Composition Layer                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-10 w-full aspect-[1402/1122] flex items-center justify-center lg:justify-end hero-full-mask-horizontal">
        <div className="relative w-full h-full hero-full-mask-vertical">
          <Image
            src="/images/hero.png"
            alt="Portrait of Moh Thoriqi Sahal"
            fill
            priority
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 75vw, 1200px"
            className="object-contain object-center lg:object-right select-none pointer-events-none transition-none"
          />

          {/* Smooth left-side dark gradient ensuring pristine text contrast over image background */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-(--bg-primary) via-(--bg-primary)/85 to-transparent pointer-events-none z-20"
          />
        </div>
      </div>
    </div>
  );
}
