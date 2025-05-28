import AppDataSource from "../db/dataSource";
import UserLikeEntity from "../entities/userLikeEntity.entity";

const UserLikeEntityRepository = AppDataSource.getRepository(UserLikeEntity);

export default UserLikeEntityRepository;
