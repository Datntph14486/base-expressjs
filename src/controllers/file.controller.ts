import { Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import fileService from "../services/file.service";

class FileController {
    destroy = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await fileService.destroy(id);

        return res.json({
            data,
        });
    });
}

export default new FileController();
