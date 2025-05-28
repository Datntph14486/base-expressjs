import AppDataSource from "../db/dataSource";
import File from "../entities/file.entity";

const fileRepository = AppDataSource.getRepository(File);

export default fileRepository;
