// Work history (shown as `git log` in Experience) and education (About).

export type Experience = {
  hash: string;
  role: string;
  org: string;
  period: string;
  tags: string[];
  bullets: string[];
  head?: boolean;
};

// Newest first, shown like `git log`.
export const experiences: Experience[] = [
  {
    hash: "e7c9a41",
    role: "Project Manager (Intern)",
    org: "Orfeostory Pte. Ltd.",
    period: "Dec 2025 – Jun 2026",
    tags: ["delivery", "stakeholders", "scrum"],
    bullets: [
      "Managed end-to-end delivery of 5+ web and mobile projects for clients including National Institute of Education, Kopi Brewery, Aquinas Law, SBC Corporate Management and Calvary Carpentry, from proposal through testing, launch and handover training.",
      "Led cross-functional teams (design, development, QA, SEO) and handled module scoping, timelines and stakeholder communication across every project.",
    ],
  },
  {
    hash: "5b81f2d",
    role: "Coding Instructor (Part-time)",
    org: "Strive Math",
    period: "Sep 2025 – Present",
    tags: ["teaching", "python"],
    head: true,
    bullets: [
      "Teach Python programming fundamentals to primary school students.",
      "Design interdisciplinary lessons that combine mathematics with coding, guiding students through visual art and animation projects in the company's web IDE.",
    ],
  },
  {
    hash: "a3d09c7",
    role: "Web Developer",
    org: "RExus Bioenergy",
    period: "Apr 2025 – Oct 2025",
    tags: ["react", "express", "prisma"],
    bullets: [
      "Designed and built a responsive company website and CMS to attract potential stakeholders.",
      "Developed REST APIs and integrated third-party data sources for real-time reporting.",
      "Maintained the production environment with monitoring, security patches and performance work.",
    ],
  },
  {
    hash: "1f4e6b0",
    role: "Lead DevOps",
    org: "IMCS Toolkit @ Singapore Polytechnic",
    period: "Oct 2024 – Aug 2025",
    tags: ["terraform", "aws", "ci/cd"],
    bullets: [
      "Built an AI-powered business excellence toolkit with automated digital forms and a management dashboard for 500 users.",
      "Implemented infrastructure-as-code with Terraform and GitHub Actions for automated testing, containerised deployments and AWS provisioning.",
      "Integrated budget alarms and an AI autofill feature with AWS OpenSearch and Bedrock.",
    ],
  },
];

export const education = [
  { school: "National University of Singapore", detail: "Bachelor of Computing, Computer Science", period: "2026 – 2030" },
  { school: "Singapore Management University", detail: "Semester exchange, Computer Science", period: "Aug – Dec 2025" },
  { school: "Singapore Polytechnic", detail: "Diploma in Information Technology with Merit", period: "2023 – 2026" },
];
