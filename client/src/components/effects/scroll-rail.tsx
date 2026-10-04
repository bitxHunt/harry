import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
  Replaces the native page scrollbar (hidden in CSS) with a thin glowing rail on the
  right edge. It only shows while scrolling or when the mouse is near the edge, and the
  thumb can be dragged or the track clicked, so nothing is lost.
*/
export const ScrollRail = () => {
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const thumb = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const dragStart = useRef({ y: 0, scroll: 0 });

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const t = thumb.current, tr = track.current;
      if (!t || !tr) return;
      const ratio = innerHeight / doc.scrollHeight;
      const h = Math.max(40, tr.clientHeight * ratio);
      const max = doc.scrollHeight - innerHeight;
      const y = max > 0 ? (scrollY / max) * (tr.clientHeight - h) : 0;
      t.style.height = `${h}px`;
      t.style.transform = `translateY(${y}px)`;
    };
    const flash = () => {
      update();
      setVisible(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), 1100);
    };
    const nearEdge = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && innerWidth - e.clientX < 28) flash();
    };
    update();
    window.addEventListener("scroll", flash, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("pointermove", nearEdge, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", flash);
      window.removeEventListener("resize", update);
      window.removeEventListener("pointermove", nearEdge);
      ro.disconnect();
      clearTimeout(hideTimer.current);
    };
  }, []);

  const scrollToTrackPoint = (clientY: number) => {
    const tr = track.current!;
    const r = tr.getBoundingClientRect();
    const p = (clientY - r.top) / r.height;
    window.scrollTo({ top: p * (document.documentElement.scrollHeight - innerHeight), behavior: "smooth" });
  };

  const onThumbDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = { y: e.clientY, scroll: scrollY };
    setDragging(true);
  };
  const onThumbMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const tr = track.current!, t = thumb.current!;
    const max = document.documentElement.scrollHeight - innerHeight;
    const per = max / (tr.clientHeight - t.clientHeight);
    window.scrollTo({ top: dragStart.current.scroll + (e.clientY - dragStart.current.y) * per });
  };

  return (
    <div
      ref={track}
      aria-hidden
      onPointerDown={(e) => scrollToTrackPoint(e.clientY)}
      className={cn(
        "fixed bottom-3 right-1 top-3 z-[80] w-2 rounded-full transition-opacity duration-300",
        visible || dragging ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        ref={thumb}
        onPointerDown={onThumbDown}
        onPointerMove={onThumbMove}
        onPointerUp={() => setDragging(false)}
        className="absolute left-0 right-0 top-0 rounded-full bg-holo/70 shadow-[0_0_6px_color-mix(in_srgb,var(--holo-cyan)_60%,transparent)] hover:bg-holo"
      />
    </div>
  );
};
