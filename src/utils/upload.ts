import upload from "../multer";
import { Request, Response } from "express";

export const uploadMltiple = async (req: Request, res: Response) => {
    const uploadMiddleware = upload.array("files");

    return await new Promise((resolve, reject) => {
        uploadMiddleware(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};
