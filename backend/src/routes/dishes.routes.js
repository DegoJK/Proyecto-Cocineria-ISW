import { Router } from "express";
import { createDish, deleteDish, getDish, getDishes, updateDish } from "../controllers/dishes.controller.js";

const router = Router();

router
    .get("/:id", getDish)
    .get("/all", getDishes)
    .post("/create", createDish)
    .put("/:id", updateDish)
    .delete("/:id", deleteDish)

export default router;
