import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueUserInvitationTable1700489568449
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE UserRelationships
            ADD CONSTRAINT unique_user_invitation UNIQUE (userId, targetUserId);
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE UserRelationships
            DROP INDEX unique_user_invitation;
`);
    }
}
