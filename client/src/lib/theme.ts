// Accent themes, picked from the colour blocks in the About (fastfetch) section.
// The default ("holo") needs no attribute; the others set html[data-accent].
export const THEMES = [
  { id: "holo", label: "holo", swatch: ["#7cf2ff", "#a78bfa"] },
  { id: "arch", label: "arch", swatch: ["#4cc3ff", "#7aa2f7"] },
  { id: "shwe", label: "shwe (gold)", swatch: ["#f6c66b", "#e8954a"] },
  { id: "mono", label: "mono", swatch: ["#e8eef6", "#8b97a8"] },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const KEY = "holo-accent";
export const THEME_EVENT = "holo-theme";

export const currentTheme = (): ThemeId => (document.documentElement.dataset.accent as ThemeId) || "holo";

export const applyTheme = (id: ThemeId) => {
  const root = document.documentElement;
  if (id === "holo") delete root.dataset.accent;
  else root.dataset.accent = id;
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* storage blocked: the theme still applies for this visit */
  }
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: id }));
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
