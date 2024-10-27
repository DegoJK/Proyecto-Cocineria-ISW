"use strict";
import Router from "express";

import {
  addDishToOrder,
  createOrder,
  getOrders,
} from "../controllers/waiter.controller.js";

const router = Router();

router.post("/createOrder", createOrder);
router.post("/addDishToOrder", addDishToOrder);
router.get("/getOrders", getOrders);

export default router;
