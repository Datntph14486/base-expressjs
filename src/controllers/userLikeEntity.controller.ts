import { Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import {
    validateDislikeSchema,
    validateLikeSchema,
} from "../validations/userlikeEntity.validation";
import userLikeEntityService from "../services/userLikeEntity.service";

class UserLikeEntityController {
    like = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;
        const body = req.body;
        body.userId = user.id;

        await validateLikeSchema(body);

        const userLikeEntity = await userLikeEntityService.like(body);

        return res.json({ data: userLikeEntity });
    });

    unLike = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;
        const body = req.body;
        body.userId = user.id;

        await validateDislikeSchema(body);

        const userLikeEntity = await userLikeEntityService.unLike(body);

        return res.json({
            data: userLikeEntity,
        });
    });
}

export default new UserLikeEntityController();
