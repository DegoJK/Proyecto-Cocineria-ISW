"use strict";

import { AppDataSource } from "../config/configDb.js";
import OrderDish from "../entity/orderDish.entity.js";

export async function addDishToCart(order, dish, quantity) {
  try {
    const orderDishRepository = AppDataSource.getRepository(OrderDish);
    let orderDish = await orderDishRepository.findOne({
      where: { order: order, dish: dish },
    });

    if (orderDish) {
      orderDish.quantity += quantity;
    } else {
      orderDish = orderDishRepository.create({
        order: order,
        dish: dish,
        quantity: quantity,
      });
    }

    await orderDishRepository.save(orderDish);
    return [order, null];
  } catch (error) {
    console.error("Error al agregar platillo al carrito:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getCartService() {
  try {
    const orderDishRepository = AppDataSource.getRepository(OrderDish);
    const carrito = await orderDishRepository.find({ relations: ["dish"] });
    if (!carrito || carrito.length === 0)
      return [null, "No hay platillos en el carrito"];

    const mappedCart = carrito.map((item) => {
      return {
        dish: item.dish.nombre,
        quantity: item.quantity,
      };
    });

    return [mappedCart, null];
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return [null, "Error interno del servidor"];
  }
}
