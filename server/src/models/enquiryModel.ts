import { prisma } from "@/config/index.js";
import { EnquiryFormType } from "@/types/form.type.js";

export const insertFormEnquiry = async (formData: EnquiryFormType) => {
  const { name, email, message } = formData;
  return await prisma.enquiry.create({
    data: {
      name,
      email,
      message,
    },
  });
};
