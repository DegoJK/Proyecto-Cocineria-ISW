"use strict";
import { EntitySchema } from "typeorm";

//esquema para la entidad platillo en la base de datos la cual contiene los campos id, nombre, precio, descripcion, imagen, createdAt y updatedAt
const PlatilloSchema = new EntitySchema({
  name: "Platillo",
  tableName: "platillos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
      unique: true,
    },
    nombre: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    precio: {
      type: "int",
      nullable: false,
    },
    descripcion: {
      type: "text",
      nullable: true,
    },
    imagen: {
      type: "varchar",
      length: 255,
      nullable: true,
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
      inverseSide: "platillos",
      cascade: true,
    },
  },
  indices: [
    {
      name: "IDX_PLATILLO",
      columns: ["id"],
      unique: true,
    },
  ],
});

export default PlatilloSchema;
