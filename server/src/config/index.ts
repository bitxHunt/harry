import { env } from "@/config/env.js";
import { PrismaClient } from "@/generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Resend } from "resend";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

export const resend = new Resend(env.RESEND_API_KEY);

export const corsOptions = {
  origin: env.APP_URL,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
