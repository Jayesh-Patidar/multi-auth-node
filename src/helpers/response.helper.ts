import { Response } from "express";

const ResponseHelper = {
    response(
        res: Response,
        code: number,
        message: String,
        data: Object | null
    ) {
        return res.status(code).send({
            message,
            ...data,
        });
    },
};

export default ResponseHelper;
