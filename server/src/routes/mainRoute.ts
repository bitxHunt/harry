import express from "express";
import publicRoute from "@/routes/public/index.js";
const router = express.Router();

// Public route
router.use("/public", publicRoute);

export default router;