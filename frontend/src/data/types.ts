export interface Profile {
  name: string;
  role: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
}

export interface Project {
  title: string;
  description: string;
  impact: string;
  stack: string[];
  image: string;
}

export interface Education {
  institution: string;
  title: string;
  period: string;
}
