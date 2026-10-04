import { useEffect, useRef, useState } from "react";
import type { FormId } from "@/data";
import { cn } from "@/lib/utils";
import type { SceneApi } from "./hologram-scene";

type Props = { form: FormId; onClick?: () => void; className?: string };

// Waits for an idle moment after load so three.js downloads after first paint.
const whenIdle = (cb: () => void) => {
  const run = () => ("requestIdleCallback" in window ? requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 300));
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
};

export const FormHologram = ({ form, onClick, className }: Props) => {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<SceneApi | null>(null);
  const formRef = useRef(form);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    whenIdle(() => {
      if (cancelled || !host.current) return;
      import("./hologram-scene")
        .then(({ createScene }) => createScene(host.current!, formRef.current, reduced))
        .then((scene) => {
          if (cancelled) return scene.dispose();
          api.current = scene;
          setReady(true);
        })
        .catch(() => setFailed(true)); // no WebGL: keep the static fallback
    });
    return () => {
      cancelled = true;
      api.current?.dispose();
      api.current = null;
    };
  }, []);

  useEffect(() => {
    if (formRef.current !== form) {
      formRef.current = form;
      api.current?.morphTo(form);
    }
  }, [form]);

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      {/* static stand-in until the scene is ready (or if WebGL is unavailable) */}
      <div aria-hidden className={cn("pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-700", ready && "opacity-0")}>
        <div className="size-[58%] rounded-full border border-holo/40 bg-[radial-gradient(circle,color-mix(in_srgb,var(--holo-cyan)_22%,transparent),transparent_65%)] shadow-[0_0_80px_-20px_var(--holo-cyan)]" />
        {!failed && <span className="absolute bottom-[12%] font-mono text-[11px] text-dim">initialising hologram…</span>}
      </div>
      <div
        ref={host}
        role="button"
        tabIndex={0}
        aria-label="Hologram. Click to switch to the next form"
        onClick={onClick}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onClick?.())}
        className="absolute inset-0 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-holo/60"
      />
    </div>
  );
};
