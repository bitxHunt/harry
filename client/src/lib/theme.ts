// Colour themes, picked from the colour blocks in the About (fastfetch) section.
// Every theme is a html[data-accent] block in styles/index.css; light themes also set
// html[data-mode="light"] so the hologram and cursor switch from glow to ink.
export const THEMES = [
  { id: "shwe", label: "shwe (gold)", mode: "dark", swatch: ["#f6c66b", "#e8954a"] },
  { id: "holo", label: "holo", mode: "dark", swatch: ["#7cf2ff", "#a78bfa"] },
  { id: "mocha", label: "catppuccin mocha", mode: "dark", swatch: ["#cba6f7", "#89b4fa"] },
  { id: "latte", label: "catppuccin latte", mode: "light", swatch: ["#8839ef", "#eff1f5"] },
  { id: "rosepine", label: "rosé pine", mode: "dark", swatch: ["#ebbcba", "#c4a7e7"] },
  { id: "tokyonight", label: "tokyo night", mode: "dark", swatch: ["#7aa2f7", "#bb9af7"] },
  { id: "decaygreen", label: "decay green", mode: "dark", swatch: ["#78dba9", "#8fd1c7"] },
  { id: "mono", label: "mono", mode: "dark", swatch: ["#e8eef6", "#8b97a8"] },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
// No saved choice: Latte on a light-mode device, gold (shwe) on a dark one.
export const defaultTheme = (): ThemeId =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "latte" : "shwe";

const KEY = "holo-accent";
export const THEME_EVENT = "holo-theme";

const find = (id: string | undefined) => THEMES.find((t) => t.id === id);

export const currentTheme = (): ThemeId => find(document.documentElement.dataset.accent)?.id ?? defaultTheme();
export const isLightTheme = () => document.documentElement.dataset.mode === "light";

export const applyTheme = (id: ThemeId) => {
  const theme = find(id) ?? find(defaultTheme())!;
  const root = document.documentElement;
  root.dataset.accent = theme.id;
  root.dataset.mode = theme.mode;
  try {
    localStorage.setItem(KEY, theme.id);
  } catch {
    /* storage blocked: the theme still applies for this visit */
  }
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme.id }));
};

// Step through the themes (used by the h/l, j/k keys in About).
export const cycleTheme = (step: number) => {
  const i = THEMES.findIndex((t) => t.id === currentTheme());
  applyTheme(THEMES[(i + step + THEMES.length) % THEMES.length].id);
};

// Reads the live accent colours (used by the WebGL hologram and the cursor canvas).
export const accentColors = () => {
  const css = getComputedStyle(document.documentElement);
  return {
    cyan: css.getPropertyValue("--holo-cyan").trim(),
    violet: css.getPropertyValue("--holo-violet").trim(),
    pink: css.getPropertyValue("--holo-pink").trim(),
  };
};
