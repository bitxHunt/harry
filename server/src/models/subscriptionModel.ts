import { prisma } from "@/config/index.js";
import { BaseEmailType, SubscriptionFormType } from "@/types/form.type.js";

export const findUser = async ({ email }: BaseEmailType) => {
  return await prisma.subscription.findFirst({
    where: {
      email,
    },
  });
};

export const insertFormSubscription = async (
  formData: SubscriptionFormType,
) => {
  const { email } = formData;
  return await prisma.subscription.create({
    data: {
      email,
    },
  });
};
