import httpStatus from "http-status";
import { UserInvationStatus } from "../interfaces/userInvitation";
import UserInvitationRepository from "../repositories/userInvitation.repository";
import ApiError from "../utils/ApiError";
import UserRelationshipRepository from "../repositories/userRelationship.repository";
import userRelationshipService from "./userRelationship.service";

class UserInvitationService {
    friendRequest = async (userId: number, targetUserId: number) => {
        const userInvitation = await UserInvitationRepository.create({
            userId,
            targetUserId,
            status: UserInvationStatus.Pending,
        });

        const userRelationship = await userRelationshipService.create({
            userId: userInvitation.userId,
            targetUserId: userInvitation.targetUserId,
            isFollowed: true,
            isFriended: false,
            isBlocked: false,
        });

        await UserInvitationRepository.save(userInvitation);

        await UserRelationshipRepository.save(userRelationship);

        return userInvitation;
    };

    acceptRequest = async (
        id: number,
        userId: number,
        targetUserId: number
    ) => {
        const userInvitation = await UserInvitationRepository.findOne({
            where: {
                id,
                userId,
                targetUserId,
            },
        });

        if (!userInvitation) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await userRelationshipService.updateByUserIdAndTargetUserId(
            userInvitation.userId,
            userInvitation.targetUserId,
            {
                isFriended: true,
            }
        );

        await userRelationshipService.create({
            userId: userInvitation.targetUserId,
            targetUserId: userInvitation.userId,
            isFollowed: true,
            isFriended: true,
            isBlocked: false,
        });

        await this.destroy(userInvitation.id);

        return true;
    };

    rejectRequest = async (
        id: number,
        userId: number,
        targetUserId: number
    ) => {
        const userInvitation = await UserInvitationRepository.findOne({
            where: {
                id,
                userId,
                targetUserId,
            },
        });

        if (!userInvitation) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await UserInvitationRepository.update(
            { id: userInvitation.id },
            { status: UserInvationStatus.Reject }
        );

        return true;
    };

    destroy = async (id: number) => {
        const userInvitation = await UserInvitationRepository.findOne({
            where: {
                id,
            },
        });

        if (!userInvitation) {
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
        }

        await UserInvitationRepository.delete({ id: userInvitation.id });

        return true;
    };
}

export default new UserInvitationService();
