"use strict";

import Platillo from "../entity/dishes.entity.js";
import Ingredient from "../entity/ingredients.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { Between } from "typeorm";

export async function getDailyReportService() {
    try {
        const dishRepository = AppDataSource.getRepository(Platillo);
        const totalDishes = await dishRepository.count();

        const ingredientRepository = AppDataSource.getRepository(Ingredient);
        const ingredientsUsed = await ingredientRepository.find();

        return [{ totalDishes, ingredientsUsed }, null];
    } catch (error) {
        console.error("Error al generar el reporte diario:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getDishesByDateRangeService(startDate, endDate) {
    try {
        const dishRepository = AppDataSource.getRepository(Platillo);
        const dishesInRange = await dishRepository.find({
            where: {
                createdAt: Between(new Date(startDate), new Date(endDate))
            }
        });

        if (!dishesInRange || dishesInRange.length === 0) {
            return [null, "No se encontraron platillos en el rango de fechas"];
        }

        return [dishesInRange, null];
    } catch (error) {
        console.error("Error al obtener los platillos por fecha:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getDetailedIngredientUsageService(startDate, endDate) {
    try {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);
        const ingredientUsage = await ingredientRepository.query(`
            SELECT ing.nombre, SUM(dp.cantidadRequired) AS totalUso
            FROM dish_product dp
            JOIN ingredients ing ON dp.product_id = ing.id
            JOIN platillos p ON dp.dish_id = p.id
            WHERE p.createdAt BETWEEN ? AND ?
            GROUP BY ing.nombre
        `, [startDate, endDate]);

        if (!ingredientUsage || ingredientUsage.length === 0) {
            return [null, "No se encontraron datos de uso de ingredientes en el rango de fechas"];
        }

        return [ingredientUsage, null];
    } catch (error) {
        console.error("Error al obtener el desglose de ingredientes:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getFinancialMetricsService(startDate, endDate) {
    try {
        const dishRepository = AppDataSource.getRepository(Platillo);
        const financialMetrics = await dishRepository.query(`
            SELECT 
                SUM(precio) AS totalIngresos, 
                AVG(precio) AS ingresoPromedioPorPlatillo,
                COUNT(*) AS totalPlatillosVendidos
            FROM platillos
            WHERE createdAt BETWEEN ? AND ?
        `, [startDate, endDate]);

        if (!financialMetrics || !financialMetrics.length) {
            return [null, "No se encontraron datos financieros en el rango de fechas"];
        }

        return [financialMetrics[0], null]; // Devuelve el primer resultado (objeto con las métricas)
    } catch (error) {
        console.error("Error al obtener las métricas financieras:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getHistoricalComparisonService(currentDate) {
    try {
        const dishRepository = AppDataSource.getRepository(Platillo);

        // Obtener la fecha anterior
        const previousDay = new Date(currentDate);
        previousDay.setDate(previousDay.getDate() - 1);

        // Obtener métricas del día actual
        const currentMetrics = await dishRepository.query(`
            SELECT 
                SUM(precio) AS totalIngresos, 
                AVG(precio) AS ingresoPromedioPorPlatillo,
                COUNT(*) AS totalPlatillosVendidos
            FROM platillos
            WHERE createdAt BETWEEN ? AND ?
        `, [currentDate, currentDate]);

        // Obtener métricas del día anterior
        const previousMetrics = await dishRepository.query(`
            SELECT 
                SUM(precio) AS totalIngresos, 
                AVG(precio) AS ingresoPromedioPorPlatillo,
                COUNT(*) AS totalPlatillosVendidos
            FROM platillos
            WHERE createdAt BETWEEN ? AND ?
        `, [previousDay, previousDay]);

        if ((!currentMetrics.length && !previousMetrics.length)) {
            return [null, "No se encontraron datos para la comparación"];
        }

        return [{
            currentDay: currentMetrics[0],
            previousDay: previousMetrics[0],
            trend: {
                ingresoDiferencia: currentMetrics[0].totalIngresos - previousMetrics[0].totalIngresos,
                platillosDiferencia: currentMetrics[0].totalPlatillosVendidos - previousMetrics[0].totalPlatillosVendidos
            }
        }, null];
    } catch (error) {
        console.error("Error al obtener la comparación histórica:", error);
        return [null, "Error interno del servidor"];
    }
}
