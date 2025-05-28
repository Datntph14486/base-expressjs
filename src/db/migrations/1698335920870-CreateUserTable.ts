import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1698335920870 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE Users (
                id INT NOT NULL AUTO_INCREMENT,
                email VARCHAR(255) NOT NULL UNIQUE,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                fullName VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL UNIQUE,
                gender VARCHAR(10) NOT NULL,
                dateOfBirth DATE NOT NULL,
                password VARCHAR(255) NOT NULL,


                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE Users;
        `);
    }
}
