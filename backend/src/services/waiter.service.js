"use strict";

import Order from "../entity/order.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getOrdersService(type) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    let orders;

    if (type === "all") {
      orders = await orderRepository.find();
    } else if (type === "pending") {
      orders = await orderRepository.find({ status: "Pendiente" });
    } else {
      return [null, "Tipo de orden no válido"];
    }

    if (!orders || orders.length === 0) return [null, "No hay ordenes"];

    return [orders, null];
  } catch (error) {
    console.error("Error al obtener las ordenes:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getOrderByIdService(id) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({ where: { id: id } });
    if (!order) return [null, "Orden no encontrada"];
    return [order, null];
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createOrderService(data) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const newOrder = orderRepository.create(data);
    await orderRepository.save(newOrder);

    return [newOrder, null];
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return [null, "Error interno del servidor"];
  }
}
