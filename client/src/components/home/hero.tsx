import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-[92vh] flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full px-8 md:px-10 py-20 text-center md:text-left">
        {/* Heading */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
          Developer.
          <br />
          Builder.
          <br />
          <span className="text-neutral-500 dark:text-neutral-400">Community person.</span>
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-neutral-500 max-w-xl leading-relaxed mb-10">
          Final-year diploma student in Singapore. I build web things, run
          community workshops, and care about technology that works for people —
          not just developers.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <Button className="rounded-full" asChild>
            <a href="https://tsh-profile.s3.ap-southeast-1.amazonaws.com/Thiha_Swan_Htet_CV.pdf" target="_blank" rel="noopener noreferrer">
              View CV <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <a href="/projects">
              Browse Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
