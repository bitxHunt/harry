import { transporter } from "@/middlewares/mailMiddleware.js";
import { generateEnquiryHTML } from "@/templates/enquiry.js";
import { generateSubscriptionHTML } from "@/templates/subscription.js";
import { enquiry, subscription } from "@/generated/client.js";
import { env } from "@/config/env.js";

export const sendEnquiryEmail = async (enquiryFormData: enquiry) => {
  try {
    const { name, email } = enquiryFormData;

    const emailSource = env.SMTP_USER;
    const emailReceipient = env.SMTP_USER;

    const emailObj = {
      from: `"Enquiries" <${emailSource}>`,
      to: emailReceipient,
      replyTo: email,
      subject: `New Enquiry: ${name}`,
      html: generateEnquiryHTML(enquiryFormData),
    };
    await transporter.sendMail(emailObj);
  } catch (error) {
    console.error(error);
  }
};

export const sendSubscriptionEmail = async (
  subscriptionFormData: subscription,
) => {
  try {
    const { email } = subscriptionFormData;

    const emailReceipient = email;

    const emailObj = {
      from: "Articles Subscription",
      to: emailReceipient,
      replyTo: env.SMTP_USER,
      subject: `Subscription Confirmed`,
      html: generateSubscriptionHTML(email),
    };
    await transporter.sendMail(emailObj);
  } catch (error) {
    console.error(error);
  }
};
