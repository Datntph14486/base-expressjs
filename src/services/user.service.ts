import httpStatus from "http-status";

import { ICreateUserBody } from "../interfaces/user";
import userRepository from "../repositories/user.repository";
import ApiError from "../utils/ApiError";
import PostRepository from "../repositories/post.repository";
import fileRepository from "../repositories/file.repository";
import { FileEntityTypes } from "../interfaces/file";
import { In } from "typeorm";

class UserService {
    createUser = async (data: ICreateUserBody) => {
        const user = await userRepository.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            dateOfBirth: new Date(data.dateOfBirth),
            gender: data.gender,
        });

        await userRepository.save(user);

        return user;
    };

    getUserById = async (id: number) => {
        const user = await userRepository.findOne({
            where: { id },
        });

        return user;
    };

    findByEmail = async (email: string) => {
        const user = await userRepository.findOne({
            where: { email },
        });

        return user;
    };

    getPosts = async (userId: number) => {
        const posts = await PostRepository.find({ where: { userId } });

        const files = await fileRepository.find({
            where: {
                entityType: FileEntityTypes.Post,
                entityId: In(posts.map((post) => post.id)),
            },
        });

        posts.forEach((post) => {
            const postFiles = files.filter(
                (file) => file.entityId === parseInt(post.id)
            );

            post.files = postFiles;
        });

        return posts;
    };

    updateByEmail = async ({
        email,
        data,
    }: {
        email: string;
        data: Object;
    }) => {
        const user = await userRepository.update({ email }, data);

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        return user;
    };

    checkEmailtExist = async (email: string) => {
        const user = await userRepository.findOne({
            where: { email },
        });

        return user ? true : false;
    };
}

export default new UserService();
