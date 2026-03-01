import { Request, Response } from "express";

export const createEnquiryResponse = async (req: Request, res: Response) => {
  try {
    // chore(): Replace with actual models and business logic
    res.status(200).json({
      success: true,
      message: "Enquiry Submitted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
