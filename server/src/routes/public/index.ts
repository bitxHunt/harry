import express from "express";
import formRoute from "@/routes/public/formRoute.js";

const router = express.Router();

// Form API Route
router.use("/form", formRoute);

export default router;
