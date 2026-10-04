import { useEffect, useRef } from "react";
import { THEME_EVENT, accentColors, isLightTheme } from "@/lib/theme";

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: number };

// "#7cf2ff" -> "124, 242, 255" for rgba() strings on the canvas
const rgb = (hex: string) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

const CLICKABLE = "a, button, [role='button'], [role='option'], [role='tab'], label, summary";
const TEXT = "input, textarea, select, [contenteditable='true']";

// What the reticle says over a target. `data-cursor` on an element overrides it.
const labelFor = (el: HTMLElement) => {
  const hint = el.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
  if (hint) return hint;
  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute("href") ?? "";
    if (href.startsWith("http") || href.startsWith("mailto")) return "open ↗";
    if (href.startsWith("#") || href.includes("#")) return "jump";
    return "go";
  }
  if (el.getAttribute("role") === "option" || el.getAttribute("role") === "tab") return "select";
  return "click";
};

/*
  The site's cursor: a bright core with a comet trail of the same particles as the
  hero hologram. Over anything clickable it opens into an aim reticle with a short
  label; a click throws a small burst. Mouse devices only; text fields keep the native
  caret; reduced motion keeps the native cursor. Also drives the panel border light.
*/
export const HoloCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("holo-cursor");

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dot = dotRef.current!;
    const reticle = reticleRef.current!;
    const label = labelRef.current!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    let palette = { cyan: "124, 242, 255", violet: "167, 139, 250", pink: "240, 171, 252" };
    let blend: GlobalCompositeOperation = "lighter";
    const readPalette = () => {
      const c = accentColors();
      if (c.cyan) palette = { cyan: rgb(c.cyan), violet: rgb(c.violet), pink: rgb(c.pink) };
      blend = isLightTheme() ? "source-over" : "lighter"; // glow on dark, ink on light
    };
    readPalette();
    window.addEventListener(THEME_EVENT, readPalette);
    let x = -100, y = -100, lx = -100, ly = -100, rx = -100, ry = -100;
    let aiming = false, hidden = true, raf = 0, last = performance.now(), spin = 0, rs = 0.45;

    const emit = (count: number, spread: number, speed: number) => {
      for (let i = 0; i < count && particles.length < 220; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = Math.random() * speed;
        const max = 0.45 + Math.random() * 0.5;
        particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: max, max, size: 1 + Math.random() * spread, hue: Math.random() });
      }
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // the reticle eases after the pointer; the dot is exact
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      spin += dt * (aiming ? 90 : 0);
      rs += ((aiming ? 1 : 0.45) - rs) * 0.2;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${aiming ? 0.5 : 1})`;
      reticle.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) rotate(${spin}deg) scale(${rs.toFixed(3)})`;
      label.style.transform = `translate3d(${rx + 34}px, ${ry + 22}px, 0)`;

      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.globalCompositeOperation = blend;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.94;
        p.vy *= 0.94;
        const k = p.life / p.max;
        const color = p.hue < 0.6 ? palette.cyan : p.hue < 0.9 ? palette.violet : palette.pink;
        ctx.fillStyle = `rgba(${color}, ${0.75 * k})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.4 + k * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      // keep running while anything is still moving, otherwise stop to save battery
      const settled = particles.length === 0 && Math.abs(x - rx) < 0.3 && Math.abs(y - ry) < 0.3 && Math.abs(rs - 0.45) < 0.01 && !aiming;
      raf = settled ? 0 : requestAnimationFrame(loop);
    };
    const wake = () => {
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement;
      const inText = !!target.closest(TEXT);
      if (hidden || inText !== root.classList.contains("holo-cursor-text")) {
        hidden = false;
        root.classList.toggle("holo-cursor-text", inText);
      }
      dot.style.opacity = reticle.style.opacity = inText ? "0" : "1";

      const hit = inText ? null : target.closest<HTMLElement>(CLICKABLE + ", [data-cursor]");
      aiming = !!hit;
      label.textContent = hit ? labelFor(hit) : "";
      label.style.opacity = hit ? "1" : "0";

      // comet trail: more particles when moving faster
      const speed = Math.hypot(x - lx, y - ly);
      lx = x; ly = y;
      if (!inText) emit(Math.min(3, Math.floor(speed / 10)), 1.6, 25);

      const panel = target.closest<HTMLElement>(".holo-panel");
      if (panel) {
        const r = panel.getBoundingClientRect();
        panel.style.setProperty("--mx", `${x - r.left}px`);
        panel.style.setProperty("--my", `${y - r.top}px`);
      }
      wake();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      emit(18, 2.2, 260);
      reticle.animate([{ boxShadow: `0 0 0 0 rgba(${palette.cyan}, 0.7)` }, { boxShadow: `0 0 0 22px rgba(${palette.cyan}, 0)` }], { duration: 450, easing: "ease-out" });
      wake();
    };
    const onLeave = () => {
      hidden = true;
      dot.style.opacity = reticle.style.opacity = label.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("holo-cursor", "holo-cursor-text");
      window.removeEventListener("resize", resize);
      window.removeEventListener(THEME_EVENT, readPalette);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] hidden [.holo-cursor_&]:block">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div ref={reticleRef} className="absolute left-0 top-0 size-14 rounded-full border-[1.5px] border-holo/80 opacity-0 transition-opacity duration-200">
        {/* four ticks: the aim marks */}
        <span className="absolute left-1/2 top-[-5px] h-2.5 w-[1.5px] -translate-x-1/2 bg-holo" />
        <span className="absolute bottom-[-5px] left-1/2 h-2.5 w-[1.5px] -translate-x-1/2 bg-holo" />
        <span className="absolute left-[-5px] top-1/2 h-[1.5px] w-2.5 -translate-y-1/2 bg-holo" />
        <span className="absolute right-[-5px] top-1/2 h-[1.5px] w-2.5 -translate-y-1/2 bg-holo" />
      </div>
      <div ref={dotRef} className="absolute left-0 top-0 size-3.5 rounded-full bg-[color-mix(in_srgb,var(--holo-cyan)_25%,white)] opacity-0 shadow-[0_0_6px_1px_var(--holo-cyan),0_0_14px_2px_color-mix(in_srgb,var(--holo-violet)_40%,transparent)] transition-[opacity] duration-200" />
      <span ref={labelRef} className="absolute left-0 top-0 rounded bg-[color-mix(in_srgb,var(--background)_75%,transparent)] px-2 py-0.5 font-mono text-[11px] text-holo opacity-0 transition-opacity duration-150" />
    </div>
  );
};
