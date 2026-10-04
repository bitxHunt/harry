import { type ArticlePost } from "@/types/article.type";

// Article previews for the Writing section and /articles. Full pages live in components/articles.
export const articles: ArticlePost[] = [
  {
    id: 1,
    title: "Founding a School Club",
    excerpt:
      "Starting something from zero is harder than it looks. Every SOP, recruitment drive and proposal had to be written from scratch, with no guarantee anyone shows up. Under a year, I managed to found an iOS development club to bring like-minded people, conducting workshops and competitions.",
    category: "Events",
    tag: "Club",
    date: "Mar 2025",
    readTime: "6 min read",
    slug: "founding-school-club",
  },
  {
    id: 3,
    title: "Brisk Walk Activities",
    excerpt:
      "Organizing brisk walk activities for seniors taught me the importance of patience, empathy, and thoughtful planning. Small community initiatives can create meaningful connections and bring people together.",
    category: "Community",
    tag: "Volunteering",
    date: "Jan 2025",
    readTime: "4 min read",
    slug: "brisk-walk",
  },
];
