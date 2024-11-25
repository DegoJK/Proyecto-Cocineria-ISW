// report.service.js
import Platillo from "../entity/dishes.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { Between } from "typeorm";
import Order from "../entity/order.entity.js";

export async function getDailyReportService(reportDate) {
  try {
    const startOfDay = new Date(reportDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(reportDate);
    endOfDay.setHours(23, 59, 59, 999);

    const orderRepository = AppDataSource.getRepository(Order);

    const orders = await orderRepository.find({
      where: {
        createdAt: Between(startOfDay, endOfDay),
      },
      relations: ['orderDishes', 'orderDishes.dishes', 'orderDishes.dishes.Ingredient'],
    });

    if (!orders || orders.length === 0) {
      return [null, 'No hay ventas'];
    }

    const dishesSold = {};
    const ingredientsUsed = {};

    orders.forEach((order) => {
      order.orderDishes.forEach((orderDish) => {
        const dish = orderDish.dishes;
        const dishId = dish.id;

        if (!dishesSold[dishId]) {
          dishesSold[dishId] = { dish, quantity: 0 };
        }
        dishesSold[dishId].quantity += orderDish.quantity;

        dish.Ingredient.forEach((ingredient) => {
          const ingredientId = ingredient.id;
          if (!ingredientsUsed[ingredientId]) {
            ingredientsUsed[ingredientId] = { ingredient, quantity: 0 };
          }
          ingredientsUsed[ingredientId].quantity += orderDish.quantity;
        });
      });
    });

    const dishesSoldArray = Object.values(dishesSold);
    const ingredientsUsedArray = Object.values(ingredientsUsed);

    return [{ dishesSold: dishesSoldArray, ingredientsUsed: ingredientsUsedArray }, null];
  } catch (error) {
    return [null, error.message];
  }
}


export async function getDishesByDateRangeService(startDate, endDate) {
    try {
        const dishRepository = AppDataSource.getRepository(Platillo);
        const dishesInRange = await dishRepository.find({
            where: {
                createdAt: Between(new Date(startDate), new Date(endDate))
            }
        });

        if (!dishesInRange || dishesInRange.length === 0) {
            return [null, "No se encontraron platillos en el rango de fechas"];
        }

        return [dishesInRange, null];
    } catch (error) {
        console.error("Error al obtener los platillos por fecha:", error);
        return [null, "Error interno del servidor"];
    }
}


