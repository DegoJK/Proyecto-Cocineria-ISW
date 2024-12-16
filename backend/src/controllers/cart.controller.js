"use strict";

import { getOrderByIdService } from "../services/waiter.service.js";
import { getDishService } from "../services/dishes.service.js";
import { addDishToCart, getCartService } from "../services/cart.service.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function addDishToOrder(req, res) {
  try {
    const { orderId, dishId, quantity } = req.body;

    const [order, errorOrder] = await getOrderByIdService(orderId);
    if (errorOrder) return handleErrorClient(res, 404, errorOrder);
    const [dish, errorDish] = await getDishService(dishId);
    if (errorDish) return handleErrorClient(res, 404, errorDish);

    const [updatedOrder, errorUpdate] = await addDishToCart(
      order,
      dish,
      quantity
    );
    if (errorUpdate) return handleErrorClient(res, 400, errorUpdate);

    handleSuccess(res, 200, "Platillo agregado al carrito", updatedOrder);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getCart(req, res) {
  try {
    const [carrito, errorCarrito] = await getCartService();

    if (errorCarrito) return handleErrorClient(res, 404, errorCarrito);

    handleSuccess(res, 200, "Carrito encontrado", carrito);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
