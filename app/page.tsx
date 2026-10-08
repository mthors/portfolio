import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedProjects } from "@/content/projects";
import { getExperiences } from "@/content/experience";
import { getSkillCategories } from "@/content/skills";
import { getContactConfig } from "@/content/contact";
import { HeroVisual } from "@/components/ui/HeroVisual";
import { ProjectRail } from "@/components/ui/ProjectRail";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const experiences = getExperiences();
  const skillCategories = getSkillCategories();
  const contact = getContactConfig();

  return (
    <div className="flex flex-col gap-24 pt-2 md:pt-4 pb-12 md:pb-20">
      {/* 1. Hero Section */}
      <section id="home" className="relative w-full overflow-hidden">
        {/* Anchor alias for #hero backwards compatibility */}
        <span id="hero" className="sr-only" aria-hidden="true" />
        <Container className="relative">
          <div className="relative flex flex-col lg:block items-start">
            {/* Left Column: Positioning & CTAs with Staggered Entrance */}
            <div className="relative z-10 w-full max-w-2xl lg:max-w-3xl flex flex-col items-start">
              {/* Eyebrow Badge (0ms) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--surface) border border-(--border) text-xs font-mono text-(--accent) mb-6 animate-hero-1">
                <span className="h-2 w-2 rounded-full bg-(--accent) animate-pulse" />
                IT ENGINEER &amp; SOFTWARE DEVELOPER
              </div>

              {/* Heading (80ms) */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--text-primary) leading-[1.15] animate-hero-2">
                Building Practical Solutions for{" "}
                <span className="text-(--accent)">Real-World Operations.</span>
              </h1>

              {/* Descriptions & Philosophy (160ms) */}
              <div className="animate-hero-3">
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
              </div>

              {/* CTAs (240ms) */}
              <div className="mt-8 flex flex-wrap gap-4 animate-hero-4">
                <Button variant="primary" size="lg" href="#projects">
                  View Projects
                </Button>
                <Button variant="secondary" size="lg" href="#contact">
                  Get In Touch
                </Button>
              </div>

              {/* Operational Background Indicators (320ms) */}
              <div className="mt-12 pt-8 border-t border-(--border) grid grid-cols-2 sm:grid-cols-3 gap-6 w-full animate-hero-5">
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

            {/* Ambient Technical Visual Field with Full Composition (160ms) */}
            <HeroVisual />
          </div>
        </Container>
      </section>

      {/* 2. About Section */}
      <section id="about" className="w-full">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="ABOUT &amp; PHILOSOPHY"
              title="Curiosity, Systems, and Problem Solving"
              description="From early days exploring technology at an internet café to managing complex operational systems in manufacturing, my focus has always been understanding how things work and building tools that make work easier."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Early Curiosity */}
              <div className="rounded-xl border border-(--border) bg-(--surface) p-6 flex flex-col hover:border-(--accent)/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20 transition-all duration-200">
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
              <div className="rounded-xl border border-(--border) bg-(--surface) p-6 flex flex-col hover:border-(--accent)/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20 transition-all duration-200">
                <div className="text-xs font-mono text-(--accent) uppercase tracking-wider mb-2">
                  02 / Real-World Role
                </div>
                <h3 className="text-lg font-bold text-(--text-primary) mb-3">
                  Hands-On Manufacturing IT
                </h3>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                  Since May 2022, I have worked as IT Staff in a manufacturing environment. My
                  actual responsibilities extend far beyond basic IT support: working across
                  hardware, Windows systems, servers, plant networking, CCTV, printers, custom ERP
                  applications, SQL Server databases, websites, troubleshooting, and internal
                  administrative tooling.
                </p>
              </div>

              {/* Card 3: Investigative Mindset */}
              <div className="rounded-xl border border-(--border) bg-(--surface) p-6 flex flex-col hover:border-(--accent)/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20 transition-all duration-200">
                <div className="text-xs font-mono text-(--accent) uppercase tracking-wider mb-2">
                  03 / Methodology
                </div>
                <h3 className="text-lg font-bold text-(--text-primary) mb-3">
                  Investigative Mindset
                </h3>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                  In an active manufacturing plant, technical issues rarely arrive neatly
                  categorized. My approach is investigative: observe the problem, identify possible
                  failure causes, test hypotheses, evaluate fixes, and determine the root cause.
                  Understand the problem before choosing the technology.
                </p>
              </div>
            </div>

            {/* Direction Banner */}
            <div className="mt-8 rounded-xl border border-(--border) bg-(--surface)/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-(--accent)/40 transition-colors duration-200">
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
          </Reveal>
        </Container>
      </section>

      {/* 3. Professional Experience Section */}
      <section id="experience" className="w-full">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="CAREER HISTORY"
              title="Professional Experience"
              description="Broad hands-on operational and software responsibilities in an active manufacturing facility."
            />
          </Reveal>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <Reveal key={exp.id} delayMs={idx * 100}>
                <div className="rounded-xl border border-(--border) bg-(--surface) p-6 sm:p-8 hover:border-(--accent)/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20 transition-all duration-200">
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
                            {domain.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2">
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
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Featured Projects Section */}
      <section id="projects" className="w-full">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="PORTFOLIO WORK"
              title="Featured Projects"
              description="Practical desktop applications, modern web projects, and operational case studies engineered around real-world constraints."
            />

            <ProjectRail projects={featuredProjects} />
          </Reveal>
        </Container>
      </section>

      {/* 5. Skills Section */}
      <section id="skills" className="w-full">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="TECHNICAL CAPABILITIES"
              title="Skills &amp; Technologies"
              description="Technologies and systems with genuine, hands-on operational and development exposure."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, idx) => (
              <Reveal key={category.title} delayMs={idx * 60}>
                <div className="rounded-xl border border-(--border) bg-(--surface) p-6 flex flex-col h-full hover:border-(--accent)/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20 transition-all duration-200">
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
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="w-full">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-(--border) bg-(--surface) p-8 sm:p-12 text-center max-w-3xl mx-auto hover:border-(--accent)/30 transition-colors duration-200">
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
                  variant="cta"
                  size="md"
                  href={contact.whatsapp.url}
                  isExternal
                  showArrow
                  aria-label={contact.whatsapp.ariaLabel}
                >
                  {contact.whatsapp.label}
                </Button>
                <Button
                  variant="cta"
                  size="md"
                  href={contact.email.url}
                  isExternal
                  showArrow
                  aria-label={contact.email.ariaLabel}
                >
                  {contact.email.label}
                </Button>
                <Button
                  variant="cta"
                  size="md"
                  href={contact.github.url}
                  isExternal
                  showArrow
                  aria-label={contact.github.ariaLabel}
                >
                  {contact.github.label}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
