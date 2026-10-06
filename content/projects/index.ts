import { Project, ProjectSchema } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "ldis",
    title: "Lightweight Desktop Inventory System (LDIS)",
    category: "Desktop Application",
    featured: true,
    status: "completed",
    shortDescription:
      "Windows 7-compatible inventory management application designed for low-spec factory and warehouse environments.",
    description:
      "A desktop inventory solution engineered specifically for constrained legacy hardware environments in manufacturing and warehouse facilities. Features local SQLite persistence for reliable offline operation, WinForms desktop UI, Excel data import workflows, and comprehensive automated test coverage for inventory math and business rules.",
    image: "/images/projects/ldis-preview.svg",
    technologies: [
      "C#",
      ".NET Framework",
      "WinForms",
      "SQLite",
      "Excel Import",
      "Automated Testing",
    ],
    highlights: [
      "Targeted Windows 7 backward compatibility for legacy factory floor terminals",
      "Embedded SQLite database architecture eliminating external server dependencies",
      "Bulk inventory data import pipelines supporting Excel spreadsheets",
      "Automated unit testing suite verifying inventory calculations and constraint rules",
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
      "Modern web application for showcasing outsole products and handling product inquiries.",
    description:
      "A full-stack digital showcase platform designed to replace paper/manual catalogs with a fast, interactive digital experience for manufacturing clients. Features responsive UI components, product filtering, and backend database integration for structured product data management.",
    image: "/images/projects/outsole-catalog-preview.svg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Git/GitHub"],
    highlights: [
      "Interactive digital catalog streamlining customer inquiry processes",
      "Component-driven frontend built with React, TypeScript, and modern styling",
      "PostgreSQL database integration via Supabase for structured catalog storage",
      "Git-controlled code workflow with GitHub automated deployment pipeline",
    ],
    githubUrl: "https://github.com/thoriqisahal/outsole-catalog",
    liveUrl: "https://outsole-catalog.demo",
  },
  {
    slug: "manufacturing-it-erp",
    title: "Manufacturing IT & ERP Systems",
    category: "Infrastructure & Systems Case Study",
    featured: true,
    status: "active",
    shortDescription:
      "Real-world IT infrastructure and business-system support in a manufacturing environment.",
    description:
      "Operational engineering experience managing mission-critical IT infrastructure, enterprise ERP operations, database querying, and plant-wide system continuity. Covers SQL Server administration, Crystal Reports automation, compliance reporting, network maintenance, and hardware troubleshooting.",
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
      "Hands-on database maintenance, query writing, and reporting with SQL Server",
      "Automated production reporting and government/BPJS compliance data exports",
      "Maintenance and troubleshooting for manufacturing shop floor and office IT infrastructure",
      "Rapid incident response maintaining operational continuity in high-tempo manufacturing",
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
