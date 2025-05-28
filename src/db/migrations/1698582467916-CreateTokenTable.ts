import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTokenTable1698582467916 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE Tokens (
                id INT NOT NULL AUTO_INCREMENT,
                token VARCHAR(255) NOT NULL UNIQUE,
                expiredAt DATETIME NOT NULL,
                type VARCHAR(100) NOT NULL,
                userId INT,

                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                PRIMARY KEY (id),
                FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE INDEX idx_type_tokens ON Tokens(type);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE Tokens;
        `);
    }
}
