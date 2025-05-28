import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { CommentEntityTypes } from "../interfaces/comment";
import Comment from "./comment.entity";
import File from "./file.entity";

@Entity("CommentHistories")
class CommentHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentId: number;

    @Column()
    entityType: CommentEntityTypes;

    @Column()
    entityId: number;

    @Column()
    userId: number;

    @Column()
    likeCount: number;

    @Column()
    content: string;

    @Column()
    hasImage: boolean;

    files: File[];

    @ManyToOne(() => Comment)
    @JoinColumn({ name: "commentId" })
    currentComment: Comment;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default CommentHistory;
