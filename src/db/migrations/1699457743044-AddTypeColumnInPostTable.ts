import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParentIdColumnInPostTable1699457743044
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Posts 
            ADD parentId INT AFTER content;
        `);

        await queryRunner.query(`
            ALTER TABLE Posts 
            ADD FOREIGN KEY (parentId) REFERENCES Posts(id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Posts 
            DROP FOREIGN KEY posts_ibfk_2;
        `);

        await queryRunner.query(`
            ALTER TABLE Posts 
            DROP COLUMN parentId;
        `);
    }
}
