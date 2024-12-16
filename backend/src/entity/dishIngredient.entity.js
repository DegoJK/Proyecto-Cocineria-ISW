"use strict";
import { EntitySchema } from "typeorm";

// Entidad intermedia para relacionar Platillo e Ingredient
const PlatilloIngredientSchema = new EntitySchema({
    name: "PlatilloIngredient",
    tableName: "platillo_ingredients",
    columns: {
        dish_id: {
            type: "int",
            primary: true, // Clave primaria compuesta (parte 1)
        },
        ingredient_id: {
            type: "int",
            primary: true, // Clave primaria compuesta (parte 2)
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
            joinColumn: {
                name: "dish_id", // Nombre de la columna en la tabla
                referencedColumnName: "id", // Columna referenciada en la entidad Platillo
            },
            nullable: false,
            onDelete: "CASCADE",
        },
        ingredient: {
            target: "Ingredient",
            type: "many-to-one",
            joinColumn: {
                name: "ingredient_id", // Nombre de la columna en la tabla
                referencedColumnName: "id", // Columna referenciada en la entidad Ingredient
            },
            nullable: false,
            onDelete: "CASCADE",
        },
    },
});

export default PlatilloIngredientSchema;
