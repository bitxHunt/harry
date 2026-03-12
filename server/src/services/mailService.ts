import { resend } from "@/config/index.js";
import { generateEnquiryHTML } from "@/templates/enquiry.js";
import { generateSubscriptionHTML } from "@/templates/subscription.js";
import { enquiry, subscription } from "@/generated/client.js";
import { env } from "@/config/env.js";

export const sendEnquiryEmail = async (enquiryFormData: enquiry) => {
  try {
    const { name, email } = enquiryFormData;

    const emailObj = {
      from: `Enquiries <${env.SENDER_EMAIL}>`,
      to: env.SENDER_SOURCE,
      replyTo: email,
      subject: `New Enquiry: ${name}`,
      html: generateEnquiryHTML(enquiryFormData),
    };

    await resend.emails.send(emailObj);
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
      from: `Articles <${env.SENDER_EMAIL}>`,
      to: emailReceipient,
      replyTo: env.SENDER_SOURCE,
      subject: `Subscription Confirmed`,
      html: generateSubscriptionHTML(email),
    };

    await resend.emails.send(emailObj);
  } catch (error) {
    console.error(error);
  }
};
