import { env } from "@/config/env.js";
import { PrismaClient } from "@/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

export const corsOptions = {
  origin: env.APP_URL,
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
};
