import User from "../entities/user.entity";

export enum PostType {
    Normal = "normal",
    Share = "share",
}

export enum PostVisibility {
    Public = "public",
    Private = "private",
    Friend = "friend",
}

export interface ICreatePostBody {
    content: string;
    type: PostType;
    visibility: PostVisibility;
    userId: number;
}

export interface IUpdatePostBody extends Partial<ICreatePostBody> {}
