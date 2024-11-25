"use strict";
import { getDailyReportService } from "../services/report.service.js";
import { getDishesByDateRangeService } from "../services/report.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export async function getDailyReport(req, res) {
  try {
    const reportDate = new Date(); // Puedes ajustar esto según tus necesidades
    const [report, error] = await getDailyReportService(reportDate);

    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, 'Reporte diario generado exitosamente', report);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getDishesByDateRange(req, res) {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return handleErrorClient(res, 400, "Las fechas de inicio y fin son requeridas.");
        }

        const [dishes, error] = await getDishesByDateRangeService(startDate, endDate);

        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Platillos encontrados en el rango de fechas", dishes);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}


