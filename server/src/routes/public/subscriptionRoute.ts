import express from "express";
import * as subscriptionController from "@/controllers/subscriptionController.js";

const router = express.Router();

router.post("/", subscriptionController.createSubscriptionResponse);

export default router;
