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
      unique: true,
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
      // eslint-disable-next-line max-len
      default: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa-945x630.jpg",
      nullable: true,
    },
    estado: {
      type: "varchar",
      length: 50,
      nullable: false,
      default: "disponible",
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
    platilloIngredients: {
      target: "PlatilloIngredient",
      type: "one-to-many",
      inverseSide: "platillo",
      cascade: true,
    },
    orderDishes: {
      type: "one-to-many",
      target: "OrderDish",
      inverseSide: "dishes", // Debe coincidir con la relación en OrderDish
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
