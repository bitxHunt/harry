import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const LanternCanvas = lazy(() =>
  import("@/components/lanterns").then((m) => ({ default: m.LanternCanvas })),
);

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
      {/* Lanterns — dark mode only, reduced motion safe */}
      {!window.matchMedia("(prefers-reduced-motion: reduce)").matches && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 hidden dark:block pointer-events-none">
            <LanternCanvas />
          </div>
        </Suspense>
      )}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-8 md:px-10 py-20 text-center md:text-left">
        {/* Heading */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
          Developer.
          <br />
          Builder.
          <br />
          <span className="text-neutral-500 dark:text-neutral-400">
            Community person.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-neutral-500 max-w-xl leading-relaxed mb-10">
          A student developer creating full-stack web applications. My passion
          lies on designing systems and cloud technologies. I enjoy connecting
          with people and discovering new places around the world.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <Button className="rounded-full shimmer" asChild>
            <a
              href="https://tsh-profile.s3.ap-southeast-1.amazonaws.com/Thiha_Swan_Htet_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View CV <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <a href="/projects">Browse Projects</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
