import { DataSource } from "typeorm";

import config from "../config";

const AppDataSource = new DataSource({
    type: config.db.type,
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    entities: ["build/entities/*.js"],
    migrations: ["build/db/migrations/*.js"],
    migrationsTableName: "migrations",
    synchronize: false,
});

export default AppDataSource;
