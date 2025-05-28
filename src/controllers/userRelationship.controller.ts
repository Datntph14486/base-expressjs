import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import userRelationshipService from "../services/userRelationship.service";
import { ValidateUnFriendSchema } from "../validations/userRelationship.validate";

class UserRelationshipController {
    unFriend = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;
        const body = req.body;
        body.userId = user.id;

        const { userId, targetUserId } = await ValidateUnFriendSchema(body);

        await userRelationshipService.unFriend(userId, targetUserId);

        return res.json({ data: true });
    });
}

export default new UserRelationshipController();
