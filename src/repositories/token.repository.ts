import AppDataSource from "../db/dataSource";
import Token from "../entities/token.entity";

const tokenRepository = AppDataSource.getRepository(Token);

export default tokenRepository;
