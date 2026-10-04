import { useMemo, useRef, useState } from "react";
import { useSectionKeys } from "@/hooks/useSectionKeys";
import { experiences, projects, stack } from "@/data";
import { buildRows } from "@/lib/tech-usage";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/terminal/section-head";
import { Terminal } from "@/components/terminal/terminal";

type Sort = "use" | "name";

export function Skills() {
  const { rows, sources } = useMemo(() => buildRows(), []);
  const [sort, setSort] = useState<Sort>("use");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [searching, setSearching] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const TOP = 10;
  const searchRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [cardTop, setCardTop] = useState<number | null>(null);

  const visible = useMemo(() => {
    const filtered = rows.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));
    return filtered.sort((a, b) => (sort === "use" ? b.share - a.share || a.name.localeCompare(b.name) : a.name.localeCompare(b.name)));
  }, [rows, sort, query]);
  // no inner scrollbar: show the top processes, the rest on request (or while searching)
  const shown = expanded || query ? visible : visible.slice(0, TOP);
  const current = shown[Math.min(selected, shown.length - 1)];
  const maxGroup = Math.max(...stack.map((g) => g.packages.length));
  const maxShare = Math.max(...rows.map((r) => r.share));
  const bar = (share: number) => Math.max(1, Math.round((share / maxShare) * 14));

  // place the detail card next to the selected row (desktop)
  const select = (i: number, el?: HTMLElement | null) => {
    setSelected(i);
    const table = tableRef.current;
    const row = el ?? (table?.querySelectorAll<HTMLElement>('[role="option"]')[i] ?? null);
    if (table && row) setCardTop(row.offsetTop);
  };
  const openSearch = () => { setSearching(true); setTimeout(() => searchRef.current?.focus(), 0); };

  // j/k, F3 or /, F6 work whenever this section is on screen; arrows only inside the table
  const moveBy = (d: number) => select(Math.max(0, Math.min(selected + d, shown.length - 1)));
  useSectionKeys("stack", (e) => {
    if (e.key === "j") return moveBy(1), true;
    if (e.key === "k") return moveBy(-1), true;
    if (e.key === "F6") return setSort((s) => (s === "use" ? "name" : "use")), true;
    if (e.key === "F3" || e.key === "/") return openSearch(), true;
    return false;
  });
  const onTableKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); moveBy(1); }
    if (e.key === "ArrowUp") { e.preventDefault(); moveBy(-1); }
  };

  const cols = "grid grid-cols-[52px_minmax(0,1fr)_minmax(0,1.1fr)] gap-3 sm:grid-cols-[60px_60px_56px_minmax(0,1fr)_minmax(0,1.2fr)]";

  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-24">
      <SectionHead n={4} command="htop -u harry" title="Stack" />
      <Terminal title="htop — harry@arch" className="reveal">
        <div className="font-mono text-[12px]">
          {/* header: one meter per group, plus a summary */}
          <div className="grid gap-x-10 gap-y-1.5 border-b border-[var(--line)] p-5 md:grid-cols-2">
            <div className="space-y-1.5">
              {stack.map((g, i) => (
                <div key={g.group} className="flex items-center gap-2">
                  <span className="w-12 text-holo">{g.group}</span>
                  <span className="text-dim">[</span>
                  <span className="relative h-3.5 flex-1 overflow-hidden">
                    <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(g.packages.length / maxGroup) * 100}%` }}>
                      <span className="fill-bar block h-full overflow-hidden whitespace-nowrap leading-[14px] tracking-[-1px] text-holo" style={{ ["--i" as string]: i }}>
                        {"|".repeat(80)}
                      </span>
                    </span>
                  </span>
                  <span className="w-16 text-right text-dim">{g.packages.length} pkgs]</span>
                </div>
              ))}
            </div>
            <div className="space-y-1.5 text-dim">
              <p>Tasks: <span className="text-foreground">{sources}</span> ({projects.length} projects, {experiences.length} roles), <span className="text-foreground">{rows.length}</span> techs</p>
              <p>Uptime: <span className="text-foreground">building since 2023</span></p>
              <p>Most used: <span className="text-holo">{[...rows].sort((a, b) => b.share - a.share).slice(0, 3).map((r) => r.name).join(", ")}</span></p>
              <p className="pt-2 text-[11px]">%USE = share of my projects and roles that used it</p>
            </div>
          </div>

          {/* process table */}
          <div className="relative" onMouseLeave={() => setCardTop(null)}>
          <div ref={tableRef} onKeyDown={onTableKey} role="listbox" aria-label="Technologies" tabIndex={0} className="outline-none focus-visible:ring-1 focus-visible:ring-holo/50">
            <div className={cn(cols, "sticky top-0 z-10 bg-holo px-5 py-1 font-semibold text-background")}>
              <span className="hidden sm:block">PID</span>
              <button onClick={() => setSort("use")} className={cn("text-left", sort === "use" && "underline underline-offset-2")}>%USE</button>
              <span className="hidden sm:block">USED</span>
              <button onClick={() => setSort("name")} className={cn("text-left", sort === "name" && "underline underline-offset-2")}>Command</button>
              <span>Usage</span>
            </div>
            <div className="stagger">
              {shown.map((r, i) => (
                <div
                  key={r.name}
                  role="option"
                  aria-selected={i === selected}
                  onMouseEnter={(e) => select(i, e.currentTarget)}
                  onClick={(e) => select(i, e.currentTarget)}
                  style={{ ["--i" as string]: Math.min(i, 14) }}
                  className={cn(
                    cols,
                    "px-5 py-2.5 md:py-1",
                    i === selected ? "bg-[color-mix(in_srgb,var(--holo-cyan)_16%,transparent)] text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="hidden text-dim sm:block">{r.pid}</span>
                  <span className={r.share >= 0.3 ? "text-holo" : r.share >= 0.2 ? "text-[var(--holo-violet)]" : ""}>{(r.share * 100).toFixed(1)}</span>
                  <span className="hidden sm:block">{r.usedIn.length}/{sources}</span>
                  <span className="truncate text-foreground">{r.name.toLowerCase().replace(/\s+/g, "-")}</span>
                  <span className="whitespace-pre text-dim">
                    [<span className="text-holo">{"|".repeat(bar(r.share))}</span>{" ".repeat(14 - bar(r.share))}]
                  </span>
                </div>
              ))}
              {visible.length === 0 && <p className="px-5 py-3 text-dim">no process matches "{query}"</p>}
            </div>
            {!query && visible.length > TOP && (
              <button
                onClick={() => setExpanded((x) => !x)}
                className="w-full border-t border-[var(--line)] px-5 py-2 text-left text-dim transition hover:bg-panel hover:text-holo"
              >
                {expanded ? "▴ show top 10" : `▾ show all ${visible.length} processes`}
              </button>
            )}
          </div>

          {/* detail card: everything this tech was used in (desktop, on hover/selection) */}
          {current && cardTop !== null && (
            <div
              key={current.name}
              className="animate-in fade-in slide-in-from-left-2 pointer-events-none absolute right-5 z-20 hidden w-72 rounded-lg border border-holo/40 bg-[color-mix(in_srgb,var(--background)_92%,transparent)] p-3.5 shadow-[0_0_30px_-10px_var(--holo-cyan)] backdrop-blur-xl duration-200 md:block"
              style={{ top: Math.max(0, cardTop - 8) }}
            >
              <p className="flex items-baseline justify-between gap-2">
                <span className="text-sm text-holo">{current.name}</span>
                <span className="text-[10.5px] text-dim">{current.usedIn.length} of {sources} · {(current.share * 100).toFixed(0)}%</span>
              </p>
              <ul className="mt-2.5 space-y-1.5 border-t border-[var(--line)] pt-2.5">
                {current.usedIn.map((src) => (
                  <li key={src.name} className="grid grid-cols-[52px_minmax(0,1fr)] items-baseline gap-2 text-[11px]">
                    <span className={src.kind === "role" ? "text-[var(--holo-pink)]" : "text-[var(--holo-violet)]"}>{src.kind}</span>
                    <span className="text-foreground">
                      {src.name} <span className="text-dim">· {src.when}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          </div>

          {/* detail line for the selected row */}
          <p className="min-h-[2.5rem] border-t border-[var(--line)] px-5 py-2.5 text-[11.5px] text-muted-foreground md:hidden">
            {current ? <><span className="text-holo">{current.name}</span> · used in {current.usedIn.map((u) => u.name).join(", ")}</> : " "}
          </p>

          {/* function key bar: only keys that actually work */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 bg-[color-mix(in_srgb,var(--holo-cyan)_7%,transparent)] px-5 py-3 text-[11px] md:py-1.5">
            {searching ? (
              <label className="flex items-center gap-2">
                <span className="text-holo">Search:</span>
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  onKeyDown={(e) => e.key === "Escape" && (setQuery(""), setSearching(false))}
                  onBlur={() => !query && setSearching(false)}
                  aria-label="Search technologies"
                  className="w-40 bg-transparent text-foreground outline-none"
                />
              </label>
            ) : (
              <button onClick={openSearch}>
                <span className="bg-holo px-1 text-background">F3</span> <span className="text-dim">Search</span>
              </button>
            )}
            <button onClick={() => setSort((s) => (s === "use" ? "name" : "use"))}>
              <span className="bg-holo px-1 text-background">F6</span> <span className="text-dim">Sort by {sort === "use" ? "name" : "%USE"}</span>
            </button>
            <span className="ml-auto hidden text-dim sm:inline">j k to move · / to search</span>
          </div>
        </div>
      </Terminal>
    </section>
  );
}
