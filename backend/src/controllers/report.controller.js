"use strict";
import { getDailyReportService } from "../services/report.service.js";
import { getDishesByDateRangeService } from "../services/report.service.js";
import { getDetailedIngredientUsageService } from "../services/report.service.js";
import { getFinancialMetricsService } from "../services/report.service.js";
import { getHistoricalComparisonService } from "../services/report.service.js";
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

export async function getDetailedIngredientUsage(req, res) {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return handleErrorClient(res, 400, "Las fechas de inicio y fin son requeridas.");
        }

        const [ingredientUsage, error] = await getDetailedIngredientUsageService(startDate, endDate);

        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Desglose detallado de ingredientes", ingredientUsage);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getFinancialMetrics(req, res) {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return handleErrorClient(res, 400, "Las fechas de inicio y fin son requeridas.");
        }

        const [financialMetrics, error] = await getFinancialMetricsService(startDate, endDate);

        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Métricas financieras obtenidas exitosamente", financialMetrics);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getHistoricalComparison(req, res) {
    try {
        const { currentDate } = req.query;

        if (!currentDate) {
            return handleErrorClient(res, 400, "La fecha actual es requerida.");
        }

        const [comparisonData, error] = await getHistoricalComparisonService(currentDate);

        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Comparativa histórica obtenida exitosamente", comparisonData);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}


