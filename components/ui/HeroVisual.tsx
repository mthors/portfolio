import React from "react";
import Image from "next/image";

/**
 * HeroVisual component featuring the approved portrait of Moh Thoriqi Sahal
 * integrated seamlessly into the dark navy technical environment.
 *
 * Architecture:
 * - Animated Background Layer (aria-hidden, z-0): Restrained ambient glows, faint grid, and subtle technical lines.
 * - Portrait Layer (z-10): Next.js Image with soft edge masking to dissolve into the background without boxes or borders.
 */
export function HeroVisual() {
  return (
    <div className="relative w-full max-w-[560px] lg:max-w-none flex items-start justify-center lg:justify-start select-none">
      {/* ------------------------------------------------------------------ */}
      {/* 1. Restrained Animated Technical Background Layer (aria-hidden)    */}
      {/* ------------------------------------------------------------------ */}
      <div
        aria-hidden="true"
        data-testid="hero-ambient-visual"
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0"
      >
        {/* Subtle ambient radial glow positioned directly behind the subject */}
        <div className="absolute top-[18%] left-[24%] w-72 sm:w-96 lg:w-[500px] h-72 sm:h-96 lg:h-[500px] rounded-full bg-(--accent)/12 blur-3xl lg:blur-[120px] motion-reduce:animate-none animate-pulse [animation-duration:10s]" />
        <div className="absolute top-[26%] left-[18%] w-60 sm:w-80 lg:w-[420px] h-60 sm:h-80 lg:h-[420px] rounded-full bg-blue-600/10 blur-2xl lg:blur-[95px] motion-reduce:animate-none animate-pulse [animation-duration:14s]" />

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

          {/* Outer subtle coordinate crosshairs (only at periphery, away from face) */}
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
      {/* 2. Portrait Layer (Integrated, Seamlessly Blended, Dominant Scale) */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-10 w-full h-[420px] sm:h-[500px] md:h-[560px] lg:h-[660px] xl:h-[720px] flex items-start justify-center lg:justify-start hero-mask-horizontal">
        <div className="relative w-full h-full hero-mask-vertical">
          <div className="relative w-full h-full hero-mask-vignette">
            <Image
              src="/images/hero.png"
              alt="Portrait of Moh Thoriqi Sahal"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, (max-width: 1280px) 50vw, 750px"
              className="object-cover object-[62%_0%] lg:object-[58%_0%] pointer-events-none select-none transition-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
