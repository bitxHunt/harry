import { useEffect } from "react";

// Adds `.in` to every `.reveal` element as it scrolls into view. One shared observer, no library.
export const useReveal = (deps: unknown[] = []) => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          observer.unobserve(e.target);
        }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
