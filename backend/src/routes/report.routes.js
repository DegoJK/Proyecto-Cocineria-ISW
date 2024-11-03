import { Router } from "express";
import { getDailyReport } from "../controllers/report.controller.js";
import { getDishesByDateRange } from "../controllers/report.controller.js";
import { getDetailedIngredientUsage } from "../controllers/report.controller.js";
import { getFinancialMetrics } from "../controllers/report.controller.js";
import { getHistoricalComparison } from "../controllers/report.controller.js";


const router = Router();

router.get("/daily", getDailyReport);
router.get("/dishes-by-date", getDishesByDateRange);
router.get("/ingredient-usage", getDetailedIngredientUsage);
router.get("/financial-metrics", getFinancialMetrics);
router.get("/historical-comparison", getHistoricalComparison);

export default router;

