import AppDataSource from "../db/dataSource";
import User from "../entities/user.entity";

const userRepository = AppDataSource.getRepository(User);

export default userRepository;
