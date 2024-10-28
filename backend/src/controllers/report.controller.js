"use strict";

import { getDailyReportService } from "../services/report.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export async function getDailyReport(req, res) {
    try {
        const [report, error] = await getDailyReportService();

        if (error) return handleErrorClient(res, 500, error);

        handleSuccess(res, 200, "Reporte diario generado", report);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
