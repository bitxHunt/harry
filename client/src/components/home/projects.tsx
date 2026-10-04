import { useRef, useState, type KeyboardEvent } from "react";
import { useSectionKeys } from "@/hooks/useSectionKeys";
import { ArrowUpRight, File, Folder, FolderOpen, Github } from "lucide-react";
import { projects } from "@/data";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/terminal/section-head";
import { Terminal } from "@/components/terminal/terminal";

/*
  Projects as a two-pane file manager, the way yazi or ranger look on my machine:
  folders on the left, a preview of the selected one on the right. Arrow keys or
  j / k move the selection when the list has focus.
*/
export function Projects() {
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const p = projects[index];

  const move = (next: number) => {
    const i = (next + projects.length) % projects.length;
    setIndex(i);
    listRef.current?.querySelectorAll<HTMLButtonElement>("button")[i]?.focus();
  };
  // arrows inside the list; j/k whenever the section is on screen
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); move(index + 1); }
    if (e.key === "ArrowUp") { e.preventDefault(); move(index - 1); }
  };
  useSectionKeys("projects", (e) => {
    if (e.key === "j") return setIndex((i) => (i + 1) % projects.length), true;
    if (e.key === "k") return setIndex((i) => (i - 1 + projects.length) % projects.length), true;
    return false;
  });

  const files = ["README.md", ...(p.image ? ["preview.png"] : [])];

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <SectionHead n={3} command="yazi ~/projects" title="Projects">
        <p className="max-w-xs text-sm text-muted-foreground">Things I've built at school, at work and for myself.</p>
      </SectionHead>

      <Terminal title={`yazi — ~/projects/${p.slug}`} className="reveal">
        <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
          {/* left pane: the folders */}
          <ul ref={listRef} role="listbox" aria-label="Projects" onKeyDown={onKey} className="border-b border-[var(--line)] p-2 font-mono text-[13px] md:border-b-0 md:border-r">
            {projects.map((proj, i) => {
              const selected = i === index;
              return (
                <li key={proj.slug}>
                  <button
                    role="option"
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-md px-3 py-3 text-left transition md:py-2",
                      selected ? "bg-holo text-background" : "text-muted-foreground hover:bg-panel hover:text-foreground",
                    )}
                  >
                    {selected ? <FolderOpen className="size-4 shrink-0" /> : <Folder className="size-4 shrink-0 text-arch" />}
                    <span className="truncate">{proj.slug}/</span>
                    <span className={cn("ml-auto text-[11px]", selected ? "text-background/70" : "text-dim")}>{proj.year}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* right pane: preview */}
          <div key={p.slug} className="animate-in fade-in flex min-h-[420px] flex-col p-6 duration-300 md:p-8">
            <p className="font-mono text-[11px] text-dim">{p.kind} · {p.year}</p>
            <h3 className="mt-2 text-3xl font-bold uppercase tracking-tight md:text-4xl">{p.title}</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{p.description}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="rounded border border-[var(--line)] px-2 py-0.5 font-mono text-[10.5px] text-holo">{t}</li>
              ))}
            </ul>

            <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto]">
              <ul className="font-mono text-[12px] text-dim">
                {files.map((f) => (
                  <li key={f} className="flex items-center gap-2 py-0.5">
                    {f.endsWith("/") ? <Folder className="size-3.5 text-arch" /> : <File className="size-3.5" />}
                    {f}
                  </li>
                ))}
              </ul>
              {p.image && (
                <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" decoding="async" className="h-28 w-44 rounded-lg border border-[var(--line)] object-cover object-top opacity-90" />
              )}
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm transition hover:border-holo hover:text-holo">
                  <Github className="size-4" /> Source
                </a>
              )}
              {(p.live ?? p.article) && (
                <a href={(p.live ?? p.article)!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm transition hover:border-holo hover:text-holo">
                  {p.live ? "Live site" : "Read more"} <ArrowUpRight className="size-4" />
                </a>
              )}
              {!p.github && !p.live && !p.article && <p className="font-mono text-[11px] text-dim">source is private</p>}
            </div>
          </div>
        </div>
        {/* status line, like yazi's footer */}
        <div className="flex items-center justify-between border-t border-[var(--line)] px-4 py-2 font-mono text-[11px] text-dim">
          <span><span className="rounded bg-arch px-1.5 text-primary-foreground">NOR</span> ~/projects/{p.slug}</span>
          <span className="hidden sm:inline">j k to move</span>
          <span>{index + 1}/{projects.length}</span>
        </div>
      </Terminal>
    </section>
  );
}
