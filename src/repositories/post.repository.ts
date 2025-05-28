import AppDataSource from "../db/dataSource";
import Post from "../entities/post.entity";

const PostRepository = AppDataSource.getRepository(Post);

export default PostRepository;
