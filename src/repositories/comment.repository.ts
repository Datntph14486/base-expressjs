import AppDataSource from "../db/dataSource";
import Comment from "../entities/comment.entity";

const commentRepositoty = AppDataSource.getRepository(Comment);

export default commentRepositoty;
