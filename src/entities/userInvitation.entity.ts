import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { UserInvationStatus } from "../interfaces/userInvitation";
import User from "./user.entity";

@Entity("UserInvitations")
class UserInvitation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    targetUserId: number;

    @Column()
    status: UserInvationStatus;

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

export default UserInvitation;
