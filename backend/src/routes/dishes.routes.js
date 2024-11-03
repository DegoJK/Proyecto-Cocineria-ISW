import { Router } from "express";
//import { isChef } from "../middlewares/authorization.middleware.js";
//import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { 
    createDish, 
    deleteDish, 
    getDish, 
    getDishes, 
    updateDish,
} from "../controllers/dishes.controller.js";

const router = Router();

router
    .get("/find/:id", getDish)
    .get("/all", getDishes);
/*
router
    .use(authenticateJwt)
    .use(isChef);
*/
router
    .post("/create", createDish)
    .put("/:id", updateDish)
    .delete("/:id", deleteDish);

export default router;
