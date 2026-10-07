import React from "react";
import Image from "next/image";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/Badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col h-full rounded-xl border border-(--border) bg-(--surface) overflow-hidden hover:border-(--accent)/50 hover:-translate-y-1 transition-all duration-200 focus-within:border-(--accent)/60">
      {/* 1. Thumbnail Area with Intentional Technical Placeholder */}
      <div className="relative w-full aspect-16/10 bg-(--bg-primary) border-b border-(--border) overflow-hidden flex items-center justify-center">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 380px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          /* Technical Schematic Placeholder matching dark navy / cyan aesthetic */
          <div
            aria-hidden="true"
            data-testid="project-thumbnail-placeholder"
            className="absolute inset-0 flex flex-col items-center justify-center select-none overflow-hidden"
          >
            {/* Subtle blueprint Cartesian grid */}
            <svg
              className="absolute inset-0 w-full h-full opacity-15 stroke-(--accent)"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <defs>
                <pattern
                  id={`card-grid-${project.slug}`}
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M 24 0 L 0 0 0 24" fill="none" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#card-grid-${project.slug})`} />
            </svg>

            {/* Subtle ambient glow in placeholder */}
            <div className="absolute w-24 h-24 rounded-full bg-(--accent)/10 blur-xl pointer-events-none" />

            {/* Technical Node Icon */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-lg border border-(--accent)/30 bg-(--accent-soft) flex items-center justify-center text-(--accent) transition-transform duration-200 group-hover:scale-110">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-(--text-muted)/80 font-medium">
                SCHEMATIC // {project.category}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-(--accent) font-semibold">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-(--text-muted) capitalize">
            {project.status}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-bold text-(--text-primary) mb-2.5 leading-snug group-hover:text-(--accent) transition-colors">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed mb-4 flex-1">
          {project.shortDescription}
        </p>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline">+{project.technologies.length - 4}</Badge>
          )}
        </div>

        {/* Project Action / Links */}
        <div className="pt-4 border-t border-(--border) flex items-center justify-between gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-(--accent) hover:text-(--accent-hover) focus-visible:outline-none focus-visible:underline"
              aria-label={`Open live demo for ${project.title}`}
            >
              <span>Live Demo</span>
              <span
                className="transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </a>
          ) : project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-(--accent) hover:text-(--accent-hover) focus-visible:outline-none focus-visible:underline"
              aria-label={`View source code for ${project.title}`}
            >
              <span>View Source</span>
              <span
                className="transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </a>
          ) : (
            <span className="text-xs font-mono text-(--text-muted)">Operational Case Study</span>
          )}

          {project.liveUrl && project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-(--text-muted) hover:text-(--text-primary) focus-visible:outline-none focus-visible:underline"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              Source &nearr;
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
