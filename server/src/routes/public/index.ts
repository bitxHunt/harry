import express from "express";
import enquiryRoute from "@/routes/public/enquiryRoute.js";
import subscriptionRoute from "@/routes/public/subscriptionRoute.js";

const router = express.Router();

// Enquiry API Route
router.use("/enquiry", enquiryRoute);

// Subscription API Route
router.use("/subscribe", subscriptionRoute);

export default router;
