import { Request, Response } from "express";
import httpStatus from "http-status";

import postService from "../services/post.service";
import {
    validateCreatePostSchema,
    validateUpdatePostSchema,
} from "../validations/post.validation";
import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError";
import fileService from "../services/file.service";

class PostController {
    create = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;
        const body = req.body;

        body.userId = user.id;

        await validateCreatePostSchema(body);

        const post = await postService.create(body);

        if (post) {
            const files = req.files;

            const tasksUpload = files.map((file) =>
                fileService.uploadWithEntity(file.path, post)
            );

            await Promise.all(tasksUpload);
        }

        return res.json({ data: post });
    });

    show = catchAsync(async (req: Request, res: Response) => {
        const post = await postService.show(req.params.id);

        if (!post) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                httpStatus["404_NAME"].toLowerCase()
            );
        }

        return res.json({
            data: post,
        });
    });

    update = catchAsync(async (req: Request, res: Response) => {
        await validateUpdatePostSchema(req.body);

        const post = await postService.update(req);

        return res.json({
            data: post,
        });
    });

    destroy = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;

        const post = await postService.destroy(req.params.id, user);

        return res.json({ data: post });
    });

    getCommets = catchAsync(async (req: Request, res: Response) => {
        const comments = await postService.getComments(parseInt(req.params.id));

        return res.json({ data: comments });
    });
}

export default new PostController();
