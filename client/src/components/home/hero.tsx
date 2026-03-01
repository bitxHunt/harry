import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-[92vh] flex flex-col justify-center max-w-6xl mx-auto px-6 md:px-8 pt-20 pb-16">
      {/* Heading */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
        Developer.
        <br />
        Builder.
        <br />
        <span className="text-neutral-300">Community person.</span>
      </h1>

      {/* Subheading */}
      <p className="text-base md:text-lg text-neutral-500 max-w-xl leading-relaxed mb-10">
        Final-year diploma student in Singapore. I build web things, run
        community workshops, and care about technology that works for people —
        not just developers.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
        <Button className="rounded-full" asChild>
          <a href="https://tsh-profile.s3.ap-southeast-1.amazonaws.com/Thiha_Swan_Htet_CV.pdf" target="blank">
            View CV <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" className="rounded-full" asChild>
          <a
            href="https://tsh-profile.s3.ap-southeast-1.amazonaws.com/Thiha_Swan_Htet_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Browse Projects
          </a>
        </Button>
      </div>
    </section>
  );
}
