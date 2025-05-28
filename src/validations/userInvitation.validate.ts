import { number, object, string } from "yup";

import validateSchema from ".";

const FriendRequestSchema = object({
    userId: number().required(),
    targetUserId: number().required(),
}).required();

const AcceptRequestSchema = object({
    id: number().required(),
    userId: number().required(),
    targetUserId: number().required(),
}).required();

const RejectRequestSchema = object({
    id: number().required(),
    userId: number().required(),
    targetUserId: number().required(),
}).required();

const ValidateFriendRequestSchema = validateSchema(FriendRequestSchema);
const ValidateAcceptRequestSchema = validateSchema(AcceptRequestSchema);
const ValidateRejectRequestSchema = validateSchema(RejectRequestSchema);

export {
    ValidateFriendRequestSchema,
    ValidateAcceptRequestSchema,
    ValidateRejectRequestSchema,
};
