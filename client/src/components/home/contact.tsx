import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { public_api } from "@/lib/api-client";
import { EnquiryFormSchema } from "@/types/schemas/form.schema";
import type { EnquiryFormType } from "@/types/form.type";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const postEnquiry = async (formData: EnquiryFormType) => {
  const response = await public_api.post("/enquiry", formData);
  return response.data;
};

export function Contact() {
  const form = useForm<EnquiryFormType>({
    resolver: zodResolver(EnquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: postEnquiry,
    onSuccess: () => {
      form.reset();
    },
    onError: (error: AxiosError<{ success: boolean; message: string }>) => {
      console.error("Enquiry error:", error);
    },
  });

  function onSubmit(formData: EnquiryFormType) {
    mutation.mutate(formData);
  }

  return (
    <section className="bg-black text-white [&_*]:outline-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Want to work together?
            </h2>
            <p className="text-neutral-400 text-base max-w-md leading-relaxed">
              Whether it's a project, an opportunity, or just a conversation —
              I'm open to it. Reach out anytime.
            </p>
          </div>

          {/* Right — card + form */}
          {mutation.isSuccess ? (
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">Message sent ✓</p>
              <p className="text-neutral-400 text-sm">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          ) : (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Get in touch</CardTitle>
                <CardDescription className="text-neutral-400">
                  Fill in the form and I'll get back to you as soon as I can.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form id="enquiry-form" onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup>
                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-xs text-neutral-400 uppercase tracking-widest">
                              Name
                            </FieldLabel>
                            <Input
                              {...field}
                              placeholder="Your name"
                              aria-invalid={fieldState.invalid}
                              className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-white/20"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-xs text-neutral-400 uppercase tracking-widest">
                              Email
                            </FieldLabel>
                            <Input
                              {...field}
                              type="email"
                              placeholder="example@gmail.com"
                              aria-invalid={fieldState.invalid}
                              className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-white/20"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    {/* Message */}
                    <Controller
                      name="message"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="text-xs text-neutral-400 uppercase tracking-widest">
                            Message
                          </FieldLabel>
                          <InputGroup className="outline-none">
                            <InputGroupTextarea
                              {...field}
                              placeholder="Send a message..."
                              rows={4}
                              aria-invalid={fieldState.invalid}
                              className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-white/20 resize-none min-h-24"
                            />
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <div className="mt-5">
                    <Button
                      type="submit"
                      form="enquiry-form"
                      disabled={mutation.isPending}
                      className="w-auto bg-white text-black hover:bg-neutral-200"
                    >
                      {mutation.isPending ? "Sending..." : "Send enquiry"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
