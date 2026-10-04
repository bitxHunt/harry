import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScramble } from "@/hooks/useScramble";

// Section index drawn like a selection box in a TUI: [01] with corner brackets.
const IndexTag = ({ n }: { n: number }) => (
  <span className="relative grid size-14 shrink-0 place-items-center font-mono text-lg font-semibold text-holo [text-shadow:0_0_8px_color-mix(in_srgb,var(--holo-cyan)_45%,transparent)]">
    <span aria-hidden className="lock-on absolute left-0 top-0 size-3 border-l-2 border-t-2 border-holo/70 [--lx:-10px] [--ly:-10px]" />
    <span aria-hidden className="lock-on absolute right-0 top-0 size-3 border-r-2 border-t-2 border-holo/70 [--lx:10px] [--ly:-10px]" />
    <span aria-hidden className="lock-on absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-holo/70 [--lx:-10px] [--ly:10px]" />
    <span aria-hidden className="lock-on absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-holo/70 [--lx:10px] [--ly:10px]" />
    {String(n).padStart(2, "0")}
  </span>
);

// Decodes the title the first time it scrolls into view.
const ScrambleTitle = ({ text }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const out = useScramble(text, seen, 600);
  return <span ref={ref} aria-label={text}><span aria-hidden>{out}</span></span>;
};

export const SectionHead = ({ n, command, title, children }: { n: number; command: string; title: string; children?: ReactNode }) => (
  <div className="reveal mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-10 md:gap-6">
    <div className="flex min-w-0 items-center gap-5">
      <IndexTag n={n} />
      <div className="min-w-0">
        <p className="font-mono text-xs text-dim">
          <span className="text-arch">harry@arch</span> <span className="text-holo">~</span> % {command}
        </p>
        <h2 className="mt-1.5 text-[clamp(1.8rem,4.5vw,3rem)] font-bold uppercase leading-none tracking-tight">
          <ScrambleTitle text={title} />
        </h2>
      </div>
    </div>
    {children}
  </div>
);
