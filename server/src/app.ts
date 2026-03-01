import express from "express";
import cors from "cors";
import { corsOptions } from "@/config/index.js";
import mainRoutes from "@/routes/mainRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.use("/api", mainRoutes);

export default app;
