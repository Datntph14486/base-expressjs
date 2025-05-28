import { number, object, string } from "yup";

import { UserLikeEntityTypes } from "../interfaces/userLikeEntity";
import validateSchema from ".";

const likeSchema = object({
    userId: number().required(),
    entityType: string()
        .required()
        .oneOf([UserLikeEntityTypes.Comment, UserLikeEntityTypes.Post]),
    entityId: number().required(),
}).required();

const disLikeSchema = object({
    userId: number().required(),
    entityType: string()
        .required()
        .oneOf([UserLikeEntityTypes.Comment, UserLikeEntityTypes.Post]),
    entityId: number().required(),
}).required();

const validateLikeSchema = validateSchema(likeSchema);
const validateDislikeSchema = validateSchema(disLikeSchema);

export { validateLikeSchema, validateDislikeSchema };
