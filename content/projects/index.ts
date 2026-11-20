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
    image: "/images/projects/ldis.jpg",
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
    githubUrl: "https://github.com/mthors/ldis-ode-inventory",
  },
  {
    slug: "outsole-catalog",
    title: "B2B Outsole Catalog & Digital Showcase",
    category: "Web Application",
    featured: true,
    status: "active",
    shortDescription:
      "Modern full-stack web application showcasing outsole products with structured querying and responsive interface.",
    description:
      "A project demonstrating practical modern web application development, transitioning from desktop tooling to modern browser architectures. Built with React, TypeScript, and Tailwind CSS on the frontend, backed by PostgreSQL and Supabase for structured product data management. Developed with Git-based version control, component-level testing, and automated deployment pipelines.",
    image: "/images/projects/b2boutsole.jpg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Git/GitHub"],
    highlights: [
      "Modular component architecture built with React, TypeScript, and clean state separation",
      "Interactive product catalog with structured filtering and inquiry management",
      "Relational data model backed by PostgreSQL and Supabase",
      "Automated deployment pipeline and component testing backed by Git version control",
    ],
    //githubUrl: "https://github.com/mthors/outsole-webapp",
    liveUrl: "https://outsole.thorx.my.id",
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
    image: "/images/projects/manufacture.jpg",
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
  {
    slug: "honda-dealership",
    title: "Honda Satrya Dealer Group",
    category: "Full-Stack Web Application",
    featured: true,
    status: "active",
    shortDescription:
      "Digital motorcycle showroom developed for Honda dealership operations, featuring model catalogs, local OTR pricing, and inquiry management.",
    description:
      "A digital motorcycle showroom developed for Honda Satrya Dealer Group (Mega Persada Mandiri), allowing customers to explore motorcycle models, view local on-the-road pricing, and submit product inquiries through a responsive web application. Features include catalog exploration, unit detail pages, an administrative content management system, and customer inquiry export to Excel, backed by Supabase and PostgreSQL.",
    image: "/images/projects/honda-webapp.png",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Excel Export",
    ],
    highlights: [
      "Motorcycle catalog and product detail pages with responsive customer-facing interface",
      "Local dealership on-the-road (OTR) pricing calculation and display",
      "Product inquiry submission form with structured lead capture",
      "Admin functionality for managing dealership content and unit specifications",
      "Inquiry data export to Excel for sales follow-ups and operational reporting",
      "Relational database integration and backend functionality using Supabase and PostgreSQL",
    ],
    liveUrl: "https://honda.thorx.my.id",
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
