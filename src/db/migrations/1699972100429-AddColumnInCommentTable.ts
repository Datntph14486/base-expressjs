import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnInCommentTable1699972100429
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Comments 
            ADD commentCount INT AFTER likeCount;
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Comments 
            DROP COLUMN commentCount;
`);
    }
}
