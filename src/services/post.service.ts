import { Request } from "express";
import httpStatus from "http-status";
import { In } from "typeorm";

import { FileEntityTypes } from "../interfaces/file";
import { ICreatePostBody } from "../interfaces/post";
import fileRepository from "../repositories/file.repository";
import postRepository from "../repositories/post.repository";
import ApiError from "../utils/ApiError";
import fileService from "./file.service";
import User from "../entities/user.entity";
import commentRepositoty from "../repositories/comment.repository";
import { CommentEntityTypes } from "../interfaces/comment";

class PostService {
    create = async (data: ICreatePostBody) => {
        const post = await postRepository.create({
            content: data.content,
            type: data.type,
            visibility: data.visibility,
            commentCount: 0,
            userId: data.userId,
        });

        await postRepository.save(post);

        return post;
    };

    show = async (id: string) => {
        const post = await postRepository.findOne({ where: { id } });

        if (!post) {
            return null;
        }

        const files = await fileRepository.find({
            where: {
                entityType: FileEntityTypes.Post,
                entityId: parseInt(post.id),
            },
        });

        post.files = files;

        return post;
    };

    update = async (req: Request) => {
        const post = await postRepository.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });

        if (!post) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        const files = req.files as Array<Express.Multer.File>;

        if (files) {
            const tasksUpload = files.map((file) =>
                fileService.uploadWithEntity(file.path, post)
            );

            await Promise.all(tasksUpload);
        }

        const fileIds = req.body.deletedIds as Array<string>;

        if (fileIds) {
            delete req.body.deletedIds;

            const taskDeleteFiles = fileIds.map((fileId) =>
                fileService.destroy(fileId)
            );

            await Promise.all(taskDeleteFiles);
        }

        await postRepository.update({ id: post.id }, req.body);

        const newPost = await postRepository.findOne({
            where: { id: post.id },
        });

        return newPost;
    };

    destroy = async (id: string, user: User) => {
        const post = await postRepository.findOne({
            where: {
                id,
                userId: user.id,
            },
        });

        if (!post) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        const files = await fileService.findByEntityId(parseInt(post.id));

        if (files) {
            const taskDeleteFiles = files.map((file) =>
                fileService.destroy(file.id)
            );

            await Promise.all(taskDeleteFiles);
        }

        await postRepository.delete({ id: post.id });

        return true;
    };

    increaseLikeCount = async (id: string) => {
        const post = await postRepository.findOne({
            where: {
                id,
            },
        });

        if (!post) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await postRepository.update(
            { id: post.id },
            { likeCount: post.likeCount + 1 }
        );

        return true;
    };

    decreaseLikeCount = async (id: string) => {
        const post = await postRepository.findOne({
            where: {
                id,
            },
        });

        if (!post) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await postRepository.update(
            { id: post.id },
            { likeCount: post.likeCount > 0 ? post.likeCount - 1 : 0 }
        );

        return true;
    };

    getComments = async (postId: number) => {
        const comments = await commentRepositoty.find({
            where: {
                entityId: postId,
                entityType: CommentEntityTypes.Post,
            },
            relations: ["owner"],
        });

        const commentfiles = await fileRepository.find({
            where: {
                entityType: FileEntityTypes.Comment,
                entityId: In(comments.map((comment) => comment.id)),
            },
        });

        comments.forEach((comment) => {
            if (comment.hasImage === true) {
                const files = commentfiles.filter(
                    (file) => file.entityId === comment.id
                );

                comment.files = files;
            }
        });

        return comments;
    };
}

export default new PostService();
