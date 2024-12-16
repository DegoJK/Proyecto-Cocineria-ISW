"use strict";
import Joi from "joi";

export const tableBodyValidation = Joi.object({
  number: Joi.number().positive().required().messages({
    "number.base": "El número de mesa debe ser un número.",
    "number.positive": "El número de mesa debe ser un número positivo.",
    "any.required": "El número de mesa es obligatorio.",
  }),
  seats: Joi.number().positive().required().messages({
    "number.base": "La cantidad de asientos debe ser un número.",
    "number.positive": "La cantidad de asientos debe ser un número positivo.",
    "any.required": "La cantidad de asientos es obligatoria.",
  }),
  status: Joi.string().valid("disponible", "ocupada").messages({
    "string.empty": "El estado no puede estar vacío.",
    "string.base": "El estado debe ser de tipo string.",
    "any.only": "El estado debe ser 'disponible' o 'ocupada'.",
  }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });
