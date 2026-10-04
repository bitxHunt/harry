import { useState } from "react";
import { experiences } from "@/data";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/terminal/section-head";
import { Terminal } from "@/components/terminal/terminal";

// Experience as `git log --graph`: each role is a commit, click to expand the diff.
export function Experience() {
  const [open, setOpen] = useState<string | null>(experiences[0].hash);

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <SectionHead n={2} command="git log --graph --oneline career" title="Experience" />
      <Terminal title="~/career — git log" className="reveal">
        <ol className="p-3 font-mono text-sm sm:p-5">
          {experiences.map((e, i) => {
            const expanded = open === e.hash;
            return (
              <li key={e.hash} className="relative grid grid-cols-[22px_minmax(0,1fr)] gap-3">
                <span className="relative flex justify-center" aria-hidden>
                  {i < experiences.length - 1 && <span className="draw-line absolute bottom-0 top-3 w-px bg-[var(--holo-violet)] opacity-50" style={{ ["--i" as string]: i }} />}
                  <span className="relative mt-2 size-2.5 rounded-full border-2 border-holo bg-background shadow-[0_0_10px_var(--holo-cyan)]" />
                </span>
                <div className="pb-5">
                  <button
                    onClick={() => setOpen(expanded ? null : e.hash)}
                    aria-expanded={expanded}
                    className="group flex w-full flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg px-2 py-1 text-left transition hover:bg-[color-mix(in_srgb,var(--holo-cyan)_6%,transparent)]"
                  >
                    <span className="text-[var(--holo-pink)]">{e.hash}</span>
                    {e.head && <span className="text-xs text-arch">(HEAD -&gt; now)</span>}
                    <span className="font-sans text-base font-semibold text-foreground">{e.role}</span>
                    <span className="font-sans text-muted-foreground">@ {e.org}</span>
                    <span className="ml-auto text-xs text-dim">{e.period}</span>
                  </button>
                  <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out", expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden">
                      <ul className="mt-2 space-y-1.5 px-2 font-sans text-[15px] leading-relaxed text-muted-foreground">
                        {e.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5"><span className="font-mono text-holo">+</span><span>{b}</span></li>
                        ))}
                      </ul>
                      <p className="mt-3 flex flex-wrap gap-1.5 px-2">
                        {e.tags.map((t) => (
                          <span key={t} className="rounded border border-[var(--line)] px-1.5 py-0.5 text-[10.5px] text-dim">#{t}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Terminal>
    </section>
  );
}
