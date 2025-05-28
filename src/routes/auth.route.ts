import { Router } from "express";

import authController from "../controllers/auth.controller";
import verifyRefreshToken from "../middlewares/verifyRefreshToken";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/forgot-password", authController.forgotPassword);
router.post("/confirm-digits-token", authController.confirmDigitsToken);
router.post("/reset-password", authController.resetPassword);
router.get("/current-user", verifyToken, authController.getCurrentUser);
router.post("/refresh-token", verifyRefreshToken, authController.refreshToken);
router.post("/sign-out", verifyRefreshToken, authController.signOut);

export default router;
