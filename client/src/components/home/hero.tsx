import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { baseForm, culture, forms, profile, type Form } from "@/data";
import { useSgtTime } from "@/hooks/useSgtTime";
import { useScramble } from "@/hooks/useScramble";
import { cn } from "@/lib/utils";
import { FormHologram } from "@/components/hologram/form-hologram";
import { useSectionKeys } from "@/hooks/useSectionKeys";

// Base form first, then the rest. Picking one transforms straight away.
const ALL: Form[] = [baseForm, ...forms];

export function Hero() {
  const time = useSgtTime();
  const [index, setIndex] = useState(0);
  const [pulse, setPulse] = useState(0);
  const form = ALL[index];
  const isBase = form.id === "harry";
  const name = useScramble(form.name.toUpperCase(), pulse > 0, 700);
  const command = isBase ? "whoami" : `./transform --form=${form.short}`;

  const transform = (i: number) => {
    const next = (i + ALL.length) % ALL.length;
    if (next === index) return;
    setIndex(next);
    setPulse((p) => p + 1);
  };
  // ← → switch forms whenever the hero is on screen
  useSectionKeys("top", (e) => {
    if (e.key === "ArrowRight") return transform(index + 1), true;
    if (e.key === "ArrowLeft") return transform(index - 1), true;
    return false;
  });

  return (
    <section id="top" className="relative isolate overflow-hidden">

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-8 md:px-10 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:pt-0">
        <div className="relative z-10 min-w-0">
          <p key={command} className="font-mono text-sm text-dim">
            <span className="text-arch">{profile.handle}@{profile.host}</span> <span className="text-holo">~</span> %{" "}
            <span className="typing text-foreground" style={{ ["--n" as string]: command.length }}>{command}</span>
            <span className="animate-caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-holo" />
          </p>

          <h1 key={form.id} aria-label={form.name} className="chromatic animate-stretch-in mt-6 text-[clamp(2.6rem,6.4vw,5.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
            {name}
          </h1>
          <p className="mt-4 font-mono text-sm text-dim">
            {isBase
              ? <>aka <span className="text-foreground">{profile.nickname}</span> · {culture.myanmar ? <>မင်္ဂလာပါ <span className="text-dim">(mingalaba)</span></> : "base form"}</>
              : <>form <span className="text-[var(--holo-pink)]">{index}/{forms.length}</span> · still Harry underneath</>}
          </p>

          <p key={form.tagline} className="animate-in fade-in slide-in-from-bottom-1 mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground duration-500">
            {form.tagline}
          </p>

          <dl key={`stats-${form.id}`} className="animate-in fade-in mt-7 grid max-w-xl gap-x-6 gap-y-2.5 font-mono text-[12px] duration-700 sm:grid-cols-[auto_minmax(0,1fr)]">
            <dt className="text-dim">powers</dt>
            <dd className="flex flex-wrap gap-1.5">
              {form.powers.map((p) => (
                <span key={p} className="rounded border border-[var(--line)] bg-panel px-2 py-0.5 text-holo">{p}</span>
              ))}
            </dd>
            <dt className="text-dim">{isBase ? "based in" : "origin"}</dt>
            <dd className="text-foreground">{form.origin}{isBase && <span className="text-dim"> · {time} SGT</span>}</dd>
            <dt className="text-dim">{isBase ? "status" : "known for"}</dt>
            <dd className="flex items-center gap-2 text-foreground">
              {isBase && (
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-holo opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-holo" />
                </span>
              )}
              {form.knownFor}
            </dd>
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-arch px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_16px_-8px_var(--arch)] transition hover:brightness-110"
            >
              View CV <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium transition hover:border-holo hover:text-holo">
              Get in touch
            </a>
            <a href={profile.socials[0].href} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-full border border-[var(--line)] transition hover:border-holo hover:text-holo">
              <Github className="size-4" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          <div data-cursor="transform">
            <FormHologram form={form.id} onClick={() => transform(index + 1)} />
          </div>

          {/* form picker: plain text, like workspace tabs */}
          <div role="tablist" aria-label="Forms" className="mt-2 flex flex-wrap justify-center gap-1 font-mono text-[12px]">
            {ALL.map((f, i) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={i === index}
                tabIndex={i === index ? 0 : -1}
                onClick={() => transform(i)}
                data-cursor="transform"
                className={cn(
                  "rounded-md px-3 py-2.5 transition md:px-2.5 md:py-1.5",
                  i === index ? "bg-holo text-background" : "text-dim hover:bg-panel hover:text-foreground",
                )}
              >
                {f.short}
              </button>
            ))}
          </div>
          <p className="mt-3 text-center font-mono text-[11px] text-dim"><span className="md:hidden">tap the hologram or pick a form</span><span className="hidden md:inline">click the hologram or pick a form · ← → to cycle</span></p>
        </div>
      </div>
    </section>
  );
}
