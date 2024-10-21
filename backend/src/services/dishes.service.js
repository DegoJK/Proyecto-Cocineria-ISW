"use strict";

import Platillo from "../entity/dishes.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getDishService(query) {
    try {
        const { id } = query;

        const dishRepository = AppDataSource.getRepository(Platillo);

        const dishFound = await dishRepository.findOne({
            where: [{ id: id }],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];

        const { password, ...dishData } = dishFound;

        return [dishData, null];
    } catch (error) {
        console.error("Error al obtener el platillo:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getDishesService() {
    try {
        const dishRepository = AppDataSource.getRepository(Platillo);

        const dishes = await dishRepository.find();

        if (!dishes || dishes.length === 0) return [null, "No hay platillos"];

        const dishesData = dishes.map(({ password, ...dish }) => dish);

        return [dishesData, null];
    } catch (error) {
        console.error("Error al obtener los platillos:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createDishService(body) {
    try {
        const dishRepository = AppDataSource.getRepository(Platillo);

        const newDish = dishRepository.create(body);

        await dishRepository.save(newDish);

        return [newDish, null];
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

