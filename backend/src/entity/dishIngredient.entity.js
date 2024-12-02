"use strict";
import { EntitySchema } from "typeorm";

// Entidad intermedia para relacionar Platillo e Ingredient
const PlatilloIngredientSchema = new EntitySchema({
    name: "PlatilloIngredient",
    tableName: "platillo_ingredients",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
            unique: true,
        },
        cantidad: {
            type: "int",
            nullable: false, // Cantidad requerida del ingrediente
        },
    },
    relations: {
        platillo: {
            target: "Platillo",
            type: "many-to-one",
            joinColumn: true, // Crea la columna de unión en esta tabla
            nullable: false,
        },
        ingredient: {
            target: "Ingredient",
            type: "many-to-one",
            joinColumn: true, // Crea la columna de unión en esta tabla
            nullable: false,
        },
    },
});

export default PlatilloIngredientSchema;
