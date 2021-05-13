import { NextFunction, Request, Response } from "express";
import { Rules } from "validatorjs";
import ValidationMiddleware from "../middlewares/validation.middleware";

const rules: Rules = {
    firstName: "required|string",
    lastName: "required|string",
    userName: "required|string|unique:users,userName",
    password: "required|string|min:6",
};

export default (req: Request, res: Response, next: NextFunction) =>
    ValidationMiddleware(req, res, next, rules, {});
