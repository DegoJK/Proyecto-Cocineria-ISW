"use strict";
import Router from "express";

import {
  createOrder,
  getOrderById,
  getOrders,
} from "../controllers/waiter.controller.js";

import { addDishToOrder, getCart } from "../controllers/cart.controller.js";

const router = Router();

router.post("/createOrder", createOrder);
router.post("/addDishToOrder", addDishToOrder);
router.get("/getOrders", getOrders);
router.get("/getOrderById/:id", getOrderById);
router.get("/getCarrito", getCart);

export default router;
