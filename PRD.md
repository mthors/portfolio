# Portfolio Website --- Product Requirements Document

**Product Name:** Moh Thoriqi Sahal Portfolio\
**Project Type:** Personal professional portfolio / full-stack
engineering showcase\
**Status:** Planning\
**Version:** 1.0\
**Primary Objective:** Build, deploy, operate, and continuously improve
a production-quality portfolio website while using the project itself as
a hands-on full-stack, Docker, DevOps, CI/CD, testing, security, and
deployment learning project.

------------------------------------------------------------------------

# 1. Product Vision

Build a professional portfolio that presents real-world IT engineering
and software development experience while deliberately serving as a
laboratory for modern full-stack engineering practices.

The portfolio must be:

-   Professional enough to show to recruiters and clients
-   Easy to maintain
-   Easy to extend with future projects
-   Fast
-   Accessible
-   Secure
-   Mobile-friendly
-   SEO-friendly
-   Deployable through an automated pipeline
-   Containerized where appropriate
-   Observable in production
-   Backed by tests
-   Version-controlled with Git

The project is not merely a portfolio page.

It is also a practical demonstration of engineering maturity.

------------------------------------------------------------------------

# 2. Product Positioning

## Primary positioning

> **IT Engineer & Software Developer building practical solutions for
> real-world operations.**

The portfolio should emphasize the combination of:

-   Manufacturing IT
-   Infrastructure
-   Business systems
-   Database/reporting work
-   Desktop application development
-   Modern web development
-   Continuous technical growth

------------------------------------------------------------------------

# 3. Target Audience

## Primary

### Recruiters / Hiring Managers

Need to understand:

-   What the developer does
-   What technologies are genuinely used
-   What professional experience exists
-   What projects demonstrate engineering ability
-   How to contact the candidate

### Technical Interviewers

Need evidence of:

-   Architecture
-   Problem solving
-   Engineering tradeoffs
-   Testing
-   Git workflow
-   Deployment
-   DevOps
-   Technical communication

### Potential Clients / Collaborators

Need to quickly understand:

-   What can be built
-   What problems can be solved
-   Relevant experience
-   How to make contact

------------------------------------------------------------------------

# 4. Success Criteria

The product succeeds when a visitor can answer these questions within
approximately 30 seconds:

1.  Who is this person?
2.  What does he do?
3.  What real problems has he worked on?
4.  What technologies does he use?
5.  What projects can I inspect?
6.  How can I contact him?

Technical success additionally means:

-   Automated tests pass
-   Production build is reproducible
-   Deployment is automated
-   Docker workflow works
-   Security checks exist
-   Lighthouse/Core Web Vitals are strong
-   Application is accessible
-   Future projects can be added without rewriting the UI

------------------------------------------------------------------------

# 5. Initial Feature Set

## P0 --- Required for V1

### Homepage

-   Navigation
-   Hero
-   Featured projects
-   Skills
-   Experience
-   About
-   Contact
-   Footer

### Projects

-   Project listing
-   Project cards
-   Project detail pages
-   Technology tags
-   GitHub links
-   Live-demo links
-   Case-study content

### Contact

-   Contact form
-   Client-side validation
-   Server-side validation
-   Submission status
-   Spam protection
-   Email notification or managed form backend

### Responsive UI

Support:

-   Mobile
-   Tablet
-   Desktop

### SEO

-   Page titles
-   Meta descriptions
-   Open Graph metadata
-   Canonical URLs
-   Sitemap
-   Robots configuration
-   Structured metadata where appropriate

------------------------------------------------------------------------

# 6. P1 --- Engineering/DevOps Features

These features are deliberately included so the project can become a full-stack/DevOps learning environment.

## Docker

Development and/or production containerization.

Goals:

- Understand Docker images
- Understand containers
- Understand multi-stage builds
- Understand environment variables
- Understand Docker networking
- Understand image size optimization

## CI/CD

The portfolio should eventually build and deploy automatically from GitHub.

Planned pipeline:

```text
Push / Pull Request
        |
        v
Install dependencies
        |
        v
Lint
        |
        v
Type check
        |
        v
Unit tests
        |
        v
E2E tests
        |
        v
Production build
        |
        v
Docker build
        |
        v
Deployment
```

The project should introduce each technology only when its purpose is clear.


# 7. Technology Stack

The stack should be selected for learning value, maintainability, and suitability for a personal portfolio.

## Frontend

- TypeScript
- React
- Next.js
- Tailwind CSS

Next.js is preferred because the portfolio benefits from static generation/server rendering, strong SEO support, image optimization, routing, and server-side capabilities without requiring a separate backend service.

## Backend

V1 does not require a traditional backend service.

Use Next.js server capabilities only where a real requirement exists, such as:

- Contact form handling
- Server-side validation
- Security-sensitive operations

Do not create an Express/Nest/Fastify backend merely to make the project "more full-stack."

## Content / Project Data

The portfolio uses a Git-controlled content architecture.

Project content should be stored as Markdown/MDX or structured TypeScript data and rendered through reusable components.

Example conceptual structure:

```text
content/
└── projects/
    ├── ldis/
    ├── outsole-catalog/
    ├── manufacturing-it/
    └── future-project/
```

Adding a new project should require adding content/assets and metadata, not changing the portfolio layout code.

## Database — Intentionally None for V1

A database is **not required** for the portfolio.

This is an intentional architectural decision, not an omission.

A personal portfolio primarily contains content that changes infrequently and benefits from version control. Git-managed content provides:

- Simple maintenance
- Zero database cost
- No database administration
- No public database attack surface
- Easy backups through Git
- Reviewable content changes
- Straightforward CI/CD
- Excellent compatibility with static generation

The architecture must remain extensible, so a database can be introduced later if a genuine requirement appears.

Possible future triggers include:

- Dynamic content management
- Blog/editorial workflow
- Visitor accounts
- Analytics data that needs application-level storage
- Admin dashboard
- User-generated content

Do **not** add Firebase, Firestore, PostgreSQL, Supabase, or another database simply for the sake of having a database.

If a future requirement genuinely justifies a database, evaluate the options at that time.

## Firebase

Firebase is deliberately **not part of V1**.

Firebase should instead be learned through a separate project where its capabilities provide real value, such as a realtime application or another project that genuinely requires backend-as-a-service features.

This keeps the portfolio architecture simple while still leaving room to learn Firebase independently.


# 8. Content Architecture

Projects must be data-driven and Git-controlled.

The portfolio must support adding an effectively unlimited number of future projects without requiring changes to the project grid, routing architecture, or page layout components.

Example:

```ts
interface Project {
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  status: "active" | "completed" | "archived";
  shortDescription: string;
  description: string;
  image: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}
```

Adding a future project should normally require:

1. Adding its content
2. Adding screenshots/assets
3. Adding metadata
4. Optionally adding GitHub/live-demo links

No project grid or layout component should need modification.


# 9. Project Portfolio

Initial projects:

## Project 1 --- LDIS

**Lightweight Desktop Inventory System**

Key story:

-   C#
-   .NET Framework
-   WinForms
-   SQLite
-   Windows 7 compatibility
-   Inventory workflows
-   Excel import
-   Reporting
-   Automated tests
-   Packaging

The case study should emphasize engineering constraints and design
decisions.

------------------------------------------------------------------------

## Project 2 --- Outsole Catalog

**Outsole Catalog & Digital Showcase**

Key story:

-   Modern web development
-   React/TypeScript
-   Supabase
-   PostgreSQL
-   Git/GitHub
-   UI implementation
-   QA
-   Deployment workflow

------------------------------------------------------------------------

## Project 3 --- Manufacturing IT & ERP

This is a professional experience/case-study rather than necessarily a
public source-code project.

Possible topics:

-   Infrastructure
-   ERP
-   SQL Server
-   Reporting
-   Windows systems
-   Networking
-   Hardware
-   Production support

Sensitive company information must never be published.

------------------------------------------------------------------------

# 10. Project Detail Page

Each major project should support:

``` text
Overview
    ↓
Problem
    ↓
Constraints
    ↓
Solution
    ↓
Architecture
    ↓
Implementation
    ↓
Testing
    ↓
Deployment
    ↓
Lessons Learned
```

This structure demonstrates engineering thinking instead of only showing
screenshots.

------------------------------------------------------------------------

# 11. Authentication

V1:

-   No public user accounts
-   No authentication required for visitors

If an admin CMS is introduced later:

-   Authentication must be added
-   Admin routes must be protected
-   Secrets must remain server-side
-   Authorization must be explicit

Do not build authentication just because "full-stack apps need auth."

Only add it when there is a real requirement.

------------------------------------------------------------------------

# 12. Contact System

Requirements:

-   Name
-   Email
-   Message

Validation:

-   Required fields
-   Valid email format
-   Reasonable message length
-   Server-side validation

Security:

-   Rate limiting
-   Spam protection
-   Input sanitization
-   No secret exposure

Potential implementation options:

1.  Managed form service
2.  Server API + transactional email provider
3.  Supabase-backed contact messages

Select one after deployment architecture is chosen.

------------------------------------------------------------------------

# 13. Testing Strategy

Testing is part of the project, not an afterthought.

## Unit tests

Test:

-   Data transformation
-   Validation
-   Utility functions
-   Content parsing

## Component tests

Test:

-   Project cards
-   Navigation
-   Contact form
-   Interactive UI

## End-to-end tests

Use a browser automation framework such as Playwright.

Important flows:

-   Homepage loads
-   Navigation works
-   Project detail page works
-   Contact form validation works
-   Mobile navigation works

## Visual checks

At least manually verify:

-   Desktop
-   Tablet
-   Mobile
-   Dark theme
-   Keyboard navigation

------------------------------------------------------------------------

# 14. Code Quality

Required:

-   TypeScript strict mode
-   ESLint
-   Prettier
-   Consistent naming
-   No committed secrets
-   Environment variables for configuration
-   Clear Git history
-   Pull-request-style workflow even when working solo

Optional later:

-   Husky
-   lint-staged
-   commit hooks
-   conventional commits

------------------------------------------------------------------------

# 15. Git Workflow

Repository:

``` text
main
  |
  +---- feature/*
  +---- fix/*
  +---- chore/*
```

Rules:

-   `main` should remain deployable
-   Features should be developed in branches
-   Commits should describe meaningful changes
-   Avoid giant meaningless commits
-   Pull requests can be simulated through GitHub even as a solo
    developer
-   CI must run before merging

Example:

``` text
feat: add project detail pages
fix: improve mobile navigation
chore: configure Docker production build
test: add contact form e2e coverage
docs: document deployment architecture
```

------------------------------------------------------------------------

# 16. CI/CD

Use GitHub Actions or equivalent.

## Pull request pipeline

``` text
Push / Pull Request
        |
        v
Install dependencies
        |
        v
Lint
        |
        v
Type check
        |
        v
Unit tests
        |
        v
Build
        |
        v
E2E tests
```

A failed pipeline should prevent deployment.

------------------------------------------------------------------------

# 17. Docker

Create a production-quality Docker setup.

Goals:

-   Reproducible builds
-   Multi-stage image
-   Minimal runtime image
-   Non-root execution where supported
-   Environment configuration
-   Health check
-   `.dockerignore`

Expected workflow:

``` bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

Later:

``` text
GitHub
   ↓
GitHub Actions
   ↓
Docker build
   ↓
Container registry
   ↓
Production host/platform
```

------------------------------------------------------------------------

# 18. Deployment Strategy

Evaluate several deployment models before choosing.

## Option A --- Managed platform

Examples:

-   Vercel
-   Netlify
-   Cloudflare Pages/Workers

Advantages:

-   Fast deployment
-   Excellent for frontend/Next.js
-   Low maintenance

Disadvantage:

-   Less infrastructure/DevOps exposure

## Option B --- VPS + Docker

Architecture:

``` text
Internet
   |
   v
Domain
   |
   v
Reverse Proxy
   |
   v
Docker Container
   |
   v
Portfolio App
```

Possible tools:

-   VPS
-   Docker
-   Docker Compose
-   Caddy or Nginx
-   GitHub Actions
-   Container registry
-   HTTPS

Advantages:

-   Much more DevOps experience
-   Real Linux server administration
-   Networking
-   Reverse proxy
-   TLS
-   Containers
-   Deployment automation
-   Logs
-   Monitoring

Disadvantage:

-   More operational responsibility

### Recommended learning path

Use a managed platform first for rapid public availability, then deploy
the same application to a Docker-based VPS as a DevOps learning
exercise.

The production architecture should ultimately be chosen based on cost,
reliability, and learning goals.

------------------------------------------------------------------------

# 19. Domain & HTTPS

Production should use:

-   Custom domain
-   HTTPS
-   Automatic certificate renewal
-   Secure headers

Never expose a production site over plain HTTP when HTTPS is practical.

------------------------------------------------------------------------

# 20. Environment Management

Never commit:

``` text
.env
.env.local
API keys
database passwords
private tokens
```

Commit:

``` text
.env.example
```

Example:

``` env
PUBLIC_SITE_URL=
CONTACT_PROVIDER_API_KEY=
DATABASE_URL=
```

Actual values belong in:

-   Local environment
-   GitHub Actions secrets
-   Deployment platform secrets
-   VPS secret management

------------------------------------------------------------------------

# 21. Security Requirements

Baseline:

-   HTTPS
-   Security headers
-   Input validation
-   Rate limiting on contact endpoint
-   Spam protection
-   Dependency updates
-   Secret scanning
-   No sensitive information in client bundles
-   No company-confidential information
-   No exposed database credentials

Later:

-   Content Security Policy
-   Dependency vulnerability scanning
-   Container scanning
-   Automated security checks

------------------------------------------------------------------------

# 22. Performance

Target:

-   Fast initial load
-   Optimized images
-   Lazy loading where appropriate
-   Minimal JavaScript
-   Static generation wherever possible
-   Proper caching

Measure using:

-   Lighthouse
-   PageSpeed Insights
-   Browser DevTools
-   Core Web Vitals

Do not optimize based purely on theory. Measure first.

------------------------------------------------------------------------

# 23. SEO

Required:

-   Unique page titles
-   Meta descriptions
-   Canonical URLs
-   Open Graph metadata
-   Twitter/X metadata where useful
-   Sitemap
-   Robots.txt
-   Semantic headings
-   Structured data where appropriate

Project pages should have unique metadata.

------------------------------------------------------------------------

# 24. Accessibility

Target WCAG 2.2 AA where practical.

Requirements:

-   Semantic HTML
-   Keyboard navigation
-   Visible focus states
-   Accessible forms
-   Image alt text
-   Contrast
-   Reduced motion
-   Proper heading hierarchy

------------------------------------------------------------------------

# 25. Observability

Introduce basic production observability.

Possible tools:

-   Platform logs
-   Structured application logs
-   Error tracking
-   Uptime monitoring
-   Analytics

Potential future stack:

``` text
Application
   |
   +---- Logs
   |
   +---- Error Tracking
   |
   +---- Analytics
   |
   +---- Uptime Monitoring
```

Do not collect unnecessary personal data.

------------------------------------------------------------------------

# 26. Analytics

Analytics are optional for V1.

If implemented:

-   Prefer privacy-conscious analytics
-   Track page views
-   Track project detail views
-   Track outbound GitHub/live-demo clicks
-   Do not collect unnecessary personal information

------------------------------------------------------------------------

# 27. Documentation

Repository should eventually contain:

``` text
README.md
DESIGN.md
PRD.md
ARCHITECTURE.md
DEPLOYMENT.md
CONTRIBUTING.md
SECURITY.md
```

Documentation should explain not only how the application works, but why
major decisions were made.

------------------------------------------------------------------------

# 28. Suggested Repository Structure

A possible starting point:

``` text
portfolio/
├── app/
├── components/
├── content/
│   ├── projects/
│   ├── experience/
│   └── skills/
├── public/
│   ├── images/
│   └── icons/
├── lib/
├── tests/
│   ├── unit/
│   └── e2e/
├── .github/
│   └── workflows/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── DESIGN.md
├── PRD.md
├── ARCHITECTURE.md
├── DEPLOYMENT.md
├── README.md
└── package.json
```

The exact structure may change with the selected framework.

------------------------------------------------------------------------

# 29. Development Milestones

## M0 --- Planning

-   Finalize design
-   Finalize PRD
-   Choose framework
-   Create repository
-   Establish Git workflow

## M1 --- Project Bootstrap

-   Initialize application
-   Configure TypeScript
-   Configure styling
-   Configure linting
-   Configure formatting
-   Create base layout
-   Implement design tokens

## M2 --- Core Portfolio UI

-   Navigation
-   Hero
-   Projects
-   Skills
-   Experience
-   About
-   Contact
-   Footer

## M3 --- Project Content System

-   Data-driven projects
-   Project detail pages
-   Markdown/MDX or structured content
-   Dynamic routes
-   SEO metadata

## M4 --- Responsive & Accessibility

-   Mobile layout
-   Tablet layout
-   Keyboard navigation
-   Screen-reader checks
-   Reduced motion
-   Lighthouse pass

## M5 --- Testing

-   Unit tests
-   Component tests
-   Playwright E2E
-   CI test pipeline

## M6 --- Contact Backend

-   Contact API/form
-   Validation
-   Spam protection
-   Email delivery
-   Error handling

## M7 --- Docker

-   Development Docker workflow
-   Production Dockerfile
-   Multi-stage build
-   Health check
-   Container testing

## M8 --- CI/CD

-   GitHub Actions
-   Lint
-   Type check
-   Tests
-   Build
-   Docker build
-   Deployment

## M9 --- Production Deployment

-   Domain
-   HTTPS
-   Production environment
-   Monitoring
-   Error tracking
-   Backups if applicable

## M10 --- DevOps Lab

-   VPS
-   Linux administration
-   Docker Compose
-   Reverse proxy
-   TLS
-   Firewall
-   SSH hardening
-   Automated deployment
-   Container registry

This milestone is primarily for learning and may run alongside the
managed production deployment.

## M11 --- Continuous Improvement

Future projects should be added without changing the portfolio
architecture.

Potential additions:

-   Blog
-   Certifications
-   Open-source projects
-   More case studies
-   Search/filtering
-   Admin CMS
-   Internationalization
-   Theme switching
-   More advanced observability

------------------------------------------------------------------------

# 30. Definition of Done --- V1

The portfolio is V1-complete when:

-   [ ] Homepage is implemented
-   [ ] Responsive design works
-   [ ] LDIS is featured
-   [ ] Outsole project is featured
-   [ ] Manufacturing IT experience is represented
-   [ ] Project content is data-driven
-   [ ] Project detail pages work
-   [ ] Contact form works
-   [ ] SEO metadata exists
-   [ ] Accessibility baseline is met
-   [ ] Tests exist
-   [ ] CI passes
-   [ ] Production build works
-   [ ] Docker build works
-   [ ] No secrets are committed
-   [ ] Production deployment works
-   [ ] HTTPS is enabled
-   [ ] README and architecture documentation exist

------------------------------------------------------------------------

# 31. Definition of Done --- DevOps Learning Track

The project can be considered a successful full-stack/DevOps learning
project when the developer can personally explain and demonstrate:

-   [ ] How the frontend is built
-   [ ] How server-side code works
-   [ ] How API requests work
-   [ ] How environment variables work
-   [ ] How Git branches and PRs work
-   [ ] How CI runs
-   [ ] How Docker images are built
-   [ ] How containers run
-   [ ] How a reverse proxy works
-   [ ] How HTTPS works
-   [ ] How DNS points a domain to infrastructure
-   [ ] How logs are inspected
-   [ ] How errors are monitored
-   [ ] How deployments are rolled back
-   [ ] How secrets are managed
-   [ ] How production differs from development

The goal is understanding, not merely making commands pass.

------------------------------------------------------------------------

# 32. Engineering Philosophy

The portfolio itself should remain intentionally simple.

Learning a new technology does not automatically justify adding it to this application. If a technology does not solve a real portfolio requirement, learn it through a separate project instead.

This keeps the portfolio maintainable while allowing the developer's broader engineering journey to continue independently.



This project should deliberately avoid unnecessary complexity.

Use the simplest architecture that satisfies the requirement.

Do not add:

-   Kubernetes
-   Microservices
-   Redis
-   Kafka
-   Complex databases
-   Authentication
-   GraphQL
-   Separate backend services

unless a real requirement or a clearly defined learning experiment
justifies them.

The project should demonstrate:

> **Good engineering is not using the most technologies. Good
> engineering is choosing the right technologies for the problem.**

------------------------------------------------------------------------

# 33. Long-Term Vision

The portfolio should evolve alongside the developer.

Today:

``` text
IT Engineer
+
Software Developer
```

Future:

``` text
IT Engineer
+
Full-Stack Developer
+
DevOps
+
Cloud
+
Systems Engineering
```

The portfolio itself becomes evidence of that progression.

Every new project, deployment, automation, architecture decision, and
production lesson can become part of the story.
