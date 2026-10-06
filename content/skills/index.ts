import { SkillCategory } from "@/types/skills";

export const skillCategories: SkillCategory[] = [
  {
    title: "Software Development",
    skills: [
      "C#",
      ".NET Framework",
      "WinForms",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "PHP",
    ],
  },
  {
    title: "Databases & Reporting",
    skills: [
      "SQL Server",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Crystal Reports",
      "Excel Data Workflows",
    ],
  },
  {
    title: "Infrastructure & IT",
    skills: [
      "Windows Server / OS",
      "Networking & Subnets",
      "Hardware Support",
      "CCTV Systems",
      "Network Printers",
      "Operational Troubleshooting",
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      "Git / GitHub",
      "Docker",
      "Visual Studio",
      "VS Code",
      "Postman",
      "Supabase",
      "Linux/VPS (In Progress)",
    ],
  },
];

export function getSkillCategories(): SkillCategory[] {
  return skillCategories;
}
