import AppDataSource from "../db/dataSource";
import CommentHistory from "../entities/commentHistory.entity";

const commentHistoryRepository = AppDataSource.getRepository(CommentHistory);

export default commentHistoryRepository;
