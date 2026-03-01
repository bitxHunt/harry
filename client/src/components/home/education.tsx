import { Badge } from "@/components/ui/badge";
import { education } from "@/data/data";

export function Education() {
  return (
    <section className="bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-sky-500 mb-3">
            Education
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Background</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-200 dark:bg-white/10 md:left-[7px]" />

          <div className="flex flex-col gap-12">
            {education.map((e, i) => (
              <div key={i} className="relative pl-10">
                {/* Dot */}
                <div className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-sky-500 bg-white dark:bg-neutral-950" />

                {/* Card */}
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 transition-colors overflow-hidden">
                  <div className="grid md:grid-cols-[200px_1fr]">
                    {/* Logo panel */}
                    <div className="flex items-center justify-center bg-white dark:bg-neutral-800 p-8 min-h-40">
                      <img
                        src={e.image}
                        alt={e.imageAlt}
                        className="w-full max-w-[140px] max-h-[100px] object-contain"
                        onError={(ev) => {
                          (ev.currentTarget as HTMLImageElement).src =
                            `https://placehold.co/400x200/f5f5f5/a3a3a3?text=${encodeURIComponent(e.school)}`;
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center gap-3 p-8">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="secondary"
                          className="rounded-full text-xs font-normal px-2.5"
                        >
                          {e.status}
                        </Badge>
                        <span className="text-xs text-neutral-400 tabular-nums">
                          {e.period}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold tracking-tight mb-0.5">
                          {e.degree}
                        </h3>
                        <p className="text-sm text-sky-500 font-medium">
                          {e.school}
                        </p>
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {e.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
