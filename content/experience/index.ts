import { ExperienceItem } from "@/types/experience";

export const experiences: ExperienceItem[] = [
  {
    id: "it-staff-manufacturing",
    role: "IT Staff",
    organization: "Manufacturing Company",
    period: "May 2022 to Present",
    description:
      "Responsible for plant IT infrastructure, business systems, databases, and internal software tools. Handle day-to-day operational support and cross-layer technical troubleshooting spanning hardware, Windows systems, networking, SQL Server, and user workflows.",
    responsibilities: [
      "Diagnose and resolve cross-layer technical incidents spanning hardware, network connectivity, databases, operating systems, and user workflows.",
      "Maintain custom manufacturing ERP operations, query Microsoft SQL Server databases, and generate operational Crystal Reports.",
      "Administer plant IT infrastructure including Windows Server, shop-floor PCs, networking equipment, CCTV installations, and network printers.",
      "Develop desktop tools and web utilities to eliminate repetitive manual data entry and streamline daily staff workflows.",
      "Support technology-related business operations including payroll-related processes, BPJS administration, and government reporting.",
    ],
    domains: [
      {
        category: "Infrastructure & Systems",
        items: [
          "Windows Server administration and workstation maintenance",
          "PC and laptop hardware diagnostics, repairs, and OS troubleshooting",
          "Plant networking, cabling, switch configurations, and connectivity support",
          "CCTV camera systems, network printers, and peripheral hardware support",
        ],
      },
      {
        category: "Business Applications",
        items: [
          "Custom ERP application support and operational troubleshooting",
          "Microsoft SQL Server query writing, data correction, and verification",
          "Crystal Reports design and operational reporting automation",
          "Fingerspot biometric attendance system maintenance and data synchronization",
          "Website administration and Shopify store catalog management",
        ],
      },
      {
        category: "Software & Practical Tooling",
        items: [
          "Internal web application development and maintenance",
          "SQL database troubleshooting and ad-hoc data correction scripts",
          "Custom desktop tooling (C# and WinForms) for local inventory workflows",
          "Internal web interfaces and helper scripts to automate routine tasks",
        ],
      },
      {
        category: "Operations & Administration",
        items: [
          "Payroll-related technical calculations and data processing",
          "BPJS employee insurance administration and system synchronization",
          "Government statutory reporting and compliance data submissions",
          "Multi-department technical user support and workflow guidance",
        ],
      },
    ],
    technologies: [
      "Windows Server",
      "Microsoft SQL Server",
      "ERP Systems",
      "Crystal Reports",
      "Networking",
      "C# / WinForms",
      "TypeScript / Web",
      "Shopify",
    ],
  },
];

export function getExperiences(): ExperienceItem[] {
  return experiences;
}
