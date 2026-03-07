import express from "express";
import * as enquiryController from "@/controllers/enquiryController.js";

const router = express.Router();

router.post(
  "/",
  enquiryController.createEnquiryResponse
);

export default router;
