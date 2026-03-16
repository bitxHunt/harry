import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArticleLayoutProps {
  title: string;
  category: string;
  tag: string;
  date: string;
  readTime: string;
  children?: React.ReactNode;
}

export function ArticleLayout({
  title,
  category,
  tag,
  date,
  readTime,
  children,
}: ArticleLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-12">
          <Link
            to="/articles"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-black dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-3 w-3" /> Back to articles
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Badge
              variant="secondary"
              className="rounded-full text-xs font-normal px-2.5"
            >
              {category}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full text-xs font-normal px-2.5 text-neutral-400 border-neutral-200 dark:border-white/10"
            >
              {tag}
            </Badge>
            <span className="text-xs text-neutral-400 tabular-nums">
              {date} · {readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div
          className="
          [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4
          [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2
          [&_p]:text-base [&_p]:text-neutral-600 dark:[&_p]:text-neutral-400 [&_p]:leading-relaxed [&_p]:mb-4
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:text-neutral-600 dark:[&_ul]:text-neutral-400
          [&_li]:mb-1.5 [&_li]:leading-relaxed
          [&_strong]:font-semibold [&_strong]:text-black dark:[&_strong]:text-white
          [&_blockquote]:border-l-2 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-500 [&_blockquote]:my-6
        "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
