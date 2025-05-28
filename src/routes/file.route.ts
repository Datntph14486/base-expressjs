import { Router } from "express";

import fileController from "../controllers/file.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.delete("/:id", verifyToken, fileController.destroy);

export default router;
