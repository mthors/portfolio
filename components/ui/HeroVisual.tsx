import React from "react";

/**
 * Ambient, borderless technical visual field for the Hero section.
 * Renders an abstract composition of subtle radial glow, coordinate geometry,
 * interconnected system nodes, and fading technical grid.
 *
 * Designed to feel naturally integrated into the page background with no card containers,
 * boxed panels, or fake metrics.
 */
export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      data-testid="hero-ambient-visual"
      className="relative w-full h-[300px] sm:h-[360px] lg:h-[480px] flex items-center justify-center select-none pointer-events-none"
    >
      {/* 1. Large soft ambient radial glow layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 lg:w-[440px] h-64 sm:h-80 lg:h-[440px] rounded-full bg-(--accent)/10 blur-3xl lg:blur-[100px] motion-reduce:animate-none animate-pulse [animation-duration:8s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 lg:w-[300px] h-48 sm:h-64 lg:h-[300px] rounded-full bg-blue-500/10 blur-2xl lg:blur-[70px] motion-reduce:animate-none animate-pulse [animation-duration:12s]" />

      {/* 2. Abstract Technical Geometry Vector */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[480px] max-h-[480px] drop-shadow-[0_0_24px_rgba(32,215,245,0.06)]"
      >
        <defs>
          {/* Radial mask to smoothly fade edges into the background */}
          <radialGradient id="ambient-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <mask id="grid-mask">
            <rect width="500" height="500" fill="url(#ambient-fade)" />
          </mask>

          {/* Technical dot grid pattern */}
          <pattern id="tech-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="0.9" fill="var(--accent)" fillOpacity="0.2" />
          </pattern>

          {/* Node glow filter */}
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Masked background dot grid */}
        <rect
          width="500"
          height="500"
          fill="url(#tech-dots)"
          mask="url(#grid-mask)"
          className="opacity-75"
        />

        {/* Concentric orbital rings (subtle, technical depth) */}
        <g mask="url(#grid-mask)">
          {/* Inner ring */}
          <circle
            cx="250"
            cy="250"
            r="85"
            stroke="var(--accent)"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="4 8"
          />

          {/* Middle rotating orbit */}
          <circle
            cx="250"
            cy="250"
            r="145"
            stroke="var(--accent)"
            strokeOpacity="0.14"
            strokeWidth="1"
            strokeDasharray="2 10"
            className="origin-center motion-reduce:animate-none animate-[spin_120s_linear_infinite]"
          />

          {/* Outer coordinate orbit */}
          <circle
            cx="250"
            cy="250"
            r="195"
            stroke="var(--border)"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeDasharray="1 14"
            className="origin-center motion-reduce:animate-none animate-[spin_180s_linear_infinite_reverse]"
          />
        </g>

        {/* Subtle coordinate alignment crosshairs */}
        <g stroke="var(--accent)" strokeOpacity="0.22" strokeWidth="1">
          {/* Top-Left */}
          <path d="M 120 120 L 120 128 M 120 120 L 128 120" />
          {/* Top-Right */}
          <path d="M 380 120 L 380 128 M 380 120 L 372 120" />
          {/* Bottom-Left */}
          <path d="M 120 380 L 120 372 M 120 380 L 128 380" />
          {/* Bottom-Right */}
          <path d="M 380 380 L 380 372 M 380 380 L 372 380" />
        </g>

        {/* Interconnected System Node Topology (Engineering / Systems) */}
        <g>
          {/* Connection vectors */}
          <g stroke="var(--accent)" strokeWidth="1">
            <line x1="250" y1="250" x2="180" y2="190" strokeOpacity="0.25" strokeDasharray="3 3" />
            <line x1="250" y1="250" x2="330" y2="195" strokeOpacity="0.28" />
            <line x1="250" y1="250" x2="335" y2="305" strokeOpacity="0.22" strokeDasharray="2 4" />
            <line x1="250" y1="250" x2="205" y2="325" strokeOpacity="0.24" />
            <line x1="180" y1="190" x2="330" y2="195" strokeOpacity="0.12" strokeDasharray="4 6" />
            <line x1="330" y1="195" x2="335" y2="305" strokeOpacity="0.16" />
            <line x1="335" y1="305" x2="205" y2="325" strokeOpacity="0.15" strokeDasharray="3 3" />
            <line x1="205" y1="325" x2="180" y2="190" strokeOpacity="0.14" />
          </g>

          {/* Peripheral Nodes */}
          {/* Node 1: Top-Left */}
          <circle
            cx="180"
            cy="190"
            r="3.5"
            fill="var(--bg-primary)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          <circle cx="180" cy="190" r="1.5" fill="var(--accent)" fillOpacity="0.8" />

          {/* Node 2: Top-Right */}
          <circle
            cx="330"
            cy="195"
            r="4"
            fill="var(--bg-primary)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          <circle cx="330" cy="195" r="2" fill="var(--accent)" />

          {/* Node 3: Bottom-Right */}
          <circle
            cx="335"
            cy="305"
            r="3.5"
            fill="var(--bg-primary)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          <circle cx="335" cy="305" r="1.5" fill="var(--accent)" fillOpacity="0.8" />

          {/* Node 4: Bottom-Left */}
          <circle
            cx="205"
            cy="325"
            r="3.5"
            fill="var(--bg-primary)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          <circle cx="205" cy="325" r="1.5" fill="var(--accent)" fillOpacity="0.8" />

          {/* Center Focal Node */}
          {/* Subtle pulse ring on center node */}
          <circle
            cx="250"
            cy="250"
            r="12"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.25"
            strokeWidth="1"
            className="origin-center motion-reduce:animate-none animate-ping [animation-duration:5s]"
          />
          <circle
            cx="250"
            cy="250"
            r="7"
            fill="var(--bg-primary)"
            stroke="var(--accent)"
            strokeWidth="2"
            filter="url(#node-glow)"
          />
          <circle cx="250" cy="250" r="3" fill="var(--accent)" />
        </g>
      </svg>
    </div>
  );
}
