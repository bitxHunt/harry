import express from "express";
import * as subscriptionController from "@/controllers/subscriptionController";

const router = express.Router();

router.post("/", subscriptionController.createSubscriptionResponse);

export default router;
