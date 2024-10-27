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
      default: 1,
    },
  },
  relations: {
    order: {
      type: "many-to-one",
      target: "Order",
      joinColumn: true,
      inverseSide: "ordertodishes",
      onDelete: "CASCADE",
    },
    dish: {
      type: "many-to-one",
      target: "platillos",
      joinColumn: true,
      inverseSide: "ordertodishes",
    },
  },
});

export default OrderDishSchema;
