"use strict";

import Table from "../entity/table.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createTableService(body) {
  try {
    const tableRepository = AppDataSource.getRepository(Table);
    const newTable = tableRepository.create(body);
    await tableRepository.save(newTable);
    return [newTable, null];
  } catch (error) {
    console.error("Error al crear la mesa:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getTablesService() {
  try {
    const tableRepository = AppDataSource.getRepository(Table);
    const tables = await tableRepository.find();
    if (!tables || tables.length === 0) return [null, "No hay mesas"];
    return [tables, null];
  } catch (error) {
    console.error("Error al obtener las mesas:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateTableService(id, body) {
  try {
    const tableRepository = AppDataSource.getRepository(Table);
    const table = await tableRepository.findOne({ where: { id: id } });
    if (!table) return [null, "Mesa no encontrada"];
    tableRepository.merge(table, body);
    await tableRepository.save(table);
    return [table, null];
  } catch (error) {
    console.error("Error al actualizar la mesa:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteTableService(id) {
  try {
    const tableRepository = AppDataSource.getRepository(Table);
    const table = await tableRepository.findOne({ where: { id: id } });
    if (!table) return [null, "Mesa no encontrada"];
    await tableRepository.remove(table);
    return [table, null];
  } catch (error) {
    console.error("Error al eliminar la mesa:", error);
    return [null, "Error interno del servidor"];
  }
}
