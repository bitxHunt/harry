import IMCSToolKit from "@/assets/IMCS_Toolkit.png";
import ILFLogo from "@/assets/ILF_Logo.png";
import SASApp from "@/assets/SAS_App.png";

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

// Shown in a two-pane file browser (list + preview).
export const projects: Project[] = [
  {
    slug: "study-buddy",
    title: "Study Buddy",
    kind: "Personal",
    year: "2026",
    description:
      "A cinematic dashboard that turns my Obsidian study log into analytics: a semester dial, plan-vs-reality tracking, and a focus timer that syncs with my study logger.",
    tags: ["React", "TanStack", "Express", "Prisma", "PostgreSQL", "Docker"],
    github: null,
    live: null,
  },
  {
    slug: "imcs-toolkit",
    title: "IMCS Toolkit",
    kind: "Industry Now Curriculum",
    year: "2025",
    description:
      "AI-powered business excellence toolkit with automated digital forms and a management dashboard for 500 users. Led DevOps: Terraform, GitHub Actions, AWS.",
    tags: ["React", "Express", "Prisma", "AWS", "Terraform", "Docker"],
    github: null,
    live: null,
    article: "https://www.instagram.com/p/DGiCphstgqk/",
    image: IMCSToolKit,
  },
  {
    slug: "authinc",
    title: "AuthINC",
    kind: "Industry Now Curriculum",
    year: "2024",
    description:
      "Scalable multi-site authentication with a 24-student team: OAuth for GitHub, LinkedIn and Google, custom JWT access and refresh tokens, a cron-driven log queue and Playwright CI.",
    tags: ["React", "shadcn/ui", "Express", "Prisma", "Playwright", "Azure"],
    github: null,
    live: null,
  },
  {
    slug: "learning-festival",
    title: "International Learning Festival",
    kind: "Lead developer",
    year: "2024",
    description:
      "Led 3 students to refactor and extend the app for SP's International Learning Festival: Google Maps, token security, Artillery load testing and analytics.",
    tags: ["React", "Tailwind", "Express", "Firebase", "Google Maps"],
    github: "https://github.com/bitxHunt/INC_International-Learning-Festival",
    live: null,
    article:
      "https://www.sp.edu.sg/about-sp/sustainability/detail/press-release/global-education-leaders-converge-at-sp's-international-learning-festival-in-advancing-teaching-and-learning-with-generative-ai-and-sustainability-focus",
    image: ILFLogo,
  },
  {
    slug: "smart-attendance",
    title: "Smart Attendance System",
    kind: "SMU · CS102",
    year: "2025",
    description:
      "Attendance management with Java and OpenCV, using facial recognition to track and record student attendance automatically.",
    tags: ["JavaFX", "Maven", "OpenCV", "PostgreSQL", "Supabase"],
    github: "https://github.com/bitxHunt/Smart-Attendance-System",
    live: null,
    image: SASApp,
  },
  {
    slug: "cleaning-platform",
    title: "Cleaning Service Platform",
    kind: "SP · J2EE",
    year: "2025",
    description:
      "Full-stack booking platform with a CMS for services and pricing, PayNow QR and card payments, and automated confirmations and receipts.",
    tags: ["Java Servlets", "Spring Boot", "DaisyUI"],
    github: "https://github.com/bitxHunt/J2EE-Assignment1",
    live: null,
  },
];
