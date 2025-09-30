export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  summary: string;
  tags: string[];
  articleId?: number;
};
export type Candidate = {
  id: number;
  name: string;
  title: string;
  category: "Senior" | "Difabel" | "Sindrom";
  skills: string[];
};
export type Article = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
};
