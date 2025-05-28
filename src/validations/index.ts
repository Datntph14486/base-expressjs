import httpStatus from "http-status";
import { AnyObject, ObjectSchema } from "yup";

import ApiError from "../utils/ApiError";

const validateSchema = (schema: ObjectSchema<AnyObject>) => {
    return async (values: AnyObject) => {
        try {
            const result = await schema.validate(values, { abortEarly: false });

            return result;
        } catch (err: any) {
            const errors = err.inner.map((errorItem: any) => ({
                path: errorItem.path,
                errors: errorItem.errors,
            }));

            throw new ApiError(
                httpStatus.UNPROCESSABLE_ENTITY,
                httpStatus["422_NAME"].toLowerCase(),
                errors
            );
        }
    };
};

export default validateSchema;
