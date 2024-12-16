"use strict";
import { EntitySchema } from "typeorm";

const OrderDishSchema = new EntitySchema({
  name: "OrderDish",
  tableName: "ordertodishes",
  columns: {
    orderId: {
      type: "int",
      primary: true,
    },
    platilloId: {
      type: "int",
      primary: true,
    },
    quantity: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    orders: {
      target: "Order",
      type: "many-to-one",
      joinColumn: {
        name: "orderId",
        referencedColumnName: "id",
      },
      inverseSide: "orderDishes", // Este nombre debe coincidir con la relación en Order
      nullable: false,
      onDelete: "CASCADE",
    },
    dishes: {
      target: "Platillo",
      type: "many-to-one",
      joinColumn: {
        name: "platilloId",
        referencedColumnName: "id",
      },
      inverseSide: "orderDishes", // Este nombre debe coincidir con la relación en Platillo
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

export default OrderDishSchema;
