import { object, string, number } from "yup";

import validateSchema from ".";
import { PostType, PostVisibility } from "../interfaces/post";

const createPostSchema = object({
    content: string().required().max(255),
    type: string().required().oneOf([PostType.Normal, PostType.Share]),
    visibility: string()
        .required()
        .oneOf([
            PostVisibility.Public,
            PostVisibility.Friend,
            PostVisibility.Private,
        ]),
    userId: number().required(),
}).required();

const getByUserIdSchema = object({
    id: number().required(),
}).required();

const getByIdSchema = object({
    id: number().required(),
}).required();

const updatePostSchema = object({
    content: string().max(255),
    type: string().oneOf([PostType.Normal, PostType.Share]),
    visibility: string().oneOf([
        PostVisibility.Public,
        PostVisibility.Friend,
        PostVisibility.Private,
    ]),
}).required();

const validateCreatePostSchema = validateSchema(createPostSchema);
const validateGetByUserId = validateSchema(getByUserIdSchema);
const validateGetById = validateSchema(getByIdSchema);
const validateUpdatePostSchema = validateSchema(updatePostSchema);

export {
    validateCreatePostSchema,
    validateGetByUserId,
    validateGetById,
    validateUpdatePostSchema,
};
