"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import dishesRoutes from "./dishes.routes.js";
import waiterRoutes from "./waiter.routes.js";
import ingredientRoutes from "./ingredient.routes.js";

const router = Router();

router
  .use("/auth", authRoutes)
  .use("/user", userRoutes)
  .use("/dish", dishesRoutes)
  .use("/waiter", waiterRoutes)
  .use("/ingredient", ingredientRoutes);

export default router;
