"use strict";
import {
  addDishToCart,
  createOrderService,
  getOrdersService,
} from "../services/waiter.service.js";

import {
  getDishesService,
  getDishService,
} from "../services/dishes.service.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getOrders(req, res) {
  try {
    const searchType = req.query.type;
    const [orders, errorOrders] = await getOrdersService(searchType);

    if (errorOrders) return handleErrorClient(res, 404, errorOrders);

    handleSuccess(res, 200, "Ordenes encontradas", orders);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function addDishToOrder(req, res) {
  try {
    const { orderId, dishId, quantity } = req.body;

    const [order, errorOrder] = await getOrderById(orderId);
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

export async function createOrder(req, res) {
  try {
    const [dishes, errorDishes] = await getDishesService();

    if (errorDishes) return handleErrorClient(res, 404, errorDishes);

    const tableNumber = req.query.table;

    const body = req.body;

    const order = {
      tableNumber,
    };

    const [newOrder, errorOrder] = await createOrderService(order);
    if (errorOrder) return handleErrorClient(res, 400, errorOrder);
    handleSuccess(res, 201, "Orden creada", newOrder);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
