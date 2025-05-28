import httpStatus from "http-status";
import UserRelationship from "../entities/userRalationship.entity";
import {
    ICreateUserRelationship,
    IUpdateUserRelationship,
} from "../interfaces/userRelationship";
import UserRelationshipRepository from "../repositories/userRelationship.repository";
import ApiError from "../utils/ApiError";
import { In } from "typeorm";

class UserRelationshipService {
    create = async (data: ICreateUserRelationship) => {
        const userRelationship = await UserRelationshipRepository.create({
            userId: data.userId,
            targetUserId: data.targetUserId,
            isFollowed: data.isBlocked,
            isFriended: data.isFriended,
            isBlocked: data.isBlocked,
        });

        await UserRelationshipRepository.save(userRelationship);

        return userRelationship;
    };

    update = async (id: number, data: IUpdateUserRelationship) => {
        const userRelationship = await UserRelationshipRepository.findOne({
            where: {
                id,
            },
        });

        if (!userRelationship) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await UserRelationshipRepository.update(
            { id: userRelationship.id },
            data
        );

        const newUserRelationship = await UserRelationshipRepository.findOne({
            where: {
                id: userRelationship.id,
            },
        });

        return newUserRelationship;
    };

    unFriend = async (userId: number, targetUserId: number) => {
        const userRelationships = await UserRelationshipRepository.find({
            where: [
                { userId: userId, targetUserId: targetUserId },
                { userId: targetUserId, targetUserId: userId },
            ],
        });

        if (!userRelationships) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await UserRelationshipRepository.delete({
            id: In(
                userRelationships.map((userRelationship) => userRelationship.id)
            ),
        });

        return true;
    };

    updateByUserIdAndTargetUserId = async (
        userId: number,
        targetUserId: number,
        data: IUpdateUserRelationship
    ) => {
        const userRelationship = await UserRelationshipRepository.findOne({
            where: {
                userId,
                targetUserId,
            },
        });

        if (!userRelationship) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await UserRelationshipRepository.update(
            { id: userRelationship.id },
            data
        );

        return true;
    };
}

export default new UserRelationshipService();
