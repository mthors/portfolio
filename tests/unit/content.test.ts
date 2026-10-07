import { describe, it, expect } from "vitest";
import { getAllProjects, getFeaturedProjects, getProjectBySlug } from "@/content/projects";
import { getExperiences } from "@/content/experience";
import { getSkillCategories } from "@/content/skills";
import { ProjectSchema } from "@/types/project";

describe("Content Architecture & Project Schema", () => {
  it("provides initial data-driven projects matching Zod schema", () => {
    const allProjects = getAllProjects();
    expect(allProjects.length).toBeGreaterThanOrEqual(3);

    for (const project of allProjects) {
      const result = ProjectSchema.safeParse(project);
      expect(result.success).toBe(true);
    }
  });

  it("contains the three required initial projects with accurate metadata", () => {
    const ldis = getProjectBySlug("ldis");
    expect(ldis).toBeDefined();
    expect(ldis?.title).toContain("Lightweight Desktop Inventory System");
    expect(ldis?.technologies).toContain("C#");
    expect(ldis?.technologies).toContain("SQLite");

    const outsole = getProjectBySlug("outsole-catalog");
    expect(outsole).toBeDefined();
    expect(outsole?.title).toContain("Outsole Catalog");
    expect(outsole?.technologies).toContain("React");
    expect(outsole?.technologies).toContain("TypeScript");

    const manufacturingIt = getProjectBySlug("manufacturing-it-erp");
    expect(manufacturingIt).toBeDefined();
    expect(manufacturingIt?.title).toContain("Manufacturing IT");
    expect(manufacturingIt?.technologies).toContain("SQL Server");
    expect(manufacturingIt?.technologies).toContain("Crystal Reports");
  });

  it("returns featured projects correctly", () => {
    const featured = getFeaturedProjects();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach((p) => expect(p.featured).toBe(true));
  });

  it("provides authentic professional experience entries", () => {
    const experiences = getExperiences();
    expect(experiences.length).toBeGreaterThan(0);
    const primaryExp = experiences[0];
    expect(primaryExp.role).toBe("IT Staff");
    expect(primaryExp.organization).toBe("Manufacturing Company");
    expect(primaryExp.responsibilities.length).toBeGreaterThan(0);
    expect(primaryExp.domains?.length).toBe(4);
    expect(primaryExp.technologies).toContain("Windows Server");
    expect(primaryExp.technologies).toContain("Microsoft SQL Server");
  });

  it("provides authentic categorized skills", () => {
    const categories = getSkillCategories();
    expect(categories.length).toBe(4);
    const titles = categories.map((c) => c.title);
    expect(titles).toContain("Software Development");
    expect(titles).toContain("Data & Reporting");
    expect(titles).toContain("Infrastructure & Systems");
    expect(titles).toContain("Engineering Practices");

    for (const cat of categories) {
      expect(cat.skills.length).toBeGreaterThan(0);
    }
  });
});
