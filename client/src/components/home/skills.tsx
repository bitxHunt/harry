import { skillRow1, skillRow2 } from "@/data/data";

export function MarqueeRow({
  icons,
  reverse = false,
}: {
  icons: readonly { name: string; src: string; invert?: boolean }[];
  reverse?: boolean;
}) {
  const repeated = [...icons, ...icons, ...icons, ...icons];

  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
      <div
        className={`flex gap-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused] whitespace-nowrap`}
      >
        {repeated.map((icon, i) => (
          <div
            key={`${icon.name}-${i}`}
            className="shrink-0 flex flex-col items-center justify-center gap-1.5 md:gap-2 bg-white/10 hover:bg-white/15 hover:ring-1 hover:ring-indigo-400/50 transition-all duration-200 rounded-xl px-3 py-3 md:px-5 md:py-4 w-20 md:w-28"
          >
            <img
              src={icon.src}
              alt={icon.name}
              className={`h-7 w-7 md:h-11 md:w-11 ${icon.invert ? "invert" : ""}`}
            />
            <span className="text-[10px] md:text-xs text-neutral-400 font-medium text-center leading-tight">
              {icon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="bg-neutral-900 py-20">
      <div className="max-w-6xl mx-auto px-8 md:px-10 mb-10 text-center md:text-left">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-300 mb-3">
          What I work with
        </p>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Tech Stack
        </h2>
      </div>

      <div className="flex flex-col gap-4 overflow-hidden">
        <MarqueeRow icons={skillRow1} />
        <MarqueeRow icons={skillRow2} reverse />
      </div>
    </section>
  );
}
