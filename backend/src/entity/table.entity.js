"use strict";
import { EntitySchema } from "typeorm";

const TableSchema = new EntitySchema({
  name: "Table",
  tableName: "tables",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    number: {
      type: "int",
      nullable: false,
    },
    seats: {
      type: "int",
      nullable: false,
    },
    status: {
      type: "varchar",
      length: 50,
      default: "disponible",
    },
  },
  relations: {
    orders: {
      type: "one-to-many",
      target: "Order",
      inverseSide: "table",
      cascade: true,
    },
  },
});

export default TableSchema;
