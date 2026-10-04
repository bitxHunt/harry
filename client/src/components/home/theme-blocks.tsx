import { useEffect, useState } from "react";
import { THEMES, THEME_EVENT, applyTheme, currentTheme, cycleTheme, type ThemeId } from "@/lib/theme";
import { useSectionKeys } from "@/hooks/useSectionKeys";
import { cn } from "@/lib/utils";

// fastfetch's colour blocks double as the theme switch.
export const ThemeBlocks = () => {
  const [active, setActive] = useState<ThemeId>(currentTheme);
  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<ThemeId>).detail);
    window.addEventListener(THEME_EVENT, on);
    return () => window.removeEventListener(THEME_EVENT, on);
  }, []);
  useSectionKeys("about", (e) => {
    if (e.key === "l" || e.key === "j") return cycleTheme(1), true;
    if (e.key === "h" || e.key === "k") return cycleTheme(-1), true;
    return false;
  });
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Colour theme">
        {THEMES.map((t) => (
          <button
            key={t.id}
            role="radio"
            aria-checked={active === t.id}
            aria-label={`${t.label} theme`}
            title={t.label}
            data-cursor={t.label}
            onClick={() => applyTheme(t.id)}
            className={cn(
              "h-4 w-9 rounded-sm transition",
              active === t.id ? "ring-2 ring-foreground ring-offset-2 ring-offset-[var(--background)]" : "opacity-80 hover:opacity-100",
            )}
            style={{ background: `linear-gradient(90deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)` }}
          />
        ))}
      </div>
      <p className="mt-2 text-[10.5px] text-dim">
        theme: <span className="text-holo">{THEMES.find((t) => t.id === active)?.label}</span> · click a colour or press h l to switch
      </p>
    </div>
  );
};
