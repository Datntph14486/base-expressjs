import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueUserRelationshipTable1700489465071
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE UserRelationships
            ADD CONSTRAINT unique_user_relationship UNIQUE (userId, targetUserId);
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE UserRelationships
            DROP INDEX unique_user_relationship;
`);
    }
}
