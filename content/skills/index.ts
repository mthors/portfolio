import { SkillCategory } from "@/types/skills";

export const skillCategories: SkillCategory[] = [
  {
    title: "Software Development",
    skills: [
      "C#",
      ".NET / .NET Framework",
      "WinForms",
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "PHP",
      "Laravel",
      "Python",
      "HTML / CSS",
    ],
  },
  {
    title: "Data & Reporting",
    skills: [
      "Microsoft SQL Server",
      "SQLite",
      "PostgreSQL / Supabase",
      "MySQL",
      "Mongo DB",
      "Crystal Reports",
      "Excel & Data Processing",
    ],
  },
  {
    title: "Infrastructure & Systems",
    skills: [
      "Windows & Windows Server",
      "Linux",
      "Mikrotik",
      "Networking & Cabling",
      "PC Hardware & Software Support",
      "CCTV & Printer",
      "Docker",
      "Node",
      "Git / GitHub",
    ],
  },
  {
    title: "Engineering Practices",
    skills: [
      "REST APIs",
      "Automated Testing",
      "Vitest",
      "Playwright",
      "CI/CD Pipelines",
      "GitHub Actions",
    ],
  },
];

export function getSkillCategories(): SkillCategory[] {
  return skillCategories;
}
