import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/:id/posts", verifyToken, userController.getPosts);
router.post("/check-email-exist", userController.checkEmailtExist);

export default router;
