import { Router } from "express";

import verifyToken from "../middlewares/verifyToken";
import userinvitationController from "../controllers/userinvitation.controller";

const router = Router();

router.post(
    "/friend-request",
    verifyToken,
    userinvitationController.friendRequest
);
router.post(
    "/accept-friend",
    verifyToken,
    userinvitationController.acceptRequest
);
router.post(
    "/reject-friend",
    verifyToken,
    userinvitationController.rejectRequest
);

export default router;
