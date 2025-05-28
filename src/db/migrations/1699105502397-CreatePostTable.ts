import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1699105502397 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE Posts (
                id INT NOT NULL AUTO_INCREMENT,
                content TEXT NULL,
                type VARCHAR (100) NOT NULL DEFAULT 'normal',
                likeCount INT NOT NULL DEFAULT 0,
                shareCount INT NOT NULL DEFAULT 0,
                visibility VARCHAR(100) NOT NULL DEFAULT 'public',
                userId INT NOT NULL,

                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                PRIMARY KEY (id),
                FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE Posts;
        `);
    }
}
