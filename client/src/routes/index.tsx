import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Experience } from "@/components/home/experience";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
import { OffClock } from "@/components/home/off-clock";
import { useReveal } from "@/hooks/useReveal";

// Below the fold, and they pull in the form libraries (react-hook-form, zod, axios),
// so they load after first paint instead of with it.
const Articles = lazy(() => import("@/components/home/articles").then((m) => ({ default: m.Articles })));
const Contact = lazy(() => import("@/components/home/contact").then((m) => ({ default: m.Contact })));
const SectionFallback = () => <div className="min-h-[520px]" aria-hidden />;
// Commits only once both chunks have loaded, so the reveal observer sees their DOM.
const LazySections = () => {
  useReveal([]);
  return (
    <>
      <Articles />
      <Contact />
    </>
  );
};

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  useReveal();
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <OffClock />
      <Suspense fallback={<SectionFallback />}>
        <LazySections />
      </Suspense>
    </>
  );
}
