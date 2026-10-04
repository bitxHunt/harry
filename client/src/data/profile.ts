// Who I am: contact details, links and the fastfetch lines in About.

export const profile = {
  name: "Thiha Swan Htet",
  nickname: "Harry",
  handle: "harry",
  host: "arch",
  location: "Singapore",
  status: "Open to Summer 2027 internships",
  cv: "https://tsh-profile.s3.ap-southeast-1.amazonaws.com/Thiha_Swan_Htet_CV.pdf",
  email: "tsh.harry.dev@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/bitxHunt" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/thiha-swan-htet-tsh/" },
  ],
};

// Small Burmese touches (hero greeting, fastfetch "from" line, footer sign-off).
// Set to false to remove all of them in one place.
export const culture = { myanmar: true };

// Rendered like `fastfetch` output in the About section.
export const fetchInfo: [string, string][] = [
  ["os", "Arch Linux x86_64"],
  ["wm", "Hyprland (HyDE)"],
  ["shell", "zsh"],
  ["editor", "vim"],
  ["terminal", "kitty"],
  ["study", "Computer Science @ NUS"],
  ...(culture.myanmar ? ([["from", "Myanmar · မြန်မာ"]] as [string, string][]) : []),
  ["langs", "TypeScript · Java · Python · SQL"],
  ["uptime", "building since 2023"],
];
