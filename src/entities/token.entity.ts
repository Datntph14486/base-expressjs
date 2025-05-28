import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("Tokens")
class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    expiredAt: Date;

    @Column()
    type: string;

    @Column()
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Token;
