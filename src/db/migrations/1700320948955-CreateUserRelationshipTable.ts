import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRelationshipTable1700320948955
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE UserRelationships (
                id INT NOT NULL AUTO_INCREMENT,
                userId INT NOT NULL,
                targetUserId INT NOT NULL,
                isFollowed TINYINT  NOT NULL,
                isFriended TINYINT  NOT NULL,
                isBlocked TINYINT  NOT NULL,


                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                PRIMARY KEY (id),
                FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
                FOREIGN KEY (targetUserId) REFERENCES Users(id) ON DELETE CASCADE,
                INDEX idx_targetUserId_status (targetUserId, isFollowed),
                INDEX idx_targetUserId_isFollowed (targetUserId, isFriended),
                INDEX idx_userId_isFollowed (userId, isFollowed),
                INDEX idx_userId_isFriended (userId, isFriended)
            );
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE UserRelationships;
`);
    }
}
