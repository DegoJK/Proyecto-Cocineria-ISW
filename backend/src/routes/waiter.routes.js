"use strict";
import Router from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isWaiter } from "../middlewares/authorization.middleware.js";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/waiter.controller.js";

const router = Router();

router.get("/getOrders", getOrders);
router.get("/getOrderById/:id", getOrderById);

router.use(authenticateJwt).use(isWaiter);

router.post("/createOrder", createOrder);
router.put("/updateOrderStatus/:id", updateOrderStatus);
router.delete("/deleteOrder/:id", deleteOrder);

export default router;
