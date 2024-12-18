"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import dishesRoutes from "./dishes.routes.js";
import waiterRoutes from "./waiter.routes.js";
import ingredientRoutes from "./ingredient.routes.js";
import reportRoutes from "./report.routes.js";
import tableRoutes from "./table.routes.js";

const router = Router();

router
  .use("/dish", dishesRoutes)
  .use("/auth", authRoutes)
  .use("/user", userRoutes)
  .use("/waiter", waiterRoutes)
  .use("/ingredient", ingredientRoutes)
  .use("/report", reportRoutes)
  .use("/table", tableRoutes);

export default router;
