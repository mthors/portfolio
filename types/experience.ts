export interface ExperienceDomain {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  responsibilities: string[];
  domains?: ExperienceDomain[];
  technologies: string[];
}
