export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background">
      <div className="relative size-10 rounded-full border border-holo/40" aria-hidden>
        <span className="animate-spin-hand absolute left-1/2 top-1/2 h-4 w-px origin-top -translate-x-1/2 bg-holo" style={{ animationDuration: "1.2s" }} />
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">loading…</p>
    </div>
  );
}
