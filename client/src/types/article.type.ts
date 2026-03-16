export type Category = "All" | "Events" | "Community" | "Life" | "Dev";

export interface ArticlePost {
  id: number;
  title: string;
  excerpt: string;
  category: Exclude<Category, "All">;
  tag: string;
  date: string;
  readTime: string;
  slug: string;
}