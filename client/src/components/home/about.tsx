import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function About() {
  return (
    <section className="border-t border-neutral-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — text + button (desktop only button) */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sky-500 mb-4">
              About
            </p>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              I'm Thiha Swan Htet, a final-year diploma student in Singapore. I
              picked up web development a couple of years ago and haven't
              stopped building since.
            </p>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Outside of code, I run community workshops, take on leadership
              roles in school, and care about making technology accessible to
              everyone.
            </p>

            {/* Desktop button — hidden on mobile */}
            <div className="hidden md:block">
              <Button>
                Read more <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right — YouTube embed + mobile button */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/PbpP_F_-t7Q?si=3pWQeoGSjs1U6w9S"
                title="About me"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Mobile button — hidden on desktop */}
            <div className="block md:hidden">
              <Button variant="outline" className="w-full">
                Read more <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
