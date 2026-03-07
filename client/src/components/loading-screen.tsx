export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-center gap-5 z-50">
      {/* Spinner */}
      <div className="relative h-9 w-9">
        <div className="absolute inset-0 rounded-full border-2 border-white/8" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-400 animate-spin" />
      </div>

      {/* Name */}
      <p className="text-xs font-medium tracking-[0.25em] uppercase text-neutral-500">
        Thiha Swan Htet
      </p>
    </div>
  );
}
