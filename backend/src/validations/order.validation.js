"use strict";
import Joi from "joi";

export const orderArrayBodyValidation = Joi.array()
  .items(
    Joi.object({
      dishId: Joi.number().positive().required().messages({
        "number.base": "El id del platillo debe ser un número.",
        "number.positive": "El id del platillo debe ser un número positivo.",
        "any.required": "El id del platillo es obligatorio.",
      }),
      quantity: Joi.number().positive().required().messages({
        "number.base": "La cantidad debe ser un número.",
        "number.positive": "La cantidad debe ser un número positivo.",
        "any.required": "La cantidad es obligatoria.",
      }),
    }).unknown(false)
  )
  .min(1)
  .messages({
    "array.base": "El cuerpo de la solicitud debe ser un array.",
    "array.min": "Debe haber al menos un platillo en la orden.",
  });

export const orderBodyValidation = Joi.object({
  status: Joi.string()
    .valid("pendiente", "en preparación", "lista", "entregada", "pagada")
    .messages({
      "string.empty": "El estado no puede estar vacío.",
      "string.base": "El estado debe ser de tipo string.",
      "any.only":
        "El estado debe ser 'pendiente', 'en preparación', 'lista' o 'entregada'.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });
