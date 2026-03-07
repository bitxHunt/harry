import { Request, Response } from "express";
import * as enquiryModel from "@/models/enquiryModel.js";
import * as mailService from "@/services/mailService.js";
import { EnquiryFormSchema } from "@/types/schemas/form.schema.js";

export const createEnquiryResponse = async (req: Request, res: Response) => {
  try {
    const validatedFormData = EnquiryFormSchema.parse(req.body);
    const data = await enquiryModel.insertFormEnquiry(validatedFormData);
    if (data) {
      res.status(201).json({
        success: true,
        message: "Enquiry Submitted",
      });
    }
    // Send email asyc without waiting for actual completion
    await mailService.sendEnquiryEmail(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
