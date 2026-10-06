import { ExperienceItem } from "@/types/experience";

export const experiences: ExperienceItem[] = [
  {
    id: "it-staff-manufacturing",
    role: "IT Staff & Systems Support",
    organization: "Manufacturing Industry",
    period: "3+ Years Experience",
    description:
      "Responsible for end-to-end plant IT infrastructure, database troubleshooting, enterprise ERP maintenance, and internal reporting systems in an active production facility.",
    responsibilities: [
      "Manage and troubleshoot enterprise ERP operations and database query workflows (MSSQL)",
      "Automate statutory reporting and daily operational production exports (Crystal Reports & Excel)",
      "Maintain high-availability shop-floor network infrastructure, servers, workstations, and peripherals",
      "Develop custom internal utilities and desktop automation tools to streamline manual processes",
    ],
    technologies: [
      "SQL Server",
      "ERP",
      "Crystal Reports",
      "Windows Systems",
      "Networking",
      "C# / WinForms",
    ],
  },
];

export function getExperiences(): ExperienceItem[] {
  return experiences;
}
