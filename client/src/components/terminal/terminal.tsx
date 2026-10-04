import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// A kitty-style window frame: title bar with the command, content below.
export const Terminal = ({ title, children, className }: { title: string; children: ReactNode; className?: string }) => (
  <div className={cn("holo-panel overflow-hidden", className)}>
    <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-[var(--holo-pink)] opacity-70" />
        <span className="size-2.5 rounded-full bg-[var(--holo-violet)] opacity-70" />
        <span className="size-2.5 rounded-full bg-[var(--holo-cyan)] opacity-70" />
      </span>
      <span className="truncate font-mono text-[11px] text-dim">{title}</span>
    </div>
    <div className="relative">{children}</div>
  </div>
);
