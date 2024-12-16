"use strict";
import {
  createOrderService,
  deleteOrderService,
  getOrderByIdService,
  getOrdersService,
  updateOrderStatusService,
  updateTableStatusFromOrderService,
} from "../services/waiter.service.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

import {
  orderArrayBodyValidation,
  orderBodyValidation,
} from "../validations/order.validation.js";

export async function createOrder(req, res) {
  try {
    const tableId = req.query.table;
    const { dishes } = req.body;

    if (!Array.isArray(dishes) || dishes.length === 0) {
      return handleErrorClient(
        res,
        400,
        "Se debe proporcionar una lista de platillos con cantidades."
      );
    }

    const { error } = orderArrayBodyValidation.validate(dishes);
    if (error) return handleErrorClient(res, 400, error.message);

    const orderData = {
      tableId,
      dishes,
    };

    const [newOrder, errorOrder] = await createOrderService(orderData);
    if (errorOrder) return handleErrorClient(res, 400, errorOrder);

    const [newTable, errorTable] = await updateTableStatusFromOrderService(
      tableId,
      "ocupada"
    );
    if (errorTable) return handleErrorClient(res, 400, errorTable);

    handleSuccess(res, 201, "Orden creada y mesa actualizada", [newOrder]);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getOrders(req, res) {
  try {
    const query = req.query;
    if (!query) return [null, "No se ha especificado el tipo de búsqueda"];
    const [orders, errorOrders] = await getOrdersService(query);

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

export async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    let { status } = req.body;

    if (!status) {
      return handleErrorClient(res, 400, "Se debe proporcionar un estado.");
    }

    status = status.toLowerCase().trim();
    const { error } = orderBodyValidation.validate({ status });
    if (error) return handleErrorClient(res, 400, error.message);

    const [order, errorOrder] = await updateOrderStatusService(id, status);

    if (errorOrder) return handleErrorClient(res, 400, errorOrder);

    handleSuccess(res, 200, "Orden actualizada", order);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteOrder(req, res) {
  try {
    const { id } = req.params;

    const [order, errorOrder] = await deleteOrderService(id);

    if (errorOrder) return handleErrorClient(res, 400, errorOrder);

    handleSuccess(res, 200, "Orden eliminada", order);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
