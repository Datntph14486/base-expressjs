import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { PostType, PostVisibility } from "../interfaces/post";
import User from "./user.entity";
import File from "./file.entity";

@Entity("Posts")
class Post {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    content: string;

    @Column()
    type: PostType;

    @Column()
    likeCount: number;

    @Column()
    shareCount: number;

    @Column()
    commentCount: number;

    @Column()
    visibility: PostVisibility;

    @Column()
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    owner: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    files: File[];
}

export default Post;
