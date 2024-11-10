import { Router } from "express";
import { isBossChef } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createDish,
  deleteDish,
  getDish,
  getDishes,
  updateDish,
} from "../controllers/dishes.controller.js";

const router = Router();
router.use(authenticateJwt)

router
  .get("/find/:id", getDish)
  .get("/all", getDishes);

/*
router.use(authenticateJwt)
    .use(isChef);
*/
router
  .post("/create", isBossChef, createDish)
  .put("/edit/:id", isBossChef, updateDish)
  .delete("/delete/:id", isBossChef, deleteDish);

export default router;
