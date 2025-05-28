import { Request, Response } from "express";
import httpStatus from "http-status";

import authService from "../services/auth.service";
import tokenService from "../services/token.service";
import userService from "../services/user.service";
import ApiError from "../utils/ApiError";
import buildEmailTemplate from "../utils/buildEmailTemplate";
import cache from "../utils/cache";
import catchAsync from "../utils/catchAsync";
import { forgotPassword } from "../utils/emailTemplate/forgot-password";
import encryptPassword from "../utils/encryptPassword";
import generateRandomInt from "../utils/generateRandomInt";
import generateRandomStr from "../utils/generateRandomStr";
import sendEmail from "../utils/mailer";
import {
    validateDigitTokenSchema,
    validateForgotPassword,
    validateResetPassword,
    validateSignInSchema,
    validateSignUpSchema,
} from "../validations/auth.validation";

class AuthController {
    signUp = catchAsync(async (req: Request, res: Response) => {
        const body = req.body;

        await validateSignUpSchema(body);

        const user = await userService.createUser(body);

        const accessToken = tokenService.generateAccessToken(user.id);
        const refreshToken = await tokenService.generateRefreshToken(user.id);

        return res.json({
            data: {
                accessToken,
                refreshToken,
            },
        });
    });

    signIn = catchAsync(async (req: Request, res: Response) => {
        const body = req.body;

        await validateSignInSchema(body);

        const user = await authService.verifyUser({
            email: body.email,
            password: body.password,
        });

        const accessToken = tokenService.generateAccessToken(user.id);
        const refreshToken = await tokenService.generateRefreshToken(user.id);

        return res.json({
            data: {
                accessToken,
                refreshToken,
            },
        });
    });

    getCurrentUser = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;

        const { password, ...data } = user;

        return res.json({
            data,
        });
    });

    signOut = catchAsync(async (req: Request, res: Response) => {
        return res.json({
            data: true,
        });
    });

    refreshToken = catchAsync(async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                httpStatus["404_NAME"].toLowerCase()
            );
        }

        const accessToken = tokenService.generateAccessToken(user.id);
        const refreshToken = await tokenService.generateRefreshToken(user.id);

        return res.json({
            data: {
                accessToken,
                refreshToken,
            },
        });
    });

    forgotPassword = catchAsync(async (req: Request, res: Response) => {
        const body = req.body;

        await validateForgotPassword(body);

        const user = await userService.findByEmail(body.email);

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "USER NOT FOUND");
        }

        const fiveDigitToken = await generateRandomInt(5);

        cache.set(`${body.email}DigitToken`, fiveDigitToken, 120);

        const templateString = buildEmailTemplate(forgotPassword, {
            number: fiveDigitToken,
        });

        await sendEmail(
            body.email,
            "[FRIEND-LINKER] Forgot password",
            templateString
        );

        return res.json({
            data: true,
        });
    });

    confirmDigitsToken = catchAsync(async (req: Request, res: Response) => {
        const body = req.body;

        await validateDigitTokenSchema(body);

        const digitToken = cache.get(`${body.email}DigitToken`);

        if (digitToken !== body.digits) {
            throw new ApiError(httpStatus.BAD_GATEWAY, "INVALID CODE");
        }

        const resetPasswordToken = await generateRandomStr(64);

        cache.set(`${body.email}ResetPasswordToken`, resetPasswordToken, 120);

        return res.json({ resetPasswordToken });
    });

    resetPassword = catchAsync(async (req: Request, res: Response) => {
        const body = req.body;

        await validateResetPassword(body);

        const resetPassToken = cache.get(`${body.email}ResetPasswordToken`);

        if (resetPassToken !== body.token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"]);
        }

        const hashedPassword = encryptPassword(body.password);

        await userService.updateByEmail({
            email: body.email,
            data: { password: hashedPassword },
        });

        cache.del(`${body.email}ResetPasswordToken`);

        return res.json({ data: true });
    });
}

export default new AuthController();
