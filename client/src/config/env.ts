import * as z from "zod";

/*
  VITE_API_URL is the server's /api base. VITE_DEV_API_URL is the old name, still read
  so existing .env files and the Vercel setting keep working. Both are optional: without
  one the page still renders and the contact form fails into its "email me" message,
  instead of the whole app crashing at import time.
*/
const envSchema = z.object({
  VITE_API_URL: z.string().min(1).optional(),
  VITE_DEV_API_URL: z.string().min(1).optional(),
});

const parsed = envSchema.parse(import.meta.env);
export const API_URL = parsed.VITE_API_URL ?? parsed.VITE_DEV_API_URL ?? "/api";
if (!parsed.VITE_API_URL && !parsed.VITE_DEV_API_URL) {
  console.warn("VITE_API_URL is not set; the contact form and newsletter will not reach the server.");
}
