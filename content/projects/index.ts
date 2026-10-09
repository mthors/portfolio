import { Project, ProjectSchema } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "ldis",
    title: "Lightweight Desktop Inventory System (LDIS)",
    category: "Desktop Application",
    featured: true,
    status: "completed",
    shortDescription:
      "A lightweight C# and SQLite desktop application built to automate periodic inventory recaps on constrained factory workstations.",
    description:
      "Built to solve an immediate operational need: storage staff required structured summaries of sold items across custom date ranges, but the existing system lacked periodic recap reporting. Designed for low-spec hardware and Windows 7 environments without heavy web dependencies, the application combines WinForms, an embedded SQLite database, a repository and service pattern, Excel import validation, and automated unit tests.",
    image: "/images/projects/ldis-preview.svg",
    technologies: [
      "C#",
      ".NET Framework",
      "WinForms",
      "SQLite",
      "Repository Pattern",
      "Excel Import",
      "Automated Testing",
    ],
    highlights: [
      "Automates multi-period stock and sales recaps missing from legacy factory software",
      "Targeted Windows 7 backward compatibility for legacy workstations without heavy web runtime overhead",
      "Embedded local SQLite database ensuring reliable, independent offline operation on factory floor terminals",
      "Repository/service architecture with automated tests verifying inventory calculations and constraint rules",
      "Excel import workflow to onboard product catalogs and inventory lists directly",
    ],
    githubUrl: "https://github.com/thoriqisahal/ldis",
  },
  {
    slug: "outsole-catalog",
    title: "Outsole Catalog & Digital Showcase",
    category: "Web Application",
    featured: true,
    status: "active",
    shortDescription:
      "Modern full-stack web application showcasing outsole products with structured querying and responsive interface.",
    description:
      "A project demonstrating practical modern web application development, transitioning from desktop tooling to modern browser architectures. Built with React, TypeScript, and Tailwind CSS on the frontend, backed by PostgreSQL and Supabase for structured product data management. Developed with Git-based version control, component-level testing, and automated deployment pipelines.",
    image: "/images/projects/outsole-catalog-preview.svg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Git/GitHub"],
    highlights: [
      "Modular component architecture built with React, TypeScript, and clean state separation",
      "Interactive product catalog with structured filtering and inquiry management",
      "Relational data model backed by PostgreSQL and Supabase",
      "Automated deployment pipeline and component testing backed by Git version control",
    ],
    githubUrl: "https://github.com/thoriqisahal/outsole-catalog",
    liveUrl: "https://outsole-catalog.demo",
  },
  {
    slug: "manufacturing-it-erp",
    title: "Manufacturing IT & Systems Operations",
    category: "Infrastructure & Systems Case Study",
    featured: true,
    status: "active",
    shortDescription:
      "Operational case study covering plant IT infrastructure, ERP maintenance, database troubleshooting, and reporting workflows.",
    description:
      "An operational case study reflecting hands-on IT Staff responsibilities in an active manufacturing facility. Covers hardware maintenance, plant networking, shop-floor PCs, CCTV, and network printers, alongside business applications including custom ERP systems, Microsoft SQL Server, and Crystal Reports. Details an investigative troubleshooting methodology across hardware, network, database, application, and workflow layers.",
    image: "/images/projects/manufacturing-it-preview.svg",
    technologies: [
      "SQL Server",
      "ERP Systems",
      "Crystal Reports",
      "Windows Server",
      "Networking",
      "Hardware Support",
    ],
    highlights: [
      "Investigative troubleshooting across hardware, operating systems, networking, databases, and user workflows",
      "Maintenance and query troubleshooting for custom legacy ERP running on Microsoft SQL Server",
      "Production and compliance reporting automation with Crystal Reports, Excel, and administrative data exports",
      "Physical and network infrastructure support maintaining operational continuity across office and shop-floor terminals",
    ],
  },
];

// Validate all projects at build time
projects.forEach((proj) => ProjectSchema.parse(proj));

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
