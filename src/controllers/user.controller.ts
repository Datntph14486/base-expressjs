import { Request, Response } from "express";

import AppDataSource from "../db/dataSource";
import User from "../entities/user.entity";
import catchAsync from "../utils/catchAsync";
import userService from "../services/user.service";
import { validateCheckEmailxistSchema } from "../validations/auth.validation";

class UserController {
    async show(req: Request, res: Response) {
        const { id } = req.params as unknown as { id: number };

        const user = await AppDataSource.manager.findOne(User, {
            where: {
                id,
            },
        });

        return res.json({
            data: user,
        });
    }

    async store(req: Request, res: Response) {
        const user = new User();
        user.firstName = "Long";
        user.lastName = "Bui";

        await AppDataSource.manager.save(user);

        return res.json({
            data: user,
        });
    }
    getPosts = catchAsync(async (req: Request, res: Response) => {
        const userId = req.params.id;

        const posts = await userService.getPosts(parseInt(userId));

        return res.json({ data: posts });
    });
    checkEmailtExist = catchAsync(async (req: Request, res: Response) => {
        const { email } = await validateCheckEmailxistSchema(req.body);

        const result = await userService.checkEmailtExist(email);

        return res.json({ data: result });
    });
}

export default new UserController();
