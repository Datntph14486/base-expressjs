import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

import config from "../config";
import { TokenTypes } from "../interfaces/token";
import tokenService from "../services/token.service";
import userService from "../services/user.service";
import ApiError from "../utils/ApiError";

async function verifyRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const bearerToken = req.headers["authorization"];
        if (!bearerToken) {
            throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"]);
        }

        const token = bearerToken.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"]);
        }

        const decoded = jwt.verify(token, config.jwt.secret) as {
            pub: number;
            type: TokenTypes;
            iat: number;
            exp: number;
        };

        const isBlackListed = await tokenService.checkIsBlackListedToken(token);
        const user = await userService.getUserById(decoded.pub);
        if (decoded.type !== TokenTypes.Refresh || isBlackListed || !user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"]);
        }

        req.user = user;

        await tokenService.invalidateToken({
            token,
            userId: user.id,
            exp: decoded.exp,
            type: TokenTypes.Refresh,
        });

        next();
    } catch (err: any) {
        next(new ApiError(httpStatus.UNAUTHORIZED, err.message));
    }
}

export default verifyRefreshToken;
