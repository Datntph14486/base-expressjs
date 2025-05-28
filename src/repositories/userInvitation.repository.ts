import AppDataSource from "../db/dataSource";
import UserInvitation from "../entities/userInvitation.entity";

const UserInvitationRepository = AppDataSource.getRepository(UserInvitation);

export default UserInvitationRepository;
