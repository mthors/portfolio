import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProjects } from "@/content/projects";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="flex flex-col gap-24 py-12 md:py-20">
      {/* Hero Shell */}
      <section id="hero" className="w-full">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Positioning & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--surface) border border-(--border) text-xs font-mono text-(--accent) mb-6">
                <span className="h-2 w-2 rounded-full bg-(--accent) animate-pulse"></span>
                IT ENGINEER &amp; SOFTWARE DEVELOPER
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--text-primary) leading-[1.15]">
                Building Practical Solutions for{" "}
                <span className="text-(--accent)">Real-World Operations.</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-(--text-secondary) leading-relaxed max-w-2xl">
                Bridging modern software development, enterprise IT infrastructure, and
                manufacturing business systems. Focused on building robust, maintainable, and
                data-driven applications that solve concrete problems.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="#projects">
                  View Projects
                </Button>
                <Button variant="secondary" size="lg" href="#contact">
                  Get In Touch
                </Button>
              </div>

              {/* Experience Stats Indicators */}
              <div className="mt-12 pt-8 border-t border-(--border) grid grid-cols-2 sm:grid-cols-3 gap-6 w-full">
                <div>
                  <div className="text-2xl font-bold font-mono text-(--text-primary)">3+ Years</div>
                  <div className="text-xs text-(--text-muted) mt-1">Industry Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-(--accent)">Hybrid</div>
                  <div className="text-xs text-(--text-muted) mt-1">
                    Software &amp; Infrastructure
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-(--success)">Zero DB</div>
                  <div className="text-xs text-(--text-muted) mt-1">Git-Driven V1 Architecture</div>
                </div>
              </div>
            </div>

            {/* Right Column: Technical Workspace Visual */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-(--border) bg-(--surface) p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-(--border)">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-(--danger)/80 inline-block"></span>
                    <span className="h-3 w-3 rounded-full bg-(--warning)/80 inline-block"></span>
                    <span className="h-3 w-3 rounded-full bg-(--success)/80 inline-block"></span>
                  </div>
                  <span className="text-xs font-mono text-(--text-muted)">system-status.sh</span>
                </div>

                <div className="font-mono text-xs space-y-2.5 text-(--text-secondary)">
                  <div className="flex items-center gap-2">
                    <span className="text-(--accent)">$</span>
                    <span className="text-(--text-primary)">portfolio status --foundation</span>
                  </div>
                  <div className="text-(--text-muted) pl-4">
                    [OK] Next.js App Router (Server-first)
                  </div>
                  <div className="text-(--text-muted) pl-4">
                    [OK] Strict TypeScript &amp; Zod schemas
                  </div>
                  <div className="text-(--text-muted) pl-4">
                    [OK] Tailwind CSS Design Tokens loaded
                  </div>
                  <div className="text-(--text-muted) pl-4">
                    [OK] Vitest &amp; RTL test harness ready
                  </div>
                  <div className="text-(--text-muted) pl-4">[OK] Playwright E2E configured</div>
                  <div className="text-(--text-muted) pl-4">
                    [OK] Multi-stage Docker ready (standalone)
                  </div>
                  <div className="pt-2 text-(--success) flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-(--success)"></span>
                    <span>Foundation M0: Verified &amp; Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Projects Preview (Data-Driven verification) */}
      <section id="projects" className="w-full">
        <Container>
          <SectionHeading
            eyebrow="PORTFOLIO WORK"
            title="Featured Projects"
            description="Production and operational case studies backed by Git-controlled structured data. Built without database overhead."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                className="flex flex-col rounded-xl border border-(--border) bg-(--surface) p-6 hover:border-(--accent)/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="accent">{project.category}</Badge>
                  <span className="text-xs font-mono text-(--text-muted) capitalize">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-(--text-primary) mb-2">{project.title}</h3>

                <p className="text-sm text-(--text-secondary) leading-relaxed mb-6 flex-1">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline">+{project.technologies.length - 4}</Badge>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-(--border) mt-auto">
                  {project.githubUrl && (
                    <Button
                      variant="secondary"
                      size="sm"
                      href={project.githubUrl}
                      isExternal
                      className="w-full"
                    >
                      GitHub
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      href={project.liveUrl}
                      isExternal
                      className="w-full"
                    >
                      Demo
                    </Button>
                  )}
                  {!project.githubUrl && !project.liveUrl && (
                    <span className="text-xs font-mono text-(--text-muted) py-1.5">
                      Operational Case Study
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Shell */}
      <section id="contact" className="w-full">
        <Container>
          <div className="rounded-2xl border border-(--border) bg-(--surface) p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-(--accent) font-medium">
              GET IN TOUCH
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mt-2">
              Interested in collaborating or discussing systems?
            </h2>
            <p className="text-sm sm:text-base text-(--text-secondary) mt-3 max-w-xl mx-auto">
              Open to technical conversations about IT infrastructure, software engineering, and
              manufacturing automation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="md" href="mailto:contact@thoriqisahal.dev" isExternal>
                Send Email
              </Button>
              <Button
                variant="secondary"
                size="md"
                href="https://github.com/thoriqisahal"
                isExternal
              >
                GitHub Profile
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
