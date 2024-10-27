"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import dishesRoutes from "./dishes.routes.js";
const router = Router();

router
    .use("/dish", dishesRoutes)
    .use("/auth", authRoutes)
    .use("/user", userRoutes);

export default router;