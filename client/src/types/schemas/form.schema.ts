import { z } from "zod";

export const EnquiryFormSchema = z.object({
name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters." }),
});
