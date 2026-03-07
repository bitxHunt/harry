import * as z from "zod";

export const BaseEmailSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
});

export const EnquiryFormSchema = BaseEmailSchema.extend({
  name: z.string().min(5, { message: "Name must be at least 5 characters." }),
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters." }),
});

export const SubscriptionFormSchema = BaseEmailSchema;
