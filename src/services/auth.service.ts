import bcrypt from "bcrypt";
import httpStatus from "http-status";

import userRepository from "../repositories/user.repository";
import ApiError from "../utils/ApiError";

class AuthService {
    verifyUser = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        const user = await userRepository.findOne({
            where: { email },
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"]);
        }

        return user;
    };
}

export default new AuthService();
