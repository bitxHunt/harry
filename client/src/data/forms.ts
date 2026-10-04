// The hero's transformation dial: one person, several forms. Facts only from the CV.
export type FormId = "harry" | "developer" | "devops" | "pm" | "tutor" | "volunteer" | "offduty";
export type Form = {
  id: FormId;
  name: string; // headline after transforming
  short: string; // label on the dial
  tagline: string;
  powers: string[];
  origin: string;
  knownFor: string;
};

export const baseForm: Form = {
  id: "harry",
  name: "Thiha Swan Htet",
  short: "harry",
  tagline: "Computer Science at NUS. Developer by training, project manager by experience, coding tutor on the side. Pick a form to see each side.",
  powers: ["TypeScript", "Java", "Python", "Arch Linux"],
  origin: "Singapore",
  knownFor: "Open to Summer 2027 internships",
};

export const forms: Form[] = [
  {
    id: "developer",
    name: "The Developer",
    short: "dev",
    tagline: "Builds web apps end to end, from the database schema to the last button.",
    powers: ["React", "TanStack", "Express", "Prisma", "PostgreSQL"],
    origin: "Singapore Polytechnic, 2023",
    knownFor: "RExus Bioenergy site and CMS, Study Buddy",
  },
  {
    id: "devops",
    name: "The DevOps",
    short: "ops",
    tagline: "Makes the boring parts automatic: infrastructure as code, CI and cloud budgets.",
    powers: ["Terraform", "GitHub Actions", "AWS", "Docker"],
    origin: "IMCS Toolkit, 2024",
    knownFor: "Lead DevOps for a toolkit used by 500 people",
  },
  {
    id: "pm",
    name: "The Project Manager",
    short: "pm",
    tagline: "The bridge between clients and the team: scoped modules, clear timelines, projects that ship.",
    powers: ["Scoping", "Timelines", "Stakeholders", "Scrum"],
    origin: "Orfeostory, 2025",
    knownFor: "Delivered 5+ client web and mobile projects",
  },
  {
    id: "tutor",
    name: "The Tutor",
    short: "tutor",
    tagline: "Teaches kids to code, and learns the topic twice in the process.",
    powers: ["Python", "micro:bit", "Lesson design", "Patience"],
    origin: "Strive Math, 2025",
    knownFor: "Python lessons for primary school students",
  },
  {
    id: "volunteer",
    name: "The Volunteer",
    short: "care",
    tagline: "Shows up for the community, usually with a plan and a checklist.",
    powers: ["Organising", "Empathy", "Community building"],
    origin: "SP LEO Club",
    knownFor: "Brisk walks with seniors, founding an iOS club",
  },
  {
    id: "offduty",
    name: "Off Duty",
    short: "pool",
    tagline: "At the billiards table, working out angles three shots ahead.",
    powers: ["Billiards", "Geometry", "Patience"],
    origin: "Any table that's free",
    knownFor: "Potting the white ball on the winning shot. Still working on it.",
  },
];
