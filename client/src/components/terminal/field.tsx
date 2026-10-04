import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-lg border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_60%,transparent)] px-3.5 py-2.5 font-mono text-sm text-foreground outline-none transition placeholder:text-dim focus:border-holo focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--holo-cyan)_15%,transparent)] aria-[invalid=true]:border-destructive";

export const HoloInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(base, className)} {...props} />
));
HoloInput.displayName = "HoloInput";

export const HoloTextarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(base, "resize-none", className)} {...props} />
));
HoloTextarea.displayName = "HoloTextarea";

export const FieldShell = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block font-mono text-[11px] text-dim">
      <span className="text-holo">$</span> {label}
    </label>
    {children}
    {error && <p className="mt-1.5 font-mono text-[11px] text-destructive">error: {error}</p>}
  </div>
);
