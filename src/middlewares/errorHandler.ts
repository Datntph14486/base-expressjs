import { NextFunction, Request, Response } from "express";

import ApiError from "../utils/ApiError";

function errorHandler(
    error: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // console.log("🚀 ~ error:", error);
    return res.status(error.statusCode).json({
        error: error.message,
        detail: error.detail,
    });
}

export default errorHandler;
