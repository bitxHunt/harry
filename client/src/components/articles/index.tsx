import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, SlidersHorizontal, ArrowUpRight } from "lucide-react";

import { type Category } from "@/types/article.type";
import { type ArticlePost } from "@/types/article.type";
import { articles } from "@/data/data";

const categories: Category[] = ["All", "Events", "Community", "Life", "Dev"];

function FilterPanel({
  selected,
  onSelect,
}: {
  selected: Category;
  onSelect: (c: Category) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium uppercase tracking-widest text-indigo-500 dark:text-indigo-300 mb-4">
        Category
      </p>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`text-left text-sm px-3 py-2.5 rounded-xl transition-all duration-200 ${
            selected === c
              ? "bg-indigo-500 text-white font-medium"
              : "text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function ArticleCard({ post }: { post: ArticlePost }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col gap-4 p-6 rounded-2xl border border-neutral-200 dark:border-white/20 hover:border-indigo-300/60 dark:hover:border-indigo-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10 transition-all duration-300 cursor-pointer bg-white dark:bg-neutral-950"
    >
      {/* Meta row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="rounded-full text-xs font-normal px-2.5"
          >
            {post.category}
          </Badge>
          <Badge
            variant="outline"
            className="rounded-full text-xs font-normal px-2.5 text-neutral-400 border-neutral-200 dark:border-white/10"
          >
            {post.tag}
          </Badge>
        </div>
        <span className="text-xs text-neutral-400 tabular-nums shrink-0">
          {post.date} · {post.readTime}
        </span>
      </div>

      {/* Title + excerpt */}
      <div className="flex-1">
        <h3 className="text-base font-semibold tracking-tight leading-snug mb-2 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      {/* Read more */}
      <div className="flex items-center gap-1 text-xs text-neutral-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors duration-200 pt-1">
        Read more <ArrowUpRight className="h-3 w-3" />
      </div>
    </Link>
  );
}

export function ArticlesPage() {
  const [selected, setSelected] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = articles.filter((p) => {
    const matchCategory = selected === "All" || p.category === selected;
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-8 md:px-10 py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-500 dark:text-indigo-300 mb-3">
            Writing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Articles
          </h1>
          <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-lg leading-relaxed">
            Things I've learnt, done, and thought about. A mix of stories,
            community work, and technical reflections.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-8 md:px-10 py-12">
        {/* Search + mobile filter */}
        <div className="flex gap-3 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-full"
            />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="md:hidden rounded-full gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
                {selected !== "All" && (
                  <span className="bg-indigo-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-medium">
                    1
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-60 pt-12">
              <FilterPanel
                selected={selected}
                onSelect={(c) => {
                  setSelected(c);
                  setMobileOpen(false);
                }}
              />
              {selected !== "All" && (
                <>
                  <Separator className="my-4" />
                  <button
                    onClick={() => {
                      setSelected("All");
                      setMobileOpen(false);
                    }}
                    className="text-xs text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Clear filter ×
                  </button>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-12">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block w-40 shrink-0">
            <div className="sticky top-24">
              <FilterPanel selected={selected} onSelect={setSelected} />
              {selected !== "All" && (
                <>
                  <Separator className="my-5" />
                  <button
                    onClick={() => setSelected("All")}
                    className="text-xs text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Clear filter ×
                  </button>
                </>
              )}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <p className="text-xs text-neutral-400 mb-6 tabular-nums">
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            </p>

            {filtered.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-5">
                {filtered.map((p) => (
                  <ArticleCard key={p.id} post={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 gap-2 text-center">
                <p className="text-sm font-medium text-neutral-500">
                  No articles found
                </p>
                <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                  Try a different search term or clear the category filter
                </p>
                <button
                  onClick={() => {
                    setSelected("All");
                    setSearch("");
                  }}
                  className="text-xs text-indigo-500 dark:text-indigo-300 hover:underline mt-1"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
