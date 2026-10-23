import ILFLogo from "@/assets/ILF_Logo.png";

export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  description: string;
  tags: readonly string[];
  github: string | null;
  live: string | null;
  article?: string;
  image?: string;
};

// Shown in a two-pane file browser (list + preview). Same order and facts as the CV.
export const projects: Project[] = [
  {
    slug: "csdrills",
    title: "CSDrills",
    kind: "Personal project",
    year: "2026",
    description:
      "An offline-first quiz racing PWA for three NUS modules (Java, computer organisation, maths), with 60+ stations and parameterised question generators. Every answer is verified with javac, gcc and independent checkers (35,000+ generated variants).",
    tags: ["TypeScript", "Vite", "PWA"],
    github: null,
    live: "https://csdrills.onrender.com",
  },
  {
    slug: "study-buddy",
    title: "Study Buddy",
    kind: "Personal project",
    year: "2026",
    description:
      "A dashboard that reads my study log and shows where my study time goes, with a focus timer that saves each session back to the log.",
    tags: ["React", "TanStack", "Express", "Prisma", "PostgreSQL", "Docker"],
    github: null,
    live: null,
  },
  {
    slug: "pickme",
    title: "PickMe",
    kind: "LifeHack 2026 · 1st Runner-up",
    year: "2026",
    description:
      "Simulates how AI shopping agents rank products. It separates what a product page says from what the product actually does, to show which losses one sentence of copy can fix. I built the first prototype, then ported it to Next.js and React, added product photo upload and deployed it on Vercel.",
    tags: ["Next.js", "React", "Vercel"],
    github: "https://github.com/bitxHunt/Lifehack-26",
    live: null,
  },
  {
    slug: "portfolio",
    title: "Personal Portfolio Site",
    kind: "Personal project",
    year: "2026",
    description:
      "This site: Arch Linux-styled, with a 3D particle hologram in three.js, built with React 19, TanStack Router and Tailwind CSS 4 on an Express 5 + Prisma back end.",
    tags: ["React", "TanStack", "Tailwind CSS", "three.js", "Express", "Prisma"],
    github: "https://github.com/bitxHunt/harry",
    live: null,
  },
  {
    slug: "authinc",
    title: "AuthINC",
    kind: "Full Stack Developer · Industry Now Curriculum",
    year: "2024",
    description:
      "An authentication system for multi-site management, with OAuth (GitHub, LinkedIn, Google) and a custom JWT access and refresh token mechanism. CI/CD with Playwright and Jest, hosted on Azure and Render.",
    tags: ["React", "Express", "Prisma", "Playwright", "Jest", "Azure", "Render"],
    github: null,
    live: null,
  },
  {
    slug: "learning-festival",
    title: "International Learning Festival",
    kind: "Lead Full Stack Developer · INC Pathway",
    year: "2024",
    description:
      "Led 3 students to refactor an existing event app, adding Google Maps integration, token security and logging. Load tested with Artillery and added Google Analytics.",
    tags: ["React", "Express", "Firebase Authentication", "Google Maps", "Artillery"],
    github: "https://github.com/bitxHunt/INC_International-Learning-Festival",
    live: null,
    article:
      "https://www.sp.edu.sg/about-sp/sustainability/detail/press-release/global-education-leaders-converge-at-sp's-international-learning-festival-in-advancing-teaching-and-learning-with-generative-ai-and-sustainability-focus",
    image: ILFLogo,
  },
  {
    slug: "cleaning-platform",
    title: "Cleaning Service Booking Platform",
    kind: "ST0510 J2EE Application Development",
    year: "2024–25",
    description:
      "A booking platform with a CMS for services and pricing, and PayNow QR and card payments with automatic receipts.",
    tags: ["Java Servlets", "Spring Boot"],
    github: "https://github.com/bitxHunt/J2EE-Assignment1",
    live: null,
  },
];
