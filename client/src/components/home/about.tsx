import { useEffect, useState } from "react";
import { education, fetchInfo, profile } from "@/data";
import { THEMES, THEME_EVENT, applyTheme, currentTheme, cycleTheme, type ThemeId } from "@/lib/theme";
import { useSectionKeys } from "@/hooks/useSectionKeys";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/terminal/section-head";
import { Terminal } from "@/components/terminal/terminal";

// "HARRY" in the figlet Doom font, where fastfetch would print a logo. Plain ASCII only,
// so it renders in the bundled monospace font.
const ART = String.raw`
 _   _   ___  ______________   __
| | | | / _ \ | ___ \ ___ \ \ / /
| |_| |/ /_\ \| |_/ / |_/ /\ V / 
|  _  ||  _  ||    /|    /  \ /  
| | | || | | || |\ \| |\ \  | |  
\_| |_/\_| |_/\_| \_\_| \_| \_/`;

// fastfetch's colour blocks double as the theme switch.
const ThemeBlocks = () => {
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

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <SectionHead n={1} command="fastfetch" title="About me" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Terminal title="kitty — harry@arch: ~" className="reveal">
          <div className="p-6 font-mono text-[12.5px] leading-relaxed">
            <pre className="holo-text mb-5 overflow-hidden text-[clamp(10px,3vw,18px)] font-semibold leading-[1.1] drop-shadow-[0_0_6px_color-mix(in_srgb,var(--holo-cyan)_25%,transparent)]" aria-label="Harry">{ART}</pre>
            <div>
              <p>
                <span className="text-arch">{profile.handle}</span>
                <span className="text-dim">@</span>
                <span className="text-arch">{profile.host}</span>
              </p>
              <p className="text-dim">{"-".repeat(10)}</p>
              <dl className="stagger mt-1 space-y-0.5">
                {fetchInfo.map(([k, v], i) => (
                  <div key={k} className="flex gap-2" style={{ ["--i" as string]: i }}>
                    <dt className="w-20 shrink-0 text-holo">{k}</dt>
                    <dd className="min-w-0 text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <ThemeBlocks />
            </div>
          </div>
        </Terminal>

        <div className="reveal space-y-5 text-lg leading-relaxed text-muted-foreground" style={{ ["--d" as string]: 1 }}>
          <p>
            I'm <span className="text-foreground">Harry</span>, a Computer Science student at NUS from a polytechnic background.
            I picked up web development in 2023 and haven't stopped building since: full-stack apps, the CI and cloud
            underneath them, and lately the people side as a project manager.
          </p>
          <p>
            I like systems that are honest about what's happening, which is why my laptop runs Arch and my side project
            tracks where my study hours actually go.
          </p>
          <ul className="space-y-3 border-t border-[var(--line)] pt-5">
            {education.map((e) => (
              <li key={e.school} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 text-sm">
                <span className="font-medium text-foreground">{e.school}</span>
                <span className="font-mono text-xs text-dim">{e.period}</span>
                <span className="col-span-2 text-muted-foreground">{e.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
