import httpStatus from "http-status";
import { In } from "typeorm";

import {
    CommentEntityTypes,
    IUpdateComment,
    iCreateComment,
} from "../interfaces/comment";
import commentRepositoty from "../repositories/comment.repository";
import ApiError from "../utils/ApiError";
import commentHistoryRepository from "../repositories/commentHistory.repository";
import User from "../entities/user.entity";
import fileRepository from "../repositories/file.repository";
import { FileEntityTypes } from "../interfaces/file";
import PostRepository from "../repositories/post.repository";

class CommentService {
    create = async (data: iCreateComment) => {
        const comment = await commentRepositoty.create({
            entityType: data.entityType,
            userId: data.userId,
            entityId: data.entityId,
            content: data.content,
            commentCount: 0,
            hasImage: data.hasImage,
        });

        await commentRepositoty.save(comment);

        if (comment.entityType === CommentEntityTypes.Comment) {
            await commentRepositoty.increment(
                { id: comment.entityId },
                "commentCount",
                1
            );
        } else if (comment.entityType === CommentEntityTypes.Post) {
            await PostRepository.increment(
                { id: comment.entityId.toString() },
                "commentCount",
                1
            );
        }

        return comment;
    };

    update = async (commentId: number, data: IUpdateComment) => {
        const comment = await commentRepositoty.findOne({
            where: {
                id: commentId,
                userId: data.userId,
            },
        });

        if (!comment) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await commentRepositoty.update({ id: comment.id }, data);

        const commentHistory = await commentHistoryRepository.create({
            commentId: comment.id,
            entityType: comment.entityType,
            entityId: comment.entityId,
            userId: comment.userId,
            likeCount: comment.likeCount,
            content: comment.content,
            hasImage: comment.hasImage,
        });

        await commentHistoryRepository.save(commentHistory);

        const newComment = await commentRepositoty.findOne({
            where: {
                id: comment.id,
            },
        });

        return newComment;
    };

    destroy = async (commentId: number, user: User) => {
        const comment = await commentRepositoty.findOne({
            where: {
                id: commentId,
                userId: user.id,
            },
        });

        if (!comment) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await commentRepositoty.delete({ id: comment.id });

        if (comment.entityType === CommentEntityTypes.Comment) {
            await commentRepositoty.decrement(
                { id: comment.entityId },
                "commentCount",
                1
            );
        } else if (comment.entityType === CommentEntityTypes.Post) {
            await PostRepository.decrement(
                { id: comment.entityId.toString() },
                "commentCount",
                1
            );
        }

        const commentHistories = await commentHistoryRepository.find({
            where: {
                commentId: commentId,
            },
        });

        if (commentHistories) {
            const taskDeleteComments = commentHistories.map((comment) =>
                commentHistoryRepository.delete(comment.id)
            );

            Promise.all(taskDeleteComments);
        }

        return comment;
    };

    increaseLikeCount = async (id: string) => {
        const comment = await commentRepositoty.findOne({
            //@ts-ignore
            where: {
                id,
            },
        });

        if (!comment) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await commentRepositoty.update(
            { id: comment.id },
            { likeCount: comment.likeCount + 1 }
        );

        return true;
    };

    decreaseLikeCount = async (id: string) => {
        const comment = await commentRepositoty.findOne({
            //@ts-ignore
            where: {
                id,
            },
        });

        if (!comment) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await commentRepositoty.update(
            { id: comment.id },
            { likeCount: comment.likeCount > 0 ? comment.likeCount - 1 : 0 }
        );

        return true;
    };

    getCommentHistories = async (commentId: number) => {
        const commentHistories = await commentHistoryRepository.find({
            where: {
                commentId: commentId,
            },
        });

        const files = await fileRepository.find({
            where: {
                entityType: FileEntityTypes.Comment,
                entityId: In(commentHistories.map((comment) => comment.id)),
            },
        });

        commentHistories.forEach((comment) => {
            if (comment.hasImage === true) {
                const commentFiles = files.filter(
                    (file) => file.entityId === comment.id
                );

                comment.files = commentFiles;
            }
        });

        return commentHistories;
    };
}

export default new CommentService();
