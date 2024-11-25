"use strict";
import { EntitySchema } from "typeorm";

const OrderSchema = new EntitySchema({
  name: "Order",
  tableName: "orders",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    orderNumber: {
      type: "int",
      generated: true,
    },
    status: {
      type: "varchar",
      length: 50,
      default: "pendiente",
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },
  },
  relations: {
    table: {
      type: "many-to-one",
      target: "Table",
      joinColumn: true,
    },
    orderDishes: {
      type: "one-to-many",
      target: "OrderDish",
      inverseSide: "orders",
      cascade: true,
    },
  },
  indices: [
    {
      name: "IDX_ORDER",
      columns: ["id"],
      unique: true,
    },
  ],
});

export default OrderSchema;
