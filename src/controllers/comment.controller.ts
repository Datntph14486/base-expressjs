import { Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import {
    validateCreateCommentSchema,
    validateUpdateCommentSchema,
} from "../validations/comment.validate";
import commnetService from "../services/commnet.service";
import fileService from "../services/file.service";

class CommentController {
    create = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;
        const body = req.body;

        body.userId = user.id;

        await validateCreateCommentSchema(body);

        const comment = await commnetService.create(body);

        if (comment) {
            const files = req.files;

            const tasksUpload = files.map((file) =>
                fileService.uploadWithEntity(file.path, comment)
            );

            await Promise.all(tasksUpload);
        }

        return res.json({ data: comment });
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;
        await validateUpdateCommentSchema(req.body);

        req.body.userId = user.id;

        const comment = await commnetService.update(
            parseInt(req.params.id),
            req.body
        );

        return res.json({ data: comment });
    });

    destroy = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;

        const comment = await commnetService.destroy(
            parseInt(req.params.id),
            user
        );

        return res.json({ data: comment });
    });

    getCommentHistories = catchAsync(async (req: Request, res: Response) => {
        const commentHistories = await commnetService.getCommentHistories(
            parseInt(req.params.id)
        );

        return res.json({ data: commentHistories });
    });
}

export default new CommentController();
