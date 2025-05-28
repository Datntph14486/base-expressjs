export enum UserLikeEntityTypes {
    Post = "Post",
    Comment = "Comment",
}

export interface ICreateUserLikeEntityBody {
    userId: number;
    entityType: UserLikeEntityTypes;
    entityId: number;
}

export interface IDislike extends Partial<ICreateUserLikeEntityBody> {}
