import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/home/hero";
import { Experience } from "@/components/home/experience";
// import { Education } from "@/components/home/education";
import { About } from "@/components/home/about";
import { Skills } from "@/components/home/skills";
import { Articles } from "@/components/home/articles";
import { Projects } from "@/components/home/projects";
import { Contact } from "@/components/home/contact";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <Hero />
      {/* <Education /> */}
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Articles />
    </div>
  );
}
