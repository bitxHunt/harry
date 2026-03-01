import express from "express";
import * as formController from "@/controllers/formController.js";

const router = express.Router();

router.post(
  "/",
  formController.createEnquiryResponse
);

export default router;
