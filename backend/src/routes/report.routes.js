import { Router } from "express";
import { getDailyReport } from "../controllers/report.controller.js";
import { getDishesByDateRange } from "../controllers/report.controller.js";



const router = Router();

router.get("/daily", getDailyReport);
router.get("/dishes-by-date", getDishesByDateRange);


export default router;

