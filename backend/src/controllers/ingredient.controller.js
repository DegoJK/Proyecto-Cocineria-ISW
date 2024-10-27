"use strict";
import {
    createIngredientService,
    deleteIngredientService,
    getIngredientService,
    getIngredientsService,
    updateIngredientService,
} from "../services/ingredient.service.js";

import { IngredientBodyValidation } from "../validations/ingredient.validation.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";


export async function getIngredient(req, res) {
    try {
        const { id } = req.params;

        const [Ingredient, errorIngredient] = await getIngredientService({ id });

        if (errorIngredient) return handleErrorClient(res, 404, errorIngredient);

        handleSuccess(res, 200, "Ingrediente encontrado", Ingredient);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getIngredients(req, res) {
    try {
        const [Ingredients, errorIngredients] = await getIngredientsService();

        if (errorIngredients) return handleErrorClient(res, 404, errorIngredients);

        Ingredients.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Ingredientes encontrados", Ingredients);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export async function createIngredient(req, res) {
    try {
        const { body } = req;

        const { error } = IngredientBodyValidation.validate(body);

        if (error) return handleErrorClient(res, 400, error.message);

        const [newIngredient, errorIngredient] = await createIngredientService(body);

        if (errorIngredient) return handleErrorClient(res, 400, errorIngredient);

        handleSuccess(res, 201, "Ingrediente creado", newIngredient);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateIngredient(req, res) {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id, 10);  // Convierte el ID a entero para que no haya problemas con la base de datos
        const { body } = req;
        const { error } = IngredientBodyValidation.validate(body);

        if (error) return handleErrorClient(res, 400, error.message);

        const [updatedIngredient, errorIngredient] = await updateIngredientService(parsedId, body);

        if (errorIngredient) return handleErrorClient(res, 400, errorIngredient);

        handleSuccess(res, 200, "Ingrediente actualizado", updatedIngredient);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}









export async function deleteIngredient(req, res) {
    try {
        const { id } = req.params;
        
        // Se Convierte el ID a entero para que no haya problemas con la base de datos
        const parsedId = parseInt(id, 10);  

        const [deletedIngredient, errorIngredient] = await deleteIngredientService(parsedId);

        if (errorIngredient) return handleErrorClient(res, 404, errorIngredient);

        handleSuccess(res, 200, "Ingrediente eliminado", deletedIngredient);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}



