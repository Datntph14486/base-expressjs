export enum CommentEntityTypes {
    Post = "post",
    Comment = "comment",
}

export interface iCreateComment {
    entityType: CommentEntityTypes;
    entityId: number;
    userId: number;
    content: string;
    hasImage: boolean;
}

export interface IUpdateComment extends Partial<iCreateComment> {}
