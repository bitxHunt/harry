import nodemailer from "nodemailer";
import { env } from "@/config/env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("SMTP error:", error);
  } else {
    console.log("SMTP connection OK");
  }
});
