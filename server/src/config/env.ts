import { config } from "dotenv";
import { z } from "zod";
config();

const envSchema = z.object({
  PORT: z.coerce.number().min(1),
  APP_URL: z.string().min(1),
  API_URL: z.string().min(1),
//   DATABASE_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
