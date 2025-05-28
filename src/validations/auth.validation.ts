import { date, object, string } from "yup";

import validateSchema from ".";

const signUpSchema = object({
    firstName: string().required().max(255),
    lastName: string().required().max(255),
    gender: string().required().oneOf(["male", "female"]),
    dateOfBirth: date().required(),
    email: string().email().required().max(255),
    password: string().required().min(6).max(255),
}).required();

const signInSchema = object({
    email: string().email().required(),
    password: string().required(),
}).required();

const forgotPasswordSchema = object()
    .shape({
        email: string().email().required().max(255),
    })
    .required();

const confirmDigitTokenSchema = object()
    .shape({
        digits: string().required().max(255),
        email: string().email().required().max(255),
    })
    .required();

const resetPasswordSchema = object()
    .shape({
        password: string().required().max(255),
        token: string().required().max(255),
        email: string().email().required().max(255),
    })
    .required();

const checkEmailExistSchema = object({
    email: string().email().required(),
}).required();

const validateForgotPassword = validateSchema(forgotPasswordSchema);
const validateSignUpSchema = validateSchema(signUpSchema);
const validateSignInSchema = validateSchema(signInSchema);
const validateDigitTokenSchema = validateSchema(confirmDigitTokenSchema);
const validateResetPassword = validateSchema(resetPasswordSchema);
const validateCheckEmailxistSchema = validateSchema(checkEmailExistSchema);

export {
    validateSignInSchema,
    validateSignUpSchema,
    validateForgotPassword,
    validateDigitTokenSchema,
    validateResetPassword,
    validateCheckEmailxistSchema,
};
