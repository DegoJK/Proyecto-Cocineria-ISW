"use strict";
//peticiones
import {
  createDishService,
  deleteDishService,
  getDishesService,
  getDishService,
  updateDishService,
} from "../services/dishes.service.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

import { dishBodyValidation } from "../validations/dishes.validation.js";

export async function getDish(req, res) {
  try {
    const { id } = req.params;

    const [dish, errorDish] = await getDishService({ id });

    if (errorDish) return handleErrorClient(res, 404, errorDish);

    handleSuccess(res, 200, "Platillo encontrado", dish);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getDishes(req, res) {
  try {
    const [dishes, errorDishes] = await getDishesService();

    if (errorDishes) return handleErrorClient(res, 404, errorDishes);

    dishes.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Platillos encontrados", dishes);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createDish(req, res) {
  try {
    const { body } = req;

    //const { error } = dishBodyValidation.validate(body);//este apartado no es necesario ya que se valida en el servicio
    //if (error) return handleErrorClient(res, 400, error.message);

    const [newDish, errorDish] = await createDishService(body);

    if (errorDish) return handleErrorClient(res, 400, errorDish);

    handleSuccess(res, 201, "Platillo creado", newDish);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}


export async function updateDish(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const [updatedDish, errorDish] = await updateDishService(id, body);

    if (errorDish) return handleErrorClient(res, 404, errorDish);

    handleSuccess(res, 200, "Platillo actualizado", updatedDish);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteDish(req, res) {
  try {
    const { id } = req.params;

    const [deletedDish, errorDish] = await deleteDishService(id);

    if (errorDish) return handleErrorClient(res, 404, errorDish);

    handleSuccess(res, 200, "Platillo eliminado", deletedDish);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
