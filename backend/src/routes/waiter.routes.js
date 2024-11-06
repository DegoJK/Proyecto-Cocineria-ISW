"use strict";
import Router from "express";

import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/waiter.controller.js";

const router = Router();

router.post("/createOrder", createOrder);
router.get("/getOrders", getOrders);
router.get("/getOrderById/:id", getOrderById);
router.put("/updateOrderStatus/:id", updateOrderStatus);
router.delete("/deleteOrder/:id", deleteOrder);

export default router;
