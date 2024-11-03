"use strict";

import Platillo from "../entity/dishes.entity.js";
import Ingredient from "../entity/ingredients.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { Between } from "typeorm";

export async function getDailyReportService(date = new Date()) {
    try {
        const dishRepository = AppDataSource.getRepository(Platillo);
        const ingredientRepository = AppDataSource.getRepository(Ingredient);

        // Obtener el rango de fecha del día especificado
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Obtener los platillos vendidos en el rango de la fecha
        const platillosVendidos = await dishRepository.find({
            where: {
                createdAt: Between(startOfDay, endOfDay)
            }
        });

        if (!platillosVendidos.length) {
            return [null, "No se encontraron platillos vendidos para la fecha especificada"];
        }

        // Obtener todos los ingredientes utilizados (puedes ajustar esta parte para solo incluir los ingredientes de los platillos vendidos)
        const ingredientesUsados = await ingredientRepository.find();

        // Calcular ingresos totales
        const totalIncome = platillosVendidos.reduce((sum, dish) => sum + dish.precio, 0);
        const totalDishes = platillosVendidos.length;

        const report = {
            date: date.toISOString().split('T')[0],
            totalDishes,
            totalIncome,
            platillos: platillosVendidos,
            ingredientes: ingredientesUsados
        };

        return [report, null];
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


