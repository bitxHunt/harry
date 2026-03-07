import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/data";

export function Projects() {
  return (
    <section id="projects" className="border-t border-neutral-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-500 mb-3">
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
              className="border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30 transition-colors rounded-2xl"
            >
              <CardContent className="p-6 flex flex-col h-full gap-4">
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
                <div className="flex gap-2 pt-1">
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
