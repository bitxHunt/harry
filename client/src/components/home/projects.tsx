import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, BookOpen } from "lucide-react";
import { projects } from "@/data/data";

export function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-neutral-200 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-8 md:px-10 py-20">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-500 dark:text-indigo-300 mb-3">
            Projects
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Things I've built
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Card
              key={i}
              className="group flex flex-col border-neutral-200 dark:border-white/20 hover:border-indigo-300/60 dark:hover:border-indigo-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10 transition-all duration-300 rounded-2xl overflow-hidden p-0"
            >
              {/* Project image */}
              <div className="h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800/60">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 via-neutral-100 to-neutral-200 dark:from-indigo-500/10 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-600">
                      Preview
                    </span>
                  </div>
                )}
              </div>

              <CardContent className="p-6 flex flex-col gap-3 flex-1">
                {/* Highlight badge */}
                {p.highlight && (
                  <span className="text-xs text-neutral-400">
                    {p.highlight}
                  </span>
                )}

                {/* Title + description */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-full text-xs font-normal px-2.5"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-4 mt-auto">
                  {p.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs h-7 px-3"
                      asChild
                    >
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-3 w-3 mr-1" /> Code
                      </a>
                    </Button>
                  )}
                  {p.article && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs h-7 px-3"
                      asChild
                    >
                      <a
                        href={p.article}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BookOpen className="h-3 w-3 mr-1" /> Article
                      </a>
                    </Button>
                  )}
                  {p.live && (
                    <Button
                      size="sm"
                      className="rounded-full text-xs h-7 px-3"
                      asChild
                    >
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live <ArrowUpRight className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
