import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import userLikeEntityController from "../controllers/userLikeEntity.controller";

const router = Router();

router.post("/", verifyToken, userLikeEntityController.like);
router.delete("/", verifyToken, userLikeEntityController.unLike);

export default router;
