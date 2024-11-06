"use strict";
import { EntitySchema } from "typeorm";

const OrderDishSchema = new EntitySchema({
  name: "OrderDish",
  tableName: "ordertodishes",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    quantity: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    orders: {
      type: "many-to-one",
      target: "Order",
      joinColumn: { name: "orderId" },
      inverseSide: "orderDishes", // Este nombre debe coincidir con la relación en Order
      onDelete: "CASCADE",
    },
    dishes: {
      type: "many-to-one",
      target: "Platillo",
      joinColumn: { name: "platilloId" },
      inverseSide: "orderDishes", // Este nombre debe coincidir con la relación en Platillo
      onDelete: "CASCADE",
    },
  },
});

export default OrderDishSchema;
