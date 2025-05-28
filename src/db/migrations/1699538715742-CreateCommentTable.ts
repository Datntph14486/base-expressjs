import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentTable1699542978310 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE Comments (
                id INT NOT NULL AUTO_INCREMENT,
                userId INT NOT NULL,
                entityType VARCHAR (100) NOT NULL,
                entityId INT NOT NULL,
                likeCount INT NOT NULL DEFAULT 0,
                content TEXT NULL,
                hasImage INT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                PRIMARY KEY (id),
                FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
            );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                DROP TABLE Comments;
    `);
    }
}
