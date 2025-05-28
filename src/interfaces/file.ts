export enum FileEntityTypes {
    Post = "Post",
    User = "User",
    Comment = "comment",
}

export enum FileTypes {
    Video = "video",
    Image = "image",
}

export interface ImageMetadata {
    mimetype: string;
    version: number;
    width: number;
    height: number;
    filename: string;
    size: number;
}
