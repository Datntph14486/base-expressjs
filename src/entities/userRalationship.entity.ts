import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import User from "./user.entity";

@Entity("UserRelationships")
class UserRelationship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    targetUserId: number;

    @Column()
    isFollowed: Boolean;

    @Column()
    isFriended: Boolean;

    @Column()
    isBlocked: Boolean;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: "targetUserId" })
    receiver: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default UserRelationship;
