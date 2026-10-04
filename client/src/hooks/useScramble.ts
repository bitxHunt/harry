import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFXYZ";
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
  Decodes `text` into place like a terminal: characters resolve left to right over
  `duration` ms, the rest flicker through random glyphs. Restarts whenever `text`
  changes while `active` is true. Under reduced motion it just returns the text.
*/
export const useScramble = (text: string, active = true, duration = 650) => {
  const [frame, setFrame] = useState<{ text: string; out: string }>({ text, out: text });
  const raf = useRef(0);
  const animate = active && !reducedMotion();

  useEffect(() => {
    if (!animate) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const settled = Math.floor(p * text.length);
      const out = text
        .split("")
        .map((ch, i) => (i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");
      setFrame({ text, out });
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [text, animate, duration]);

  // until the first frame for this text arrives, show the text itself
  return animate && frame.text === text ? frame.out : text;
};
