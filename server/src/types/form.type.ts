import * as z from "zod";
import {
  EnquiryFormSchema,
  SubscriptionFormSchema,
  BaseEmailSchema,
} from "@/types/schemas/form.schema.js";

export type BaseEmailType = z.infer<typeof BaseEmailSchema>;
export type EnquiryFormType = z.infer<typeof EnquiryFormSchema>;
export type SubscriptionFormType = z.infer<typeof SubscriptionFormSchema>;
