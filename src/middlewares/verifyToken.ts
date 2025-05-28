import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

import config from "../config";
import { TokenTypes } from "../interfaces/token";
import userService from "../services/user.service";
import ApiError from "../utils/ApiError";

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers["authorization"];
        if (!bearerToken) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                httpStatus["401_MESSAGE"]
            );
        }

        const token = bearerToken.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                httpStatus["401_MESSAGE"]
            );
        }

        const decoded = jwt.verify(token, config.jwt.secret) as {
            pub: number;
            type: TokenTypes;
            iat: number;
            exp: number;
        };

        const user = await userService.getUserById(decoded.pub);
        if (decoded.type !== TokenTypes.Access || !user) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                httpStatus["401_MESSAGE"]
            );
        }

        req.user = user;

        next();
    } catch (err: any) {
        next(new ApiError(httpStatus.UNAUTHORIZED, err.message));
    }
}

export default verifyToken;
