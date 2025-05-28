import dayjs from "dayjs";
import jwt from "jsonwebtoken";

import config from "../config";
import { TokenTypes } from "../interfaces/token";
import tokenRepository from "../repositories/token.repository";

class TokenService {
    generateAccessToken = (userId: number, ttl = config.jwt.ttl) => {
        return jwt.sign(
            { pub: userId, type: TokenTypes.Access },
            config.jwt.secret,
            { expiresIn: ttl }
        );
    };
    generateRefreshToken = async (
        userId: number,
        ttl = config.jwt.refreshTtl
    ) => {
        const token = jwt.sign(
            { pub: userId, type: TokenTypes.Refresh },
            config.jwt.secret,
            { expiresIn: ttl }
        );

        return token;
    };

    checkIsBlackListedToken = async (token: string) => {
        const dbToken = await tokenRepository.findOne({
            where: { token },
        });

        return !!dbToken;
    };

    invalidateToken = async ({
        token,
        userId,
        exp,
        type,
    }: {
        token: string;
        userId: number;
        exp: number;
        type: TokenTypes;
    }) => {
        const dbToken = await tokenRepository.create({
            token,
            type,
            userId,
            expiredAt: dayjs.unix(exp).toDate(),
        });
        await tokenRepository.save(dbToken);
    };
}

export default new TokenService();
