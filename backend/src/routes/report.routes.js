import { Router } from "express";
import { getDailyReport, getSalesByDateRange } from "../controllers/report.controller.js";

const router = Router();

router.get("/daily", getDailyReport);
router.get("/sales-by-date", getSalesByDateRange);

export default router;