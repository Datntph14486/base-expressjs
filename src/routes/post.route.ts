import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import postController from "../controllers/post.controller";
import upload from "../multer";

const router = Router();

router.post("/", verifyToken, upload.array("files"), postController.create);
router.get("/:id", verifyToken, postController.show);
router.put("/:id", verifyToken, upload.array("files"), postController.update);
router.delete("/:id", verifyToken, postController.destroy);
router.get("/:id/comments", postController.getCommets);

export default router;
