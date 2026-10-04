import { useEffect, useRef } from "react";

/*
  Keyboard shortcuts that work while a section is on screen, without clicking into it
  first. Ignored while typing in a field or when a modifier key is held. The handler
  returns true when it used the key (the browser default is then prevented).
*/
export const useSectionKeys = (sectionId: string, onKey: (e: KeyboardEvent) => boolean) => {
  const handler = useRef(onKey);
  useEffect(() => {
    handler.current = onKey; // always call the latest handler without re-subscribing
  });

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    let active = false;
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; }, { threshold: 0.35 });
    io.observe(el);
    const listener = (e: KeyboardEvent) => {
      if (!active || e.ctrlKey || e.metaKey || e.altKey) return;
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable='true']")) return;
      if (handler.current(e)) e.preventDefault();
    };
    window.addEventListener("keydown", listener);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", listener);
    };
  }, [sectionId]);
};
