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
    tableNumber: {
      type: "int",
      nullable: false,
    },
    status: {
      type: "varchar",
      length: 50,
      default: "Pendiente",
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
    orderDishes: {
      type: "one-to-many",
      target: "OrderDish",
      inverseSide: "order",
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
