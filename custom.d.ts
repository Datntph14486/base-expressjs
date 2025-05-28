import User from "./src/entities/user.entity";

declare global {
    namespace Express {
        export interface Request {
            user: User;
            files: Array<Express.Multer.File>;
        }
    }
}
