"use strict";

import {
  createTableService,
  deleteTableService,
  getTablesService,
  updateTableService,
} from "../services/table.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createTable(req, res) {
  try {
    const body = req.body;
    console.log(body);
    const [newTable, errorTable] = await createTableService(body);

    if (errorTable) return handleErrorClient(res, 400, errorTable);

    handleSuccess(res, 201, "Mesa creada", newTable);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getTables(req, res) {
  try {
    const [tables, errorTables] = await getTablesService();

    if (errorTables) return handleErrorClient(res, 404, errorTables);

    tables.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Mesas encontradas", tables);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateTable(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;

    const [updatedTable, errorTable] = await updateTableService(id, body);

    if (errorTable) return handleErrorClient(res, 400, errorTable);

    handleSuccess(res, 200, "Mesa actualizada", updatedTable);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteTable(req, res) {
  try {
    const { id } = req.params;

    const [deletedTable, errorTable] = await deleteTableService(id);

    if (errorTable) return handleErrorClient(res, 404, errorTable);

    handleSuccess(res, 200, "Mesa eliminada", deletedTable);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
