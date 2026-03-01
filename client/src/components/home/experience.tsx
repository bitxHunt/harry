import { Badge } from "@/components/ui/badge";

import { experiences } from "@/data/data";

export function Experience() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sky-500 mb-3">
              Experience
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              Contributions
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {experiences.map((e, i) => (
            <div
              key={i}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-white/10 flex flex-col gap-4 hover:border-neutral-300 dark:hover:border-white/20 transition-colors"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <Badge
                  variant="secondary"
                  className="rounded-full text-xs font-normal px-2.5"
                >
                  {e.type}
                </Badge>
                <span className="text-xs text-neutral-400 tabular-nums shrink-0">
                  {e.period}
                </span>
              </div>

              {/* Role */}
              <div>
                <h3 className="text-base font-semibold tracking-tight mb-0.5">
                  {e.role}
                </h3>
                <p className="text-sm text-sky-500">{e.org}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
