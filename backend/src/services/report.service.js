"use strict";

import Platillo from "../entity/dishes.entity.js";
import Ingredient from "../entity/ingredients.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getDailyReportService() {
    try {
        // Obtiene el número de pedidos atendidos
        const dishRepository = AppDataSource.getRepository(Platillo);
        const totalDishes = await dishRepository.count();

        // Obtiene el uso de ingredientes
        const ingredientRepository = AppDataSource.getRepository(Ingredient);
        const ingredientsUsed = await ingredientRepository.find();

        return [{ totalDishes, ingredientsUsed }, null];
    } catch (error) {
        console.error("Error al generar el reporte diario:", error);
        return [null, "Error interno del servidor"];
    }
}
