import AppDataSource from "../db/dataSource";
import UserRelationship from "../entities/userRalationship.entity";

const UserRelationshipRepository =
    AppDataSource.getRepository(UserRelationship);

export default UserRelationshipRepository;
