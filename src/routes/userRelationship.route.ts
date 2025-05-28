import { Router } from "express";

import verifyToken from "../middlewares/verifyToken";
import userRelationshipController from "../controllers/userRelationship.controller";

const router = Router();

router.post("/unfriend", verifyToken, userRelationshipController.unFriend);

export default router;
