import { NextFunction, Request, Response } from "express";
import { Rules } from "validatorjs";
import ValidationMiddleware from "../middlewares/validation.middleware";

const rules: Rules = {
    firstName: "required|string",
    lastName: "required|string",
    password: "required|string|min:6",
    newPassword: "string|min:6",
    highestEducation: "string",
    institute: "string",
    passingYear: "string",
};

export default (req: Request, res: Response, next: NextFunction) =>
    ValidationMiddleware(req, res, next, rules, {});
