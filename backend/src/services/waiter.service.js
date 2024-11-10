"use strict";

import Order from "../entity/order.entity.js";
import OrderDish from "../entity/orderDish.entity.js";

import { AppDataSource } from "../config/configDb.js";

export async function createOrderService(data) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const orderPlatilloRepository = AppDataSource.getRepository(OrderDish);

    const newOrder = orderRepository.create({
      table: { id: data.tableId },
      status: "Pendiente",
    });

    await orderRepository.save(newOrder);

    for (const dish of data.dishes) {
      const orderDishes = orderPlatilloRepository.create({
        orders: { id: newOrder.id },
        dishes: { id: dish.dishId },
        quantity: dish.quantity,
      });

      await orderPlatilloRepository.save(orderDishes);
    }

    return [newOrder, null];
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getOrdersService(query) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const { type, f } = query;
    let orders;

    if (type === "pending") {
      orders = await orderRepository.find({
        where: { status: "Pendiente" },
        relations: ["orderDishes", "orderDishes.dishes", "table"],
      });
    } else if (type === "all") {
      orders = await orderRepository.find({
        relations: ["orderDishes", "orderDishes.dishes", "table"],
      });
    } else {
      return [null, "Tipo de orden no válido"];
    }

    if (!orders || orders.length === 0) return [null, "No hay órdenes"];

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      table: order.table ? order.table.number : null,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      orderDishes: order.orderDishes.map((orderDish) => ({
        dishId: orderDish.dishes.id,
        quantity: orderDish.quantity,
      })),
    }));

    return [formattedOrders, null];
  } catch (error) {
    console.error("Error al obtener las ordenes:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getOrderByIdService(id) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const order = await orderRepository.findOne({
      where: { id: id },
      relations: ["orderDishes", "orderDishes.dishes", "table"],
    });
    if (!order) return [null, "Orden no encontrada"];

    const formattedOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      table: order.table ? order.table.number : null,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      orderDishes: order.orderDishes.map((orderDish) => ({
        dishId: orderDish.dishes.id,
        quantity: orderDish.quantity,
      })),
    };

    return [formattedOrder, null];
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateOrderStatusService(id, status) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const order = await orderRepository.findOne({
      where: { id: id },
    });
    if (!order) return [null, "Orden no encontrada"];

    order.status = status;
    await orderRepository.save(order);

    return [order, null];
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteOrderService(id) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);

    const order = await orderRepository.findOne({
      where: { id: id },
    });
    if (!order) return [null, "Orden no encontrada"];

    await orderRepository.remove(order);

    return [order, null];
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    return [null, "Error interno del servidor"];
  }
}
