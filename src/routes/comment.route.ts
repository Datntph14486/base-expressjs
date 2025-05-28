import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";

import commentController from "../controllers/comment.controller";
import upload from "../multer";

const router = Router();

router.post("/", verifyToken, upload.array("files"), commentController.create);
router.put("/:id", verifyToken, commentController.update);
router.delete("/:id", verifyToken, commentController.destroy);
router.get("/:id/comment-histories", commentController.getCommentHistories);

export default router;
