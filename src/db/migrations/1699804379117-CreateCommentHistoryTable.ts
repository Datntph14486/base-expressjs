import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentHistoryTable1699804379117
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE CommentHistories (
                id INT NOT NULL AUTO_INCREMENT,
                commentId INT NOT NULL,
                userId INT NOT NULL,
                entityType VARCHAR (100) NOT NULL,
                entityId INT NOT NULL,
                likeCount INT NOT NULL DEFAULT 0,
                content TEXT NULL,
                hasImage INT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                PRIMARY KEY (id),
                FOREIGN KEY (commentId) REFERENCES Comments(id) ON DELETE CASCADE
            );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE CommentHistories;
`);
    }
}
