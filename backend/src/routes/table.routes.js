"use strict";
import Router from "express";

import {
  createTable,
  deleteTable,
  getTables,
  updateTable,
} from "../controllers/table.controller.js";

const router = Router();

router.post("/createTable", createTable);
router.get("/getTables", getTables);
router.put("/updateTable/:id", updateTable);
router.delete("/deleteTable/:id", deleteTable);

export default router;
