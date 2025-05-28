import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserLikeEntityTypes } from "../interfaces/userLikeEntity";

@Entity("UserLikeEntity")
class UserLikeEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userId: number;

    @Column()
    entityType: UserLikeEntityTypes;

    @Column()
    entityId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default UserLikeEntity;
