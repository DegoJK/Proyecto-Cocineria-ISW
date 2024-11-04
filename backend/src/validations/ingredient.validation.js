"use strict"
import Joi from "joi";

export const IngredientBodyValidation = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(50)
        .messages({
            "string.empty": "El nombre no puede estar vacío.",
            "string.base": "El nombre debe ser de tipo string.",
            "string.min": "El nombre debe tener como mínimo 3 caracteres.",
            "string.max": "El nombre debe tener como máximo 50 caracteres.",
        }),
    tipo: Joi.string()
        .valid("fresco", "seco", "enlatado")
        .messages({
            "any.only": "El tipo debe ser 'fresco', 'seco' o 'enlatado'.",
            "any.required": "El tipo es obligatorio.",
        }),
    cantidad: Joi.number()
        .positive()
        .precision(2)
        .messages({
            "number.base": "La cantidad debe ser un número.",
            "number.positive": "La cantidad debe ser un número positivo.",
            "number.precision": "La cantidad debe tener como máximo 2 decimales.",
        }),
    precio: Joi.number()
        .positive()
        .precision(2)
        .messages({
            "number.base": "El precio debe ser un número.",
            "number.positive": "El precio debe ser un número positivo.",
            "number.precision": "El precio debe tener como máximo 2 decimales.",
        }),
})
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});