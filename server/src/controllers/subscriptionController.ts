import { Request, Response } from "express";
import * as subscriptionModel from "@/models/subscriptionModel.js";
import * as mailService from "@/services/mailService.js";
import { SubscriptionFormSchema } from "@/types/schemas/form.schema.js";

export const createSubscriptionResponse = async (
  req: Request,
  res: Response,
) => {
  try {
    const validatedFormData = SubscriptionFormSchema.parse(req.body);
    const user = await subscriptionModel.findUser(validatedFormData);

    // If user is already subscribed, don't send email
    if (user != null) {
      res.status(201).json({
        success: true,
        message: "Subscription Confirmed",
      });
      return;
    }

    // Insert into db if first time user
    const data =
      await subscriptionModel.insertFormSubscription(validatedFormData);
    if (data) {
      res.status(201).json({
        success: true,
        message: "Subscription Confirmed",
      });
    }

    // Send email asyc without waiting for actual completion
    await mailService.sendSubscriptionEmail(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
