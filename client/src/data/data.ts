import SMULogo from "@/assets/SMU_Logo.jpg";
import SPLogo from "@/assets/SP_Logo.png";
import RExusLogo from "@/assets/RExus_Logo.png";
import StriveLogo from "@/assets/Strive_Logo.webp";

export const skillRow1 = [
  {
    name: "JavaScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Python",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "HTML5",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TanStack",
    src: "https://avatars.githubusercontent.com/u/72518640?s=200&v=4",
  },
  {
    name: "Swift",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  },
  {
    name: "Node.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    invert: true,
  },
  {
    name: "Spring Boot",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
] as const;

export const skillRow2 = [
  {
    name: "Tailwind CSS",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Bootstrap",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Prisma",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    invert: true,
  },
  {
    name: "PostgreSQL",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "MySQL",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Supabase",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  },
  {
    name: "Firebase",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
  },
  {
    name: "Docker",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "AWS",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  },
  {
    name: "Git",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Figma",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
] as const;

export const experiences = [
  {
    role: "Lead DevOps",
    org: "Singapore Polytechnic",
    type: "Leadership",
    period: "Oct 2024 – Aug 2025",
    year: "2024",
    location: "Singapore",
    logo: SPLogo,
    bullets: [
      "Developed an AI-powered business excellence toolkit, featuring automated digital forms and management dashboard for 500 users.",
      "Implemented infrastructure-as-code using Terraform and GitHub Actions for automated testing, containerized deployments, and AWS resource provisioning.",
      "Integrated budget alarms, and AI autofill feature with AWS OpenSearch and Bedrock.",
      "Contributed to authentication and management dashboard for admins, consultants and stakeholders.",
    ],
  },
  {
    role: "Web Developer",
    org: "RExus Bioenergy",
    type: "Work",
    period: "Apr 2025 – Present",
    year: "2025",
    location: "Singapore",
    logo: RExusLogo,
    bullets: [
      "Designed a responsive company portfolio website to attract potential stakeholders",
      "Developed REST APIs and integrated third-party data sources for real-time reporting.",
      "Maintain production environment with proactive monitoring, security patches, and performance optimization.",
    ],
  },
  {
    role: "Part-time Tutor",
    org: "Strive Education",
    type: "Education",
    period: "Sept 2025 – Jan 2026",
    year: "2025",
    location: "Singapore",
    logo: StriveLogo,
    bullets: [
      "Tutored Python programming fundamentals to primary students",
      " Design and facilitate interdisciplinary lessons combining mathematics with coding concepts.",
      "Guide students through hands-on projects using the company’s web-based IDE, creating visual art and animations with Python.",
    ],
  },
];

export const projects = [
  {
    title: "IMCS Toolkit",
    description:
      "Developed an AI-powered business excellence toolkit, featuring automated digital forms and management dashboard for 500 users",
    tags: ["React", "Node.js", "Express", "Prisma", "NeonDB", "AWS", "Docker"],
    github: "https://github.com",
    live: null,
    highlight: "Industry Now Curriculum (INC) Pathway",
  },
  {
    title: "International Learning Festival",
    description:
      "Selected to lead 3 students to refactor existing application and implement new features for an internal school event.",
    tags: ["React", "Tailwind", "Firebase", "Google Maps"],
    github: "https://github.com",
    live: null,
    highlight: "Industry Now Curriculum (INC) Pathway",
  },
  {
    title: "Gamified Sustainability Movement",
    description:
      "A gamified web app which allows users to purchase pets, assign tasks to level up, learn skill, and get rewards.",
    tags: ["Bootstrap", "Node.js", "Express.js", "MySQL"],
    github: "https://github.com",
    live: null,
    highlight: "ST0503 – Backend Web Development",
  },
] as const;

export const education = [
  {
    degree: "Diploma in Information Technology",
    school: "Singapore Polytechnic",
    period: "Apr 2023 – Apr 2026",
    status: "Final Year",
    description:
      "Studying software development, web technologies, and systems design. Actively involved in student council, hackathons, and community initiatives throughout the course.",
    image: SPLogo,
    imageAlt: "Singapore Polytechnic",
  },
  {
    degree: "Semester Exchange Programme",
    school: "Singapore Management University",
    period: "Augu 2025 - Dec 2025",
    status: "Completed",
    description:
      "Exchange semester at SMU broadening my exposure to business-oriented technology and interdisciplinary thinking. Took two modules under Computer Science",
    image: SMULogo,
    imageAlt: "Singapore Management University",
  },
] as const;
