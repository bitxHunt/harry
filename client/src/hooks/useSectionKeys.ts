import { useEffect, useRef } from "react";

/*
  Keyboard shortcuts for one section. They only fire while focus is inside that
  section (click or Tab into it first), so single-letter keys never hijack the page.
  Ignored while typing in a field or when a modifier key is held. The handler returns
  true when it used the key (the browser default is then prevented).
*/
export const useSectionKeys = (sectionId: string, onKey: (e: KeyboardEvent) => boolean) => {
  const handler = useRef(onKey);
  useEffect(() => {
    handler.current = onKey; // always call the latest handler without re-subscribing
  });

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    // Clicking plain text doesn't move focus, so let the section itself take it.
    if (!el.hasAttribute("tabindex")) el.tabIndex = -1;
    const listener = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (!el.contains(target)) return;
      if (target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (handler.current(e)) e.preventDefault();
    };
    el.addEventListener("keydown", listener);
    return () => el.removeEventListener("keydown", listener);
  }, [sectionId]);
};
