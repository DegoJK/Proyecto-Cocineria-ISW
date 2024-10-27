"use strict";
import { EntitySchema } from "typeorm";

// Esquema para los ingredientes en la base de datos

const IngredientSchema = new EntitySchema({
    name: "Ingredient",
    tableName: "ingredients",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombre: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        tipo: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        cantidad: {
            type: "int",
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
    indices: [
        {
            name: "IDX_INGREDIENT",
            columns: ["id"],
            unique: true,
        },
    ],
})

export default IngredientSchema;