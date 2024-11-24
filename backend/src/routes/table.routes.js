"use strict";
import Router from "express";

import {
  createTable,
  deleteTable,
  getTables,
  updateTable,
} from "../controllers/table.controller.js";

import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get("/getTables", getTables);

router.use(authenticateJwt).use(isAdmin);

router.post("/createTable", createTable);
router.put("/updateTable/:id", updateTable);
router.delete("/deleteTable/:id", deleteTable);

export default router;
