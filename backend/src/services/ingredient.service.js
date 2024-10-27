"use strict";

import Ingredient from "../entity/ingredients.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getIngredientService(query) {
    try {
        const { id } = query;

        const ingredientRepository = AppDataSource.getRepository(Ingredient);

        const ingredientFound = await ingredientRepository.findOne({
            where: [{ id: id }],
        });

        if (!ingredientFound) return [null, "Ingrediente no encontrado"];

        const { password, ...ingredientData } = ingredientFound;

        return [ingredientData, null];
    } catch (error) {
        console.error("Error al obtener el ingrediente:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getIngredientsService() {
    try {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);

        const ingredients = await ingredientRepository.find();

        if (!ingredients || ingredients.length === 0) return [null, "No hay ingredientes"];

        const ingredientsData = ingredients.map(({ password, ...ingredient }) => ingredient);

        return [ingredientsData, null];
    } catch (error) {
        console.error("Error al obtener los ingredientes:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createIngredientService(body) {
    try {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);

        // Realiza una búsqueda en la tabla para verificar si ya existe un ingrediente con el mismo 
        // nombre y tipo que el que se está intentando agregar
        const existingIngredient = await ingredientRepository.findOne({ 
            where: { nombre: body.nombre, tipo: body.tipo }
        });

        //Si se encuentra un ingrediente existente, se suma la nueva cantidad al campo cantidad del ingrediente existente.
        if (existingIngredient) {
            existingIngredient.cantidad += body.cantidad;
            await ingredientRepository.save(existingIngredient);
            return [existingIngredient, null];
        }

        // Si no, crear un nuevo ingrediente
        const newIngredient = ingredientRepository.create(body);
        await ingredientRepository.save(newIngredient);

        return [newIngredient, null];
    } catch (error) {
        console.error("Error al crear o actualizar el ingrediente:", error);
        return [null, "Error interno del servidor"];
    }
}




export async function updateIngredientService(id, body) {
    try {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);

        const ingredientFound = await ingredientRepository.findOne({
            where: [{ id: id }],
        });

        if (!ingredientFound) return [null, "Ingrediente no encontrado"];

        const updatedIngredient = await ingredientRepository.save({
            ...ingredientFound,
            ...body,
        });

        return [updatedIngredient, null];
    } catch (error) {
        console.error("Error al actualizar el ingrediente:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteIngredientService(id) {
    try {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);

        const ingredientFound = await ingredientRepository.findOne({
            where: [{ id: id }],
        });

        if (!ingredientFound) return [null, "Ingrediente no encontrado"];

        await ingredientRepository.delete(id);

        return [ingredientFound, null];
    } catch (error) {
        console.error("Error al eliminar el ingrediente:", error);
        return [null, "Error interno del servidor"];
    }
}