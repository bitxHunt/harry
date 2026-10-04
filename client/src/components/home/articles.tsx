import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { public_api } from "@/lib/api-client";
import { SubscriptionFormSchema } from "@/types/schemas/form.schema";
import type { SubscriptionFormType } from "@/types/form.type";
import { articles } from "@/data";
import { SectionHead } from "@/components/terminal/section-head";
import { HoloInput } from "@/components/terminal/field";

const postSubscribe = async (formData: SubscriptionFormType) => {
  const response = await public_api.post("/subscribe", formData);
  return response.data;
};

export function Articles() {
  const form = useForm<SubscriptionFormType>({
    resolver: zodResolver(SubscriptionFormSchema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: postSubscribe,
    onSuccess: () => form.reset(),
    onError: (error: AxiosError<{ success: boolean; message: string }>) => {
      console.error("Subscribe error:", error);
    },
  });

  return (
    <section id="articles" className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-24">
      <SectionHead n={6} command="cat ~/writing/*.md" title="Writing">
        <Link to="/articles" className="group inline-flex items-center gap-1.5 text-sm font-medium text-arch">
          All articles <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </SectionHead>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <ul className="grid gap-4">
          {articles.map((a, i) => (
            <li key={a.slug} className="reveal" style={{ ["--d" as string]: i }}>
              <Link to="/articles/$slug" params={{ slug: a.slug }} className="group holo-panel block p-6 transition hover:border-[color-mix(in_srgb,var(--holo-cyan)_40%,transparent)]">
                <p className="font-mono text-[11px] text-dim">{a.date} · {a.readTime} · <span className="text-holo">#{a.tag.toLowerCase()}</span></p>
                <h3 className="mt-2 flex items-center justify-between gap-4 text-2xl font-bold uppercase tracking-tight">
                  {a.title}
                  <ArrowUpRight className="size-5 shrink-0 text-dim transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-holo" />
                </h3>
                <p className="mt-3 line-clamp-2 leading-relaxed text-muted-foreground">{a.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="reveal holo-panel flex flex-col p-6" style={{ ["--d" as string]: 1 }}>
          <p className="font-mono text-[11px] text-dim">newsletter</p>
          <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight">Get new posts by email</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">I write about things I've built and learnt. You'll only hear from me when there's a new post.</p>
          {mutation.isSuccess ? (
            <p className="mt-auto pt-5 font-mono text-sm text-holo">✓ You're subscribed. Thanks!</p>
          ) : (
            <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))} className="mt-auto flex gap-2 pt-5" noValidate>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="flex-1">
                    <HoloInput {...field} type="email" placeholder="you@example.com" aria-label="Email" autoComplete="email" aria-invalid={fieldState.invalid} />
                    {fieldState.error && <p className="mt-1.5 font-mono text-[11px] text-destructive">error: {fieldState.error.message}</p>}
                  </div>
                )}
              />
              <button type="submit" disabled={mutation.isPending} className="h-[42px] shrink-0 rounded-lg bg-arch px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60">
                {mutation.isPending ? "…" : "Subscribe"}
              </button>
            </form>
          )}
          {mutation.isError && (
            <p className="mt-2 font-mono text-[11px] text-destructive">error: {mutation.error.response?.data?.message ?? "couldn't subscribe right now"}</p>
          )}
        </div>
      </div>
    </section>
  );
}
