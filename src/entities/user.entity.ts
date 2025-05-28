import bcrypt from "bcrypt";
import slugify from "slugify";
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import AppDataSource from "../db/dataSource";
import generateRandomStr from "../utils/generateRandomStr";
import encryptPassword from "../utils/encryptPassword";

@Entity("Users")
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    fullName: string;

    @Column()
    username: string;

    @Column()
    gender: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    generateFullName() {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }

    @BeforeInsert()
    _encryptPassword() {
        this.password = encryptPassword(this.password);
    }

    @BeforeInsert()
    async createUsername() {
        let username = slugify(
            `${this.firstName} ${this.lastName}`,
            "-"
        ).toLowerCase();

        const user = await AppDataSource.manager.findOne(User, {
            where: {
                username,
            },
        });

        if (user) {
            username += `-${generateRandomStr(6)}`;
        }

        this.username = username;
    }
}

export default User;
