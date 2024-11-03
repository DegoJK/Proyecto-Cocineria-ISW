"use strict";
import Joi from "joi";

export const dishBodyValidation = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(50)
        .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 50 caracteres.",
        }),
    precio: Joi.number()
        .positive()
        .precision(2)
        .messages({
        "number.base": "El precio debe ser un número.",
        "number.positive": "El precio debe ser un número positivo.",
        "number.precision": "El precio debe tener como máximo 2 decimales.",
        }),
    descripcion: Joi.string()
        .min(10)
        .max(255)
        .messages({
        "string.empty": "La descripción no puede estar vacía.",
        "string.base": "La descripción debe ser de tipo string.",
        "string.min": "La descripción debe tener como mínimo 10 caracteres.",
        "string.max": "La descripción debe tener como máximo 255 caracteres.",
        }),
    imagen: Joi.string()
        .uri()
        .messages({
        "string.empty": "La imagen no puede estar vacía.",
        "string.base": "La imagen debe ser de tipo string.",
        "string.uri": "La imagen debe ser una URL válida.",
        }),
    estado: Joi.string()
        .valid("disponible", "no disponible", "en menu")
        .messages({
        "string.empty": "El estado no puede estar vacío.",
        "string.base": "El estado debe ser de tipo string.",
        "any.only": "El estado debe ser 'disponible' o 'no disponible'.",
        }),
    })
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
    });