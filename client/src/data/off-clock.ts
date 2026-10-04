// Life outside work, shown as systemd user services in Off the clock.

export type OffClock = { unit: string; title: string; kicker: string; body: string; since?: string; link?: { label: string; slug: string } };

export const offClock: OffClock[] = [
  {
    unit: "billiards",
    title: "Billiards",
    kicker: "cue · angles · patience",
    body: "How I switch off. Lining up a shot is a small geometry problem, and I like that it rewards patience more than power.",
  },
  {
    unit: "tutoring",
    since: "Sep 2025",
    title: "Tutoring",
    kicker: "python · micro:bit · maths",
    body: "I teach students to code with Python and micro:bit. Explaining something simply is the best test of whether I actually understand it.",
  },
  {
    unit: "volunteering",
    title: "Volunteering",
    kicker: "seniors · community",
    body: "I organised brisk walk activities with seniors. Small, steady things that bring people together matter more than big gestures.",
    link: { label: "Read about it", slug: "brisk-walk" },
  },
  {
    unit: "ios-club",
    title: "Building communities",
    kicker: "founder · ios club",
    body: "I founded an iOS development club at SP and built it from scratch: the SOPs, the recruitment, the proposals. Within a year it was running workshops and competitions.",
    link: { label: "Read the story", slug: "founding-school-club" },
  },
];
