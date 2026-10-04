import { experiences, projects } from "@/data";

// Experience tags that are technologies (the rest, like "stakeholders", are not).
const EXPERIENCE_TECH: Record<string, string> = {
  react: "React",
  express: "Express",
  prisma: "Prisma",
  terraform: "Terraform",
  aws: "AWS",
  python: "Python",
  "ci/cd": "CI/CD",
};

export type Source = { name: string; kind: "project" | "role"; when: string };
export type Row = { pid: number; name: string; usedIn: Source[]; share: number };

/*
  Builds the process list from real data: every technology tagged on a project or a
  job is a "process", and %USE is the share of projects + jobs that used it. Nothing
  here is a self-rating.
*/
export const buildRows = (): { rows: Row[]; sources: number } => {
  const usage = new Map<string, Map<string, Source>>();
  const use = (tech: string, source: Source) => {
    if (!usage.has(tech)) usage.set(tech, new Map());
    usage.get(tech)!.set(source.name, source); // same place twice (project + role) counts once
  };
  projects.forEach((p) => p.tags.forEach((t) => use(t, { name: p.title, kind: "project", when: p.year })));
  experiences.forEach((e) =>
    e.tags.forEach((t) => EXPERIENCE_TECH[t] && use(EXPERIENCE_TECH[t], { name: e.org.split(" @ ")[0], kind: "role", when: e.period })),
  );
  const sources = projects.length + experiences.length;
  const rows = [...usage.entries()].map(([name, map]) => ({
    pid: 1000 + [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 8999, 7),
    name,
    usedIn: [...map.values()],
    share: map.size / sources,
  }));
  return { rows, sources };
};
