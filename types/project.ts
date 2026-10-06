import { z } from "zod";

export const ProjectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  featured: z.boolean(),
  status: z.enum(["active", "completed", "archived", "in-progress"]),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  technologies: z.array(z.string()).min(1),
  highlights: z.array(z.string()).min(1),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
