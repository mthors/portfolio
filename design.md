# Portfolio Website --- Design System & UI Specification

**Project:** Moh Thoriqi Sahal --- IT Engineer & Software Developer
Portfolio\
**Status:** Initial Design Specification\
**Design Reference:** Dark modern portfolio concept generated for this
project\
**Primary Goal:** Present real-world IT, software development,
infrastructure, and business-system experience in a professional,
extensible portfolio.

------------------------------------------------------------------------

## 1. Design Direction

The portfolio should feel like a **professional engineer's workspace**,
not a generic "developer template".

### Visual personality

-   Dark, technical, modern
-   Professional but not corporate-boring
-   Cyan/blue accent used for emphasis and interaction
-   Strong typography and generous spacing
-   Subtle borders and soft card surfaces
-   Minimal animation; motion should communicate state, not decorate the
    page
-   Screenshots and project outcomes are more important than decorative
    graphics

### Core message

> **Building practical solutions for real-world operations.**

The visual language should reinforce the combination of:

1.  Software development
2.  IT infrastructure
3.  Manufacturing/business systems
4.  Continuous learning and engineering discipline

------------------------------------------------------------------------

## 2. Color System

Use CSS variables/tokens so the entire theme can be changed without
editing individual components.

``` css
:root {
  --bg-primary: #07111f;
  --bg-secondary: #0b1727;
  --surface: #101f31;
  --surface-hover: #14263a;
  --border: #24384d;

  --text-primary: #f4f7fb;
  --text-secondary: #a9b7c7;
  --text-muted: #718195;

  --accent: #20d7f5;
  --accent-hover: #43e2fa;
  --accent-soft: rgba(32, 215, 245, 0.12);

  --success: #4ade80;
  --warning: #facc15;
  --danger: #fb7185;
}
```

The implementation should keep color tokens centralized so a future
light theme or alternate accent can be added without redesigning
components.

------------------------------------------------------------------------

## 3. Typography

Recommended:

-   Primary font: Inter or Geist
-   Monospace accent: JetBrains Mono or similar

Hierarchy:

-   H1: very large, bold, responsive
-   H2: 32--48px desktop
-   H3: 20--28px
-   Body: 16--18px
-   Metadata: 12--14px
-   Code/technology labels: monospace or compact UI typography

Avoid excessive all-caps text. Uppercase labels are reserved for small
section eyebrows such as:

`IT ENGINEER & SOFTWARE DEVELOPER`

------------------------------------------------------------------------

## 4. Navigation

Desktop:

-   Logo/initials on the left
-   Home
-   Projects
-   Experience
-   Skills
-   About
-   Contact
-   Download CV CTA

Mobile:

-   Logo/initials
-   Compact menu button
-   Full-screen or dropdown navigation

Navigation should remain accessible and keyboard-friendly.

------------------------------------------------------------------------

## 5. Hero Section

### Layout

Two-column desktop layout:

**Left** - Eyebrow - Main headline - Supporting paragraph - Primary CTA:
View Projects - Secondary CTA: Get In Touch - Small experience/stat
indicators

**Right** - Developer workspace / code environment visual - Subtle
decorative technical elements

### Copy direction

Eyebrow:

> IT ENGINEER & SOFTWARE DEVELOPER

Headline:

> Building Practical Solutions for Real-World Operations.

Supporting copy should communicate that the portfolio owner works across
software, infrastructure, and manufacturing/business systems.

### Hero stats

Examples:

-   3+ Years Experience
-   Software Development
-   IT Infrastructure & Support
-   Business Systems & Reporting

These should be data-driven rather than hardcoded into a visual
component.

------------------------------------------------------------------------

## 6. Featured Projects

This is the most important section after the hero.

Project cards should be generated from structured project data, not
manually duplicated JSX/HTML.

Each project contains:

-   Title
-   Short description
-   Long description
-   Hero image
-   Technologies
-   Category
-   Status
-   Featured flag
-   GitHub URL
-   Live demo URL
-   Case-study URL
-   Highlights
-   Challenges
-   Engineering decisions
-   Results

### Initial featured projects

#### LDIS --- Lightweight Desktop Inventory System

Positioning:

> Windows 7-compatible inventory management application designed for
> low-spec factory and warehouse environments.

Technologies:

-   C#
-   .NET Framework
-   WinForms
-   SQLite
-   Excel import
-   Automated testing

#### Outsole Catalog & Digital Showcase

Positioning:

> Modern web application for showcasing outsole products and handling
> product inquiries.

Technologies:

-   React
-   TypeScript
-   Supabase
-   PostgreSQL
-   Git/GitHub

#### Manufacturing IT & ERP Systems

Positioning:

> Real-world IT infrastructure and business-system support in a
> manufacturing environment.

Technologies/areas:

-   SQL Server
-   ERP
-   Crystal Reports
-   Windows
-   Networking
-   Hardware
-   Reporting

This third item may be a case study rather than a public software
project.

------------------------------------------------------------------------

## 7. Project Card Design

Each card contains:

1.  Image
2.  Category/status badge
3.  Project title
4.  One-to-three sentence description
5.  Technology chips
6.  Primary action
7.  Optional secondary action

Example:

``` text
[ Project Screenshot ]

FEATURED

Lightweight Desktop Inventory System

Windows 7-compatible inventory management
application for factory and warehouse environments.

[C#] [.NET] [WinForms] [SQLite]

[View Details] [GitHub]
```

Avoid showing ten or fifteen technology badges on the card. Keep the
card readable.

------------------------------------------------------------------------

## 8. Project Detail / Case Study

Every substantial project should support a dedicated detail page.

Recommended structure:

1.  Project hero
2.  Problem
3.  Goals
4.  Constraints
5.  Architecture
6.  Key features
7.  Engineering decisions
8.  Screenshots
9.  Testing and quality
10. Deployment
11. Lessons learned
12. Links

This is especially important for LDIS because the engineering
constraints are part of the project's value.

------------------------------------------------------------------------

## 9. Technical Skills

Group skills by capability rather than producing one giant logo wall.

### Software Development

-   C#
-   .NET Framework
-   WinForms
-   PHP
-   JavaScript
-   React
-   HTML/CSS

### Databases & Reporting

-   SQL Server
-   MySQL
-   PostgreSQL
-   SQLite
-   Crystal Reports
-   Excel/reporting workflows

### Infrastructure & IT

-   Windows
-   Networking
-   Servers
-   Hardware
-   Printers
-   CCTV
-   Troubleshooting

### Tools & Workflow

-   Git
-   GitHub
-   Visual Studio
-   VS Code
-   Docker
-   Supabase
-   Postman
-   CI/CD tooling

Only display technologies that are genuinely used or actively being
learned. The portfolio itself will become the place to demonstrate newly
acquired DevOps skills.

------------------------------------------------------------------------

## 10. Experience

The experience section should emphasize responsibility and real-world
impact.

### IT Staff --- Manufacturing

Focus areas:

-   IT infrastructure
-   ERP support
-   SQL Server/database troubleshooting
-   Reporting
-   Government/BPJS reporting workflows
-   User support
-   Production/office systems
-   Hardware and network troubleshooting
-   Internal application support/development

Avoid exposing confidential company information.

------------------------------------------------------------------------

## 11. About Section

The About section should be human but professional.

Suggested direction:

> I'm an IT Engineer and Software Developer focused on practical systems
> that solve real operational problems. My experience spans
> manufacturing IT infrastructure, business systems, databases,
> reporting, and application development.

The section can include a subtle personal layer such as:

-   Gym
-   Gaming
-   Learning
-   Building things

Keep it secondary to the professional story.

------------------------------------------------------------------------

## 12. Contact Section

Keep it simple.

-   Email
-   GitHub
-   LinkedIn
-   Optional phone/contact method
-   Contact form

The contact form should have:

-   Name
-   Email
-   Message
-   Submit
-   Loading state
-   Success state
-   Validation state
-   Error state

Do not expose private contact information in frontend source unless
intentionally public.

------------------------------------------------------------------------

## 13. Responsive Behavior

### Desktop

-   Wide content container
-   Two-column hero
-   Multi-column project grid
-   Multi-column skill grid

### Tablet

-   Reduced grid columns
-   Hero may remain two-column if space allows
-   Navigation remains compact

### Mobile

-   Single-column content
-   Full-width cards
-   Simplified navigation
-   Touch-friendly buttons
-   No horizontal scrolling

Design for approximately:

-   360px
-   390px
-   768px
-   1024px
-   1440px+

------------------------------------------------------------------------

## 14. Motion

Use subtle motion only.

Recommended:

-   Fade/slide on section entry
-   Card hover elevation
-   Button hover/press
-   Image hover zoom of approximately 1--2%
-   Active navigation indicator

Avoid:

-   Constant floating animations
-   Excessive parallax
-   Large page transitions
-   Animations that delay access to content

Respect `prefers-reduced-motion`.

------------------------------------------------------------------------

## 15. Accessibility

Required:

-   Semantic HTML
-   Keyboard navigation
-   Visible focus states
-   Sufficient color contrast
-   Alt text for meaningful images
-   Decorative images marked appropriately
-   Labels for form fields
-   Error messages associated with inputs
-   Reduced-motion support

Target: WCAG 2.2 AA where practical.

------------------------------------------------------------------------

## 16. Content Architecture

The UI must not depend on hardcoded project cards.

Project content should be Git-controlled and stored as Markdown/MDX or structured data. The architecture must make adding future projects a content operation rather than a layout-code operation.

Recommended conceptual model:

```ts
type Project = {
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  status: string;
  shortDescription: string;
  description: string;
  image: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: string;
};
```

This allows future projects to be added by creating a new content entry instead of modifying layout code.


## 17. Component Philosophy

Components should be reusable and composable.

Suggested components:

-   `Navbar`
-   `Hero`
-   `SectionHeading`
-   `ProjectCard`
-   `ProjectGrid`
-   `ProjectDetail`
-   `SkillGroup`
-   `SkillCard`
-   `ExperienceCard`
-   `AboutSection`
-   `ContactForm`
-   `Footer`
-   `ThemeToggle`
-   `Button`
-   `Badge`

Do not create a separate component for every tiny visual element unless
it provides meaningful reuse.

------------------------------------------------------------------------

## 18. Future-Proofing

The portfolio should be designed to grow without requiring a database.

Adding a new project should generally mean adding:

1. Project content
2. Screenshots/assets
3. Metadata
4. Optional links

The project listing and routing system should discover/render the new project automatically.

A database may be introduced in a future version only if a real product requirement justifies dynamic data or content management.

Future additions may include:

- More projects
- Blog/articles
- Certifications
- Resume versions
- DevOps case studies
- Open-source projects
- Photography/gallery
- Project filtering
- Search
- Admin/content management if genuinely justified
- Analytics
- Dark/light theme
- Internationalization

The initial architecture should not require a rewrite when these features are added.


## 19. Design Principle

The portfolio should communicate:

> **I don't just know technologies. I use technology to solve real
> problems.**

The design exists to make that story obvious within the first 10--15
seconds.
