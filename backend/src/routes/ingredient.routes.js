import { Router } from "express";
import {
    createIngredient,
    deleteIngredient,
    getIngredient,
    getIngredients,
    updateIngredient
} from "../controllers/ingredient.controller.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router
    //Se cambio de lugar /all a primero para que no interfiera con /:id
    

    .get("/all", getIngredients)
    .get("/:id", getIngredient);

router.use(authenticateJwt).use(isAdmin);

router
    .post("/create", createIngredient)
    .put("/:id", updateIngredient)
    .delete("/:id", deleteIngredient);

export default router;