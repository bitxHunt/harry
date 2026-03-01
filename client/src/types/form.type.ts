import { z } from "zod";
import { EnquiryFormSchema } from "@/types/schemas/form.schema";

export type EnquiryFormType = z.infer<typeof EnquiryFormSchema>;
