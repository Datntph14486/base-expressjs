import { number, object, string } from "yup";

import validateSchema from ".";

const UnFriendSchema = object({
    userId: number().required(),
    targetUserId: number().required(),
}).required();

const ValidateUnFriendSchema = validateSchema(UnFriendSchema);

export { ValidateUnFriendSchema };
