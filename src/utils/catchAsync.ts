import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import ApiError from "./ApiError";

const catchAsync =
    (fn: any) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err: ApiError | Error) => {
            if (!(err instanceof ApiError)) {
                next(
                    new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message)
                );
            }
            return next(err);
        });
    };

export default catchAsync;
