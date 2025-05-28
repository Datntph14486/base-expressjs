import httpStatus from "http-status";

import {
    ICreateUserLikeEntityBody,
    IDislike,
    UserLikeEntityTypes,
} from "../interfaces/userLikeEntity";
import userLikeEntityRepository from "../repositories/userLikeEntity.repositoty";
import ApiError from "../utils/ApiError";
import postService from "./post.service";
import commnetService from "./commnet.service";

class UserLikeEntityService {
    like = async (data: ICreateUserLikeEntityBody) => {
        const userLikeEntity = await userLikeEntityRepository.findOne({
            where: {
                userId: data.userId,
                entityType: data.entityType,
                entityId: data.entityId,
            },
        });

        if (userLikeEntity) {
            throw new ApiError(httpStatus.CONFLICT, httpStatus["409"]);
        }

        const newUserLikeEntity = await userLikeEntityRepository.create({
            userId: data.userId,
            entityType: data.entityType,
            entityId: data.entityId,
        });

        await userLikeEntityRepository.save(newUserLikeEntity);

        if (data.entityType === UserLikeEntityTypes.Post) {
            await postService.increaseLikeCount(JSON.stringify(data.entityId));
        } else if (data.entityType === UserLikeEntityTypes.Comment) {
            await commnetService.increaseLikeCount(
                JSON.stringify(data.entityId)
            );
        }

        return newUserLikeEntity;
    };

    unLike = async (data: IDislike) => {
        const userLikeEntity = await userLikeEntityRepository.findOne({
            where: {
                userId: data.userId,
                entityType: data.entityType,
                entityId: data.entityId,
            },
        });

        if (!userLikeEntity) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await userLikeEntityRepository.delete({
            id: userLikeEntity.id,
        });

        if (data.entityType === UserLikeEntityTypes.Post) {
            await postService.decreaseLikeCount(JSON.stringify(data.entityId));
        } else if (data.entityType === UserLikeEntityTypes.Comment) {
            await commnetService.decreaseLikeCount(
                JSON.stringify(data.entityId)
            );
        }

        return true;
    };
}

export default new UserLikeEntityService();
