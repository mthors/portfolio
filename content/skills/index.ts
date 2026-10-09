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
      "HTML / CSS",
    ],
  },
  {
    title: "Data & Reporting",
    skills: [
      "Microsoft SQL Server",
      "SQLite",
      "PostgreSQL / Supabase",
      "Crystal Reports",
      "Excel & Data Processing",
    ],
  },
  {
    title: "Infrastructure & Systems",
    skills: [
      "Windows",
      "Windows Server",
      "Networking & Cabling",
      "PC Hardware Support",
      "CCTV & Peripherals",
      "Docker",
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
