import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AxiosError } from "axios";

import { public_api } from "@/lib/api-client";
import { SubscriptionFormSchema } from "@/types/schemas/form.schema";
import type { SubscriptionFormType } from "@/types/form.type";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";

import { ArrowUpRight } from "lucide-react";
import { ArrowRight } from "lucide-react";

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
    onSuccess: () => {
      form.reset();
    },
    onError: (error: AxiosError<{ success: boolean; message: string }>) => {
      console.error("Subscribe error:", error);
    },
  });

  function onSubmit(formData: SubscriptionFormType) {
    mutation.mutate(formData);
  }

  return (
    <section
      id="articles"
      className="border-t border-neutral-200 dark:border-white/20"
    >
      <div className="max-w-6xl mx-auto px-8 md:px-10 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — unchanged */}
          <div className="text-center md:text-left">
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-500 dark:text-indigo-300 mb-4">
              Writing
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Articles</h2>
            <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed mb-6">
              I'm working on writing about things I've built and learnt. First
              few pieces are in the works.
            </p>
            <Button variant="outline" className="rounded-full" asChild>
              <Link to="/articles">
                Explore articles <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right — notify me */}
          <div className="border border-neutral-200 dark:border-white/20 rounded-2xl p-8 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-xs text-indigo-300 dark:text-indigo-300 border-indigo-500/40"
              >
                ✦ Work in Progress
              </Badge>
            </div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Get notified when I publish
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Drop your email and I'll let you know when the first article is
              out.
            </p>

            {mutation.isSuccess ? (
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                You're in ✓
              </p>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex gap-2 mt-1">
                        <Input
                          {...field}
                          type="email"
                          placeholder="example@gmail.com"
                          aria-invalid={fieldState.invalid}
                          className="text-sm flex-1 min-w-0"
                        />
                        <Button
                          type="submit"
                          size="icon"
                          className="shrink-0"
                          disabled={mutation.isPending}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
