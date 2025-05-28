import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnInPostTable1699972033521 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Posts 
            ADD commentCount INT AFTER shareCount;
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Posts 
            DROP COLUMN commentCount;
`);
    }
}
