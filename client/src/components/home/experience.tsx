import { CalendarDays, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experiences } from "@/data/data";

export function Experience() {
  return (
    <section id="experience" className="border-t border-neutral-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-8 md:px-10 py-20">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-500 dark:text-indigo-300 mb-3">
            Work Experience
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Contributions</h2>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible>
          {experiences.map((e, i) => (
            <AccordionItem
              key={i}
              value={`experience-${i}`}
              className="border border-neutral-200 dark:border-white/10 rounded-2xl mb-4 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="hover:no-underline px-4 py-4 md:px-8 md:py-6 hover:bg-neutral-100/60 dark:hover:bg-neutral-700/40 transition-colors items-center">
                {/* Left: logo + role + org */}
                <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">
                  <div className="size-12 md:size-16 rounded-xl border border-neutral-200 dark:border-white/10 bg-white flex items-center justify-center shrink-0 overflow-hidden p-1">
                    <img
                      src={e.logo}
                      alt={`${e.org} logo`}
                      className="w-9 h-9 md:w-11 md:h-11 object-contain"
                    />
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="text-sm md:text-lg font-bold tracking-tight truncate">
                      {e.role}
                    </h3>
                    <p className="text-xs md:text-base text-indigo-500 dark:text-indigo-300 truncate">{e.org}</p>
                  </div>
                </div>

                {/* Year */}
                <span className="text-xs md:text-lg font-bold text-neutral-500 dark:text-neutral-200 tabular-nums shrink-0 mr-3">
                  {e.year}
                </span>
              </AccordionTrigger>

              {/* Expanded content */}
              <AccordionContent className="px-4 pb-6 md:px-8 md:pb-8">
                <div className="border-t border-neutral-200 dark:border-white/10 pt-6">
                  {/* Meta row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <CalendarDays className="size-4 shrink-0 text-indigo-300" />
                      <span>{e.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <MapPin className="size-4 shrink-0 text-indigo-300" />
                      <span>{e.location}</span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3">
                    {e.bullets.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-2 size-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
