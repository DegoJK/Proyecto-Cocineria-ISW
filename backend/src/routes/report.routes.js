import { Router } from "express";
import { getDailyReport } from "../controllers/report.controller.js";

const router = Router();

router.get("/daily", getDailyReport);

export default router;
