import { Response } from "express";

const ResponseHelper = {
    response(res: Response, code: number, message: String, data: Object) {
        return res.status(code).send({
            message,
            ...data,
        });
    },
};

export default ResponseHelper;
