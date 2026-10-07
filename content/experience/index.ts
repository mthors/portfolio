import { ExperienceItem } from "@/types/experience";

export const experiences: ExperienceItem[] = [
  {
    id: "it-staff-manufacturing",
    role: "IT Staff",
    organization: "Manufacturing Company",
    period: "May 2022 to Present",
    description:
      "Hands-on IT responsibility across plant infrastructure, enterprise business applications, databases, and internal software development. Working in an active manufacturing environment where IT problems rarely arrive neatly categorized, requiring systematic investigation across hardware, operating systems, networks, databases, applications, configuration, and user workflows.",
    responsibilities: [
      "Diagnose and resolve cross-layer technical incidents spanning hardware, network connectivity, databases, operating systems, and user workflows.",
      "Support and maintain enterprise custom legacy ERP operations, Microsoft SQL Server databases, and Crystal Reports data exports.",
      "Administer plant IT infrastructure including Windows Server, shop-floor PCs, networking equipment, CCTV installations, and network printers.",
      "Develop and maintain practical internal tools, web applications, and database automation to solve operational bottlenecks.",
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
          "Custom legacy enterprise ERP support and operational troubleshooting",
          "Microsoft SQL Server query writing, index inspection, and data verification",
          "Crystal Reports design and operational reporting automation",
          "Fingerspot biometric attendance system integration and maintenance",
          "Website administration and Shopify store catalog management",
        ],
      },
      {
        category: "Software & Practical Tooling",
        items: [
          "Internal web application development and maintenance",
          "SQL database troubleshooting and ad-hoc data correction scripts",
          "Practical desktop tooling (C# / WinForms) to streamline manual workflows",
          "Programming practical automations to resolve recurring operational issues",
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
