"use strict";
import {
  createOrderService,
  getOrderByIdService,
  getOrdersService,
} from "../services/waiter.service.js";

import { getDishesService } from "../services/dishes.service.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getOrders(req, res) {
  try {
    const searchType = req.query.type;
    if (!searchType) return [null, "No se ha especificado el tipo de búsqueda"];
    const [orders, errorOrders] = await getOrdersService(searchType);

    if (errorOrders) return handleErrorClient(res, 404, errorOrders);

    handleSuccess(res, 200, "Ordenes encontradas", orders);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const [order, errorOrder] = await getOrderByIdService(id);

    if (errorOrder) return handleErrorClient(res, 404, errorOrder);

    handleSuccess(res, 200, "Orden encontrada", order);
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
