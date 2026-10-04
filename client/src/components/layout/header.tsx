import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useSgtTime } from "@/hooks/useSgtTime";
import { cn } from "@/lib/utils";

// Every section on the home page, as Hyprland-style workspaces.
const WORKSPACES = [
  { n: 1, id: "about", label: "about" },
  { n: 2, id: "experience", label: "work" },
  { n: 3, id: "projects", label: "projects" },
  { n: 4, id: "stack", label: "stack" },
  { n: 5, id: "off-clock", label: "life" },
  { n: 6, id: "articles", label: "writing" },
  { n: 7, id: "contact", label: "contact" },
];

/*
  Scroll spy. Some sections are lazy-loaded, so a MutationObserver attaches the
  IntersectionObserver to them as soon as they appear. At the very bottom of the page
  the last section wins, even if it is too short to reach the middle of the screen.
*/
const useActiveSection = (enabled: boolean) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const watched = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    const mo = new MutationObserver(() => attach());
    const attach = () => {
      WORKSPACES.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && !watched.has(id)) {
          watched.add(id);
          io.observe(el);
        }
      });
      if (watched.size === WORKSPACES.length) mo.disconnect();
    };
    mo.observe(document.body, { childList: true, subtree: true });
    attach();

    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        setActive(WORKSPACES[WORKSPACES.length - 1].id);
      } else if (window.scrollY < 200) {
        setActive(null);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  return active;
};

export function Header() {
  const time = useSgtTime();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onHome = path === "/";
  const active = useActiveSection(onHome);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_78%,transparent)] px-2 font-mono text-[12px] backdrop-blur-xl">
        <Link to="/" className="flex shrink-0 items-center rounded-lg px-2.5 py-1.5 transition hover:bg-panel" aria-label="Home">
          <span className="text-arch">harry</span>
          <span className="hidden text-dim sm:inline">@arch</span>
          <span className="ml-1 text-holo">~</span>
          <span className="animate-caret ml-1 inline-block h-3.5 w-1.5 bg-holo" aria-hidden />
        </Link>

        <nav aria-label="Sections" className="flex min-w-0 items-center gap-0.5 overflow-x-auto [scrollbar-width:none]">
          {WORKSPACES.map((w) => {
            const isActive = onHome && active === w.id;
            return (
              <Link
                key={w.id}
                to="/"
                hash={w.id}
                activeOptions={{ includeHash: true }}
                title={w.label}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2 transition",
                  isActive ? "bg-holo text-background shadow-[0_0_16px_-2px_var(--holo-cyan)]" : "text-dim hover:bg-panel hover:text-foreground",
                )}
              >
                <span className="font-semibold">{w.n}</span>
                <span className={cn("hidden xl:inline", isActive && "md:inline")}>{w.label}</span>
              </Link>
            );
          })}
        </nav>

        <span className="hidden shrink-0 px-2 text-dim md:inline">{time} SGT</span>
      </div>
    </header>
  );
}
