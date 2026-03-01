import { skillRow1, skillRow2 } from "@/data/data";
export function MarqueeRow({
  icons,
  reverse = false,
}: {
  icons: readonly { name: string; src: string }[];
  reverse?: boolean;
}) {
  const repeated = [...icons, ...icons, ...icons, ...icons];

  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
      <div
        className={`flex gap-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} whitespace-nowrap`}
      >
        {repeated.map((icon, i) => (
          <div
            key={`${icon.name}-${i}`}
            className="shrink-0 flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-5 py-4 w-24"
          >
            <img src={icon.src} alt={icon.name} className="h-10 w-10" />
            <span className="text-xs text-neutral-400 font-medium text-center leading-tight">
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
    <section className="bg-neutral-950 py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-sky-300">
          What I work with
        </p>
      </div>

      <div className="flex flex-col gap-4 overflow-hidden">
        <MarqueeRow icons={skillRow1} />
        <MarqueeRow icons={skillRow2} reverse />
      </div>
    </section>
  );
}
