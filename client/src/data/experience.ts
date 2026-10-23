// Work history (shown as `git log` in Experience) and education (About).

export type Experience = {
  hash: string;
  role: string;
  org: string;
  period: string;
  tags: string[];
  bullets: string[];
  head?: boolean;
  open?: boolean; // expanded by default on desktop
};

// Same order and facts as the CV, shown like `git log`.
export const experiences: Experience[] = [
  {
    hash: "5b81f2d",
    role: "Coding Instructor (Part-time)",
    org: "Strive Math, NovaLearn, private tutoring",
    period: "Sep 2025 – Present",
    tags: ["python", "scratch", "micro:bit"],
    head: true,
    bullets: [
      "Run Python classes at Strive Math, visualising maths with code through art and animation projects.",
      "Tutor students privately in programming, including Scratch, and built micro:bit lessons for NovaLearn.",
    ],
  },
  {
    hash: "e7c9a41",
    role: "Project Manager (Internship)",
    org: "Orfeostory Pte. Ltd.",
    period: "Dec 2025 – Jun 2026",
    tags: ["delivery", "stakeholders", "scrum"],
    bullets: [
      "Managed end-to-end delivery of 5+ web and mobile projects for clients including National Institute of Education, Kopi Brewery and Aquinas Law, from proposal through testing, launch and handover training.",
      "Led cross-functional teams (design, development, QA, SEO) and managed scoping, timelines and client communication.",
    ],
  },
  {
    hash: "1f4e6b0",
    role: "Lead DevOps",
    org: "IMCS Toolkit @ Singapore Polytechnic",
    period: "Oct 2024 – Aug 2025",
    tags: ["terraform", "github-actions", "aws", "docker"],
    open: true,
    bullets: [
      "Developed an AI-powered business excellence toolkit with automated digital forms and a management dashboard for 500 users.",
      "Implemented infrastructure as code with Terraform and GitHub Actions for automated testing, containerised deployments and AWS provisioning.",
      "Integrated budget alarms and an AI autofill feature using AWS OpenSearch and Bedrock.",
    ],
  },
];

export const education = [
  { school: "National University of Singapore", detail: "Bachelor of Computing, Computer Science", period: "Aug 2026 – Aug 2030" },
  { school: "Singapore Polytechnic", detail: "Diploma in Information Technology with Merit, Director's Honour Roll · SMU exchange (Java, discrete maths)", period: "Apr 2023 – Apr 2026" },
];
