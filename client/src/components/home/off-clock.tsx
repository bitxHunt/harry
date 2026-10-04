import { useState, type KeyboardEvent } from "react";
import { useSectionKeys } from "@/hooks/useSectionKeys";
import { Link } from "@tanstack/react-router";
import { offClock } from "@/data";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/terminal/section-head";
import { Terminal } from "@/components/terminal/terminal";

/*
  Life outside work as systemd user services: a `list-units` table on top, and the
  selected unit's `systemctl status` below. Arrow keys or j / k move the selection.
*/
export function OffClock() {
  const [index, setIndex] = useState(0);
  const unit = offClock[index];
  const next = (d: number) => setIndex((i) => (i + d + offClock.length) % offClock.length);
  // arrows inside the list; j/k whenever the section is on screen
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); next(1); }
    if (e.key === "ArrowUp") { e.preventDefault(); next(-1); }
  };
  useSectionKeys("off-clock", (e) => {
    if (e.key === "j") return next(1), true;
    if (e.key === "k") return next(-1), true;
    return false;
  });
  const cols = "grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-3 sm:grid-cols-[minmax(0,1fr)_64px_64px_80px_minmax(0,1.6fr)]";

  return (
    <section id="off-clock" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <SectionHead n={5} command="systemctl --user list-units 'life-*'" title="Off the clock" />
      <Terminal title="systemctl --user" className="reveal">
        <div className="font-mono text-[12.5px]" onKeyDown={onKey}>
          {/* list-units */}
          <div className={cn(cols, "border-b border-[var(--line)] px-5 py-2 text-dim")}>
            <span>UNIT</span>
            <span className="hidden sm:block">LOAD</span>
            <span className="hidden sm:block">ACTIVE</span>
            <span className="hidden sm:block">SUB</span>
            <span>DESCRIPTION</span>
          </div>
          <div role="listbox" aria-label="Life outside work" tabIndex={0} className="stagger py-1 outline-none focus-visible:ring-1 focus-visible:ring-holo/50">
            {offClock.map((o, i) => (
              <button
                key={o.unit}
                role="option"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                onMouseEnter={() => setIndex(i)}
                style={{ ["--i" as string]: i }}
                className={cn(
                  cols,
                  "w-full px-5 py-3 text-left transition-colors md:py-1.5",
                  i === index ? "bg-[color-mix(in_srgb,var(--holo-cyan)_14%,transparent)] text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="truncate"><span className="text-holo">●</span> {o.unit}.service</span>
                <span className="hidden sm:block">loaded</span>
                <span className="hidden text-holo sm:block">active</span>
                <span className="hidden text-holo sm:block">running</span>
                <span className="truncate">{o.title}</span>
              </button>
            ))}
          </div>
          <p className="border-b border-[var(--line)] px-5 pb-3 text-[11px] text-dim">{offClock.length} loaded units listed. Pick one to see its status.</p>

          {/* systemctl status <unit> */}
          <div key={unit.unit} className="animate-in fade-in px-5 py-5 duration-300">
            <p className="text-dim">
              <span className="text-arch">harry@arch</span> <span className="text-holo">~</span> % systemctl --user status {unit.unit}
            </p>
            <div className="mt-3 grid gap-x-4 gap-y-1 sm:grid-cols-[96px_minmax(0,1fr)]">
              <p className="sm:col-span-2">
                <span className="text-holo">●</span> <span className="text-foreground">{unit.unit}.service</span> <span className="text-dim">- {unit.title}</span>
              </p>
              <span className="text-dim sm:text-right">Loaded:</span>
              <span className="text-muted-foreground">loaded (~/.config/systemd/user/{unit.unit}.service; <span className="text-holo">enabled</span>)</span>
              <span className="text-dim sm:text-right">Active:</span>
              <span className="text-muted-foreground"><span className="text-holo">active (running)</span>{unit.since ? ` since ${unit.since}` : ""}</span>
              <span className="text-dim sm:text-right">Tags:</span>
              <span className="text-[var(--holo-violet)]">{unit.kicker}</span>
            </div>
            <p className="mt-4 max-w-3xl border-l-2 border-holo/40 pl-4 font-sans text-[15px] leading-relaxed text-muted-foreground">{unit.body}</p>
            {unit.link && (
              <p className="mt-4">
                <span className="text-dim">Docs: </span>
                <Link to="/articles/$slug" params={{ slug: unit.link.slug }} className="text-arch underline-offset-4 hover:underline">
                  {unit.link.label} →
                </Link>
              </p>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-[var(--line)] px-5 py-1.5 text-[11px] text-dim">
            <span>{index + 1}/{offClock.length}</span>
            <span className="hidden sm:inline">j k to move</span>
          </div>
        </div>
      </Terminal>
    </section>
  );
}
