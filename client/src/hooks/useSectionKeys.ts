import { useEffect, useRef } from "react";

// The section whose shortcuts are live: the last one hovered or focused into.
let activeSection: string | null = null;

/*
  Keyboard shortcuts for one section. They fire while that section is active: the
  mouse is over it, or focus moved into it (Tab or click), whichever happened last.
  So single-letter keys never hijack the whole page. Ignored while typing in a field
  or when a modifier key is held. The handler returns true when it used the key
  (the browser default is then prevented).
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
    const activate = () => (activeSection = sectionId);
    const leave = () => {
      if (activeSection === sectionId) activeSection = null;
    };
    const listener = (e: KeyboardEvent) => {
      if (activeSection !== sectionId) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (handler.current(e)) e.preventDefault();
    };
    el.addEventListener("mouseenter", activate);
    el.addEventListener("focusin", activate);
    el.addEventListener("mouseleave", leave);
    document.addEventListener("keydown", listener);
    return () => {
      el.removeEventListener("mouseenter", activate);
      el.removeEventListener("focusin", activate);
      el.removeEventListener("mouseleave", leave);
      document.removeEventListener("keydown", listener);
    };
  }, [sectionId]);
};
