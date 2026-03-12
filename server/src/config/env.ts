import { config } from "dotenv";
import * as z from "zod";
config();

const envSchema = z.object({
  PORT: z.coerce.number().min(1),
  APP_URL: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  SENDER_EMAIL: z.email().min(1),
  SENDER_SOURCE: z.email().min(1),
  RESEND_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
