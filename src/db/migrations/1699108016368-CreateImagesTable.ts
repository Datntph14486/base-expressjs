import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImagesTable1699108016368 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE Files (
                id INT NOT NULL AUTO_INCREMENT,
                entityType VARCHAR(100) NOT NULL,
                entityId INT NOT NULL,
                publicId VARCHAR(255) NOT NULL,
                path VARCHAR(255) NOT NULL,
                type VARCHAR(100) NOT NULL,
                metadata TEXT NOT NULL,

                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                PRIMARY KEY (id),
                KEY idx_entityType_entityId_images (entityType, entityId)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE Files;
        `);
    }
}
