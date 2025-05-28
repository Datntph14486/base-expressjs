import { boolean, number, object, string } from "yup";

import validateSchema from ".";
import { CommentEntityTypes } from "../interfaces/comment";

const createCommentSchema = object({
    entityType: string()
        .required()
        .oneOf([CommentEntityTypes.Comment, CommentEntityTypes.Post]),
    entityId: number().required(),
    userId: number().required(),
    content: string().required(),
    hasImage: boolean().required(),
});

const updateCommentSchema = object({
    entityType: string().oneOf([
        CommentEntityTypes.Comment,
        CommentEntityTypes.Post,
    ]),
    entityId: number(),
    userId: number(),
    content: string(),
    hasImage: boolean(),
});

const validateCreateCommentSchema = validateSchema(createCommentSchema);
const validateUpdateCommentSchema = validateSchema(updateCommentSchema);

export { validateCreateCommentSchema, validateUpdateCommentSchema };
