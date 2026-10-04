import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { public_api } from "@/lib/api-client";
import { EnquiryFormSchema } from "@/types/schemas/form.schema";
import type { EnquiryFormType } from "@/types/form.type";
import { profile } from "@/data";
import { SectionHead } from "@/components/terminal/section-head";
import { Terminal } from "@/components/terminal/terminal";
import { FieldShell, HoloInput, HoloTextarea } from "@/components/terminal/field";

const postEnquiry = async (formData: EnquiryFormType) => {
  const response = await public_api.post("/enquiry", formData);
  return response.data;
};

export function Contact() {
  const form = useForm<EnquiryFormType>({
    resolver: zodResolver(EnquiryFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: postEnquiry,
    onSuccess: () => form.reset(),
    onError: (error: AxiosError<{ success: boolean; message: string }>) => {
      console.error("Enquiry error:", error);
    },
  });

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-24">
      <SectionHead n={7} command="mail harry" title="Get in touch" />
      <div className="grid gap-6 md:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="reveal">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Internships, projects, a question about something I've built, or just a chat about tech or billiards.
            Drop me a message and I'll get back to you as soon as I can.
          </p>
          <dl className="mt-5 space-y-3 font-mono text-sm md:mt-8">
            <div className="flex gap-3"><dt className="w-20 text-dim">email</dt><dd><a className="text-arch hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
            {profile.socials.map((s) => (
              <div key={s.label} className="flex gap-3">
                <dt className="w-20 text-dim">{s.label.toLowerCase()}</dt>
                <dd><a className="text-foreground hover:text-holo" href={s.href} target="_blank" rel="noopener noreferrer">{s.href.replace(/^https?:\/\/(www\.)?/, "")}</a></dd>
              </div>
            ))}
          </dl>
        </div>

        <Terminal title="~/inbox — new message" className="reveal">
          {mutation.isSuccess ? (
            <div className="p-8 font-mono text-sm">
              <p className="text-holo">✓ Message sent</p>
              <p className="mt-2 text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
              <button onClick={() => mutation.reset()} className="mt-6 text-xs text-arch hover:underline">send another</button>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4 p-6" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FieldShell id="name" label="name" error={fieldState.error?.message}>
                      <HoloInput id="name" {...field} placeholder="Your name" autoComplete="name" aria-invalid={fieldState.invalid} />
                    </FieldShell>
                  )}
                />
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FieldShell id="email" label="email" error={fieldState.error?.message}>
                      <HoloInput id="email" type="email" {...field} placeholder="you@example.com" autoComplete="email" aria-invalid={fieldState.invalid} />
                    </FieldShell>
                  )}
                />
              </div>
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldShell id="message" label="message" error={fieldState.error?.message}>
                    <HoloTextarea id="message" {...field} rows={5} placeholder="What's on your mind?" aria-invalid={fieldState.invalid} />
                  </FieldShell>
                )}
              />
              {mutation.isError && (
                <p className="font-mono text-xs text-destructive">
                  error: {mutation.error.response?.data?.message ?? "couldn't send right now"}. You can also email me directly.
                </p>
              )}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="inline-flex items-center gap-2 rounded-full bg-arch px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_16px_-8px_var(--arch)] transition hover:brightness-110 disabled:opacity-60"
              >
                {mutation.isPending ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </Terminal>
      </div>
    </section>
  );
}
