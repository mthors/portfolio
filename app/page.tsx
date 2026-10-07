import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProjects } from "@/content/projects";
import { getExperiences } from "@/content/experience";
import { getSkillCategories } from "@/content/skills";
import { getContactConfig } from "@/content/contact";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const experiences = getExperiences();
  const skillCategories = getSkillCategories();
  const contact = getContactConfig();

  return (
    <div className="flex flex-col gap-24 py-12 md:py-20">
      {/* 1. Hero Section */}
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
                I build practical software and solve real-world technology problems across
                manufacturing IT, business systems, and modern web applications.
              </p>

              <p className="mt-3 text-sm sm:text-base text-(--text-muted) leading-relaxed max-w-2xl">
                Hands-on experience across infrastructure, troubleshooting, business applications,
                databases, and software development, with a growing focus on modern software
                engineering.
              </p>

              {/* Guiding Philosophy Callout */}
              <div className="mt-6 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-(--surface) border border-(--border) text-xs font-mono text-(--text-secondary)">
                <span className="text-(--accent) font-bold">&bull;</span>
                <span>Philosophy: Understand the problem before choosing the technology.</span>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="#projects">
                  View Projects
                </Button>
                <Button variant="secondary" size="lg" href="#contact">
                  Get In Touch
                </Button>
              </div>

              {/* Operational Background Indicators */}
              <div className="mt-12 pt-8 border-t border-(--border) grid grid-cols-2 sm:grid-cols-3 gap-6 w-full">
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-(--text-primary)">
                    May 2022 to Present
                  </div>
                  <div className="text-xs text-(--text-muted) mt-1">Manufacturing IT Staff</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-(--accent)">
                    Broad Scope
                  </div>
                  <div className="text-xs text-(--text-muted) mt-1">
                    Hardware, DBs, Apps &amp; Code
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-(--success)">
                    Investigative
                  </div>
                  <div className="text-xs text-(--text-muted) mt-1">Root-Cause Troubleshooting</div>
                </div>
              </div>
            </div>

            {/* Right Column: Operational Systems Overview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-(--border) bg-(--surface) p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-(--border)">
                  <span className="text-xs font-mono uppercase tracking-wider text-(--accent)">
                    Operational Scope
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-(--success)">
                    <span className="h-2 w-2 rounded-full bg-(--success)"></span>
                    Active in Production IT
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="rounded-lg bg-(--bg-primary) border border-(--border)/70 p-3.5">
                    <div className="text-[11px] font-mono uppercase text-(--accent) mb-1 font-semibold">
                      Systems &amp; Infrastructure
                    </div>
                    <div className="text-(--text-secondary) leading-relaxed">
                      Windows Server, shop-floor workstations, plant networking, CCTV, and network
                      printers.
                    </div>
                  </div>

                  <div className="rounded-lg bg-(--bg-primary) border border-(--border)/70 p-3.5">
                    <div className="text-[11px] font-mono uppercase text-(--accent) mb-1 font-semibold">
                      Business Applications &amp; Data
                    </div>
                    <div className="text-(--text-secondary) leading-relaxed">
                      Custom enterprise ERP, Microsoft SQL Server querying, Crystal Reports, and
                      operational workflows.
                    </div>
                  </div>

                  <div className="rounded-lg bg-(--bg-primary) border border-(--border)/70 p-3.5">
                    <div className="text-[11px] font-mono uppercase text-(--accent) mb-1 font-semibold">
                      Software &amp; Tooling
                    </div>
                    <div className="text-(--text-secondary) leading-relaxed">
                      Internal desktop tools (C# / WinForms), data onboarding pipelines, and modern
                      web applications (TypeScript / Next.js).
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-(--border) flex items-center justify-between text-xs font-mono text-(--text-muted)">
                  <span>Methodology</span>
                  <span className="text-(--text-secondary)">
                    Investigate &rarr; Verify &rarr; Resolve
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. About Section */}
      <section id="about" className="w-full scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow="ABOUT &amp; PHILOSOPHY"
            title="Curiosity, Systems, and Problem Solving"
            description="From early days exploring technology at an internet café to managing complex operational systems in manufacturing, my focus has always been understanding how things work and building tools that make work easier."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Early Curiosity */}
            <div className="rounded-xl border border-(--border) bg-(--surface) p-6 flex flex-col">
              <div className="text-xs font-mono text-(--accent) uppercase tracking-wider mb-2">
                01 / Background
              </div>
              <h3 className="text-lg font-bold text-(--text-primary) mb-3">
                Curiosity Since Childhood
              </h3>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                My interest in technology started early, using computers at a local internet café.
                That sparked an ongoing fascination not only with computers, but with technology
                broadly: software, programming, cars, phones, cameras, hardware, and gaming
                graphics. I have always enjoyed understanding how systems work under the surface.
              </p>
            </div>

            {/* Card 2: Manufacturing Environment */}
            <div className="rounded-xl border border-(--border) bg-(--surface) p-6 flex flex-col">
              <div className="text-xs font-mono text-(--accent) uppercase tracking-wider mb-2">
                02 / Real-World Role
              </div>
              <h3 className="text-lg font-bold text-(--text-primary) mb-3">
                Hands-On Manufacturing IT
              </h3>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                Since May 2022, I have worked as IT Staff in a manufacturing environment. My actual
                responsibilities extend far beyond basic IT support: working across hardware,
                Windows systems, servers, plant networking, CCTV, printers, custom ERP applications,
                SQL Server databases, websites, troubleshooting, and internal administrative
                tooling.
              </p>
            </div>

            {/* Card 3: Investigative Mindset */}
            <div className="rounded-xl border border-(--border) bg-(--surface) p-6 flex flex-col">
              <div className="text-xs font-mono text-(--accent) uppercase tracking-wider mb-2">
                03 / Methodology
              </div>
              <h3 className="text-lg font-bold text-(--text-primary) mb-3">
                Investigative Mindset
              </h3>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                In an active manufacturing plant, technical issues rarely arrive neatly categorized.
                My approach is investigative: observe the problem, identify possible failure causes,
                test hypotheses, evaluate fixes, and determine the root cause. Understand the
                problem before choosing the technology.
              </p>
            </div>
          </div>

          {/* Direction Banner */}
          <div className="mt-8 rounded-xl border border-(--border) bg-(--surface)/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-(--accent) uppercase tracking-wider">
                Current Focus &amp; Direction
              </div>
              <div className="text-sm text-(--text-primary) font-medium mt-1">
                Moving deeper into professional software engineering and remote software
                development.
              </div>
              <div className="text-xs text-(--text-muted) mt-0.5">
                Applying practical operational discipline, problem-first thinking, and modern web
                technologies.
              </div>
            </div>
            <Button variant="outline" size="sm" href="#contact">
              Let&apos;s Connect
            </Button>
          </div>
        </Container>
      </section>

      {/* 3. Professional Experience Section */}
      <section id="experience" className="w-full scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow="CAREER HISTORY"
            title="Professional Experience"
            description="Broad hands-on operational and software responsibilities in an active manufacturing facility."
          />

          <div className="space-y-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-xl border border-(--border) bg-(--surface) p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-(--border)">
                  <div>
                    <span className="text-xs font-mono text-(--accent) uppercase tracking-wider">
                      {exp.organization}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-(--text-primary) mt-1">
                      {exp.role}
                    </h3>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-(--bg-primary) border border-(--border) text-xs font-mono text-(--text-secondary) self-start sm:self-center">
                    {exp.period}
                  </span>
                </div>

                <p className="mt-6 text-sm sm:text-base text-(--text-secondary) leading-relaxed">
                  {exp.description}
                </p>

                {/* Categorized Responsibilities */}
                {exp.domains && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {exp.domains.map((domain) => (
                      <div
                        key={domain.category}
                        className="rounded-lg bg-(--bg-primary)/80 border border-(--border)/80 p-5"
                      >
                        <h4 className="text-sm font-semibold font-mono text-(--accent) mb-3">
                          {domain.category}
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-(--text-secondary)">
                          {domain.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-(--accent) text-xs mt-1">&bull;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                <div className="mt-8 pt-6 border-t border-(--border) flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-(--text-muted) mr-2">
                    Systems &amp; Tools:
                  </span>
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Featured Projects Section */}
      <section id="projects" className="w-full scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow="PORTFOLIO WORK"
            title="Featured Projects"
            description="Practical desktop applications, modern web projects, and operational case studies engineered around real-world constraints."
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

                <p className="text-sm text-(--text-secondary) leading-relaxed mb-4">
                  {project.shortDescription}
                </p>

                {/* Operational Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-6 rounded bg-(--bg-primary)/50 border border-(--border)/60 p-3 flex-1">
                    <div className="text-[11px] font-mono uppercase text-(--text-muted) mb-2">
                      Key Highlights:
                    </div>
                    <ul className="space-y-1.5 text-xs text-(--text-secondary)">
                      {project.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-(--accent) text-xs mt-0.5">&rsaquo;</span>
                          <span className="leading-snug">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
                    <span className="text-xs font-mono text-(--text-muted) py-1.5 w-full text-center">
                      Operational Case Study
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Skills Section */}
      <section id="skills" className="w-full scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow="TECHNICAL CAPABILITIES"
            title="Skills &amp; Technologies"
            description="Technologies and systems with genuine, hands-on operational and development exposure."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-xl border border-(--border) bg-(--surface) p-6 flex flex-col"
              >
                <h3 className="text-base font-bold font-mono text-(--text-primary) pb-3 mb-4 border-b border-(--border) flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="text-xs text-(--text-muted)">{category.skills.length}</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="w-full scroll-mt-20">
        <Container>
          <div className="rounded-2xl border border-(--border) bg-(--surface) p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-(--accent) font-medium">
              GET IN TOUCH
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mt-2">
              Interested in working together or discussing a software project?
            </h2>
            <p className="text-sm sm:text-base text-(--text-secondary) mt-3 max-w-xl mx-auto leading-relaxed">
              I&apos;d be happy to hear from you. Open to conversations about practical software
              development, IT infrastructure, and new engineering opportunities.
            </p>

            <div className="mt-4 text-xs font-mono text-(--text-muted)">
              &ldquo;Understand the problem before choosing the technology.&rdquo;
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                size="md"
                href={contact.whatsapp.url}
                isExternal
                aria-label={contact.whatsapp.ariaLabel}
              >
                {contact.whatsapp.label}
              </Button>
              <Button
                variant="secondary"
                size="md"
                href={contact.email.url}
                isExternal
                aria-label={contact.email.ariaLabel}
              >
                {contact.email.label}
              </Button>
              <Button
                variant="secondary"
                size="md"
                href={contact.github.url}
                isExternal
                aria-label={contact.github.ariaLabel}
              >
                {contact.github.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
