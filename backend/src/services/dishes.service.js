"use strict";
import Platillo from "../entity/dishes.entity.js";
import Ingredient from "../entity/ingredients.entity.js";
import PlatilloIngredient from "../entity/dishIngredient.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getDishService(query) {
  try {
    const { id } = query;

    const dishRepository = AppDataSource.getRepository(Platillo);

    const dishFound = await dishRepository.findOne({
      where: { id: id },
      relations: ["platilloIngredients", "platilloIngredients.ingredient"],
    });

    if (!dishFound) return [null, "Platillo no encontrado"];

    return [dishFound, null];
  } catch (error) {
    console.error("Error al obtener el platillo:", error);
    return [null, "Error interno del servidor"];
  }
}


export async function getDishesService() {
  try {
    const dishRepository = AppDataSource.getRepository(Platillo);


    const dishes = await dishRepository.find({
      relations: ["platilloIngredients", "platilloIngredients.ingredient"],
    });

    if (!dishes || dishes.length === 0) return [null, "No hay platillos"];

    return [dishes, null];
  } catch (error) {
    console.error("Error al obtener los platillos:", error);
    return [null, "Error interno del servidor"];
  }
}


export async function createDishService(body) {
  try {
    const dishRepository = AppDataSource.getRepository(Platillo);
    const ingredientRepository = AppDataSource.getRepository(Ingredient);
    const platilloIngredientRepository = AppDataSource.getRepository(PlatilloIngredient);

    // Extrae 'ingredientes' del body
    const { estado, ingredientes, ...bodyWithoutEstado } = body;

    // Crea el platillo sin 'estado' y sin 'ingredientes'
    const newDish = dishRepository.create(bodyWithoutEstado);

    // Guarda el platillo para obtener su ID
    const savedDish = await dishRepository.save(newDish);

    // Maneja la asociación de ingredientes y cantidades
    if (ingredientes && ingredientes.length > 0) {
      for (const item of ingredientes) {
        const ingredientId = item.ingredient_id;
        const cantidad = item.cantidad;

        // Busca el ingrediente por ID
        const ingredient = await ingredientRepository.findOne({
          where: { id: ingredientId },
        });

        if (ingredient) {
          // Crea la relación en PlatilloIngredient
          const platilloIngredient = platilloIngredientRepository.create({
            dish_id: savedDish.id,
            ingredient_id: ingredient.id,
            cantidad: cantidad,
          });

          // Guarda la relación
          await platilloIngredientRepository.save(platilloIngredient);
        } else {
          console.error(`Ingrediente con ID ${ingredientId} no encontrado`);
        }
      }
    }

    // Opcional: Recarga el platillo con las relaciones para devolver toda la información
    const dishWithIngredients = await dishRepository.findOne({
      where: { id: savedDish.id },
      relations: ["platilloIngredients", "platilloIngredients.ingredient"],
    });

    return [dishWithIngredients, null];
  } catch (error) {
    console.error("Error al crear el platillo:", error);
    return [null, "Error interno del servidor"];
  }
}


export async function updateDishService(id, body) {
  try {
    const dishRepository = AppDataSource.getRepository(Platillo);

    const dishFound = await dishRepository.findOne({
      where: [{ id: id }],
    });

    if (!dishFound) return [null, "Platillo no encontrado"];

    await dishRepository.update(id, body);

    const updatedDish = await dishRepository.findOne({
      where: [{ id: id }],
    });

    return [updatedDish, null];
  } catch (error) {
    console.error("Error al actualizar el platillo:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteDishService(id) {
  try {
    const dishRepository = AppDataSource.getRepository(Platillo);

    const dishFound = await dishRepository.findOne({
      where: [{ id: id }],
    });

    if (!dishFound) return [null, "Platillo no encontrado"];

    await dishRepository.delete(id);

    return [null, null];
  } catch (error) {
    console.error("Error al eliminar el platillo:", error);
    return [null, "Error interno del servidor"];
  }
}
