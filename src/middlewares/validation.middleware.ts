import Mongoose from "mongoose";
import ResponseHelper from "../helpers/response.helper";
import { NextFunction, Request, Response } from "express";
import Validator, { Rules, ErrorMessages } from "validatorjs";
import ResponseConstants from "../constants/response.constant";

let request: Request | null = null;

Validator.registerAsync(
    "unique",
    (
        value: string | number | boolean,
        args: string,
        attribute: string,
        passes
    ) => {
        try {
            let [collectionName, keyName] = args.split(",");
            keyName = keyName || attribute;
            Mongoose.connection.db.collection(
                collectionName,
                (err, collection) => {
                    if (err) {
                        passes(false, err.toString());
                    }
                    collection
                        .findOne({
                            _id: {
                                $ne: Mongoose.Types.ObjectId(
                                    request?.params.id
                                ),
                            },
                            [keyName]: value,
                        })
                        .then((result) =>
                            result
                                ? passes(
                                      false,
                                      `${attribute} already present in ${collectionName} collection`
                                  )
                                : passes(true)
                        )
                        .catch((e) => passes(false, e.toString()));
                }
            );
        } catch (e) {
            passes(false, e.toString());
        }
    },
    ""
);

export default (
    req: Request,
    res: Response,
    next: NextFunction,
    rules: Rules,
    message: ErrorMessages
) => {
    const validation = new Validator(req.body, rules, message);
    validation.passes(() => next());
    validation.fails(() => {
        return ResponseHelper.response(
            res,
            ResponseConstants.BAD_REQUEST_RESPONSE,
            "Invalid request parameters!",
            {
                error: validation.errors.all(),
            }
        );
    });
};
