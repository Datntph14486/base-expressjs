export interface ICreateUserRelationship {
    userId: number;
    targetUserId: number;
    isFollowed: boolean;
    isFriended: boolean;
    isBlocked: boolean;
}

export interface IUpdateUserRelationship
    extends Partial<ICreateUserRelationship> {}
