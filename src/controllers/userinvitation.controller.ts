import { Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import userInvitationService from "../services/userInvitation.service";
import {
    ValidateAcceptRequestSchema,
    ValidateFriendRequestSchema,
    ValidateRejectRequestSchema,
} from "../validations/userInvitation.validate";

class UserInvitationController {
    friendRequest = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;
        console.log("🚀 ~ user:", user);
        const body = req.body;
        body.userId = user.id;

        const { userId, targetUserId } = await ValidateFriendRequestSchema(
            body
        );

        const userInvitaion = await userInvitationService.friendRequest(
            userId,
            targetUserId
        );

        return res.json({ data: userInvitaion });
    });

    acceptRequest = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;
        const body = req.body;
        body.targetUserId = user.id;

        const { id, userId, targetUserId } = await ValidateAcceptRequestSchema(
            body
        );

        await userInvitationService.acceptRequest(id, userId, targetUserId);

        return res.json({ data: true });
    });

    rejectRequest = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;
        const body = req.body;
        body.targetUserId = user.id;

        const { id, userId, targetUserId } = await ValidateRejectRequestSchema(
            body
        );

        await userInvitationService.rejectRequest(id, userId, targetUserId);

        return res.json({ data: true });
    });
}

export default new UserInvitationController();
