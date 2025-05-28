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
import User from "./user.entity";
import File from "./file.entity";

@Entity("Comments")
class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    entityType: CommentEntityTypes;

    @Column()
    entityId: number;

    @Column()
    userId: number;

    @Column()
    likeCount: number;

    @Column()
    commentCount: number;

    @Column()
    content: string;

    @Column()
    hasImage: boolean;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    owner: User;

    replies: Comment[];

    files: File[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Comment;
