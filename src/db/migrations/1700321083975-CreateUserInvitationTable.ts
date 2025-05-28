import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserInvitationTable1700321083975
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE UserInvitations (
                id INT NOT NULL AUTO_INCREMENT,
                userId INT NOT NULL,
                targetUserId INT NOT NULL,
                status VARCHAR (100) NOT NULL,

                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                PRIMARY KEY (id),
                FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
                FOREIGN KEY (targetUserId) REFERENCES Users(id) ON DELETE CASCADE,
                INDEX idx_targetUserId_status (targetUserId, status)
            );
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE UserInvitations;
`);
    }
}
