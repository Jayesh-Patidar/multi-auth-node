import { NextFunction, Request, Response } from "express";
import { Rules } from "validatorjs";
import ValidationMiddleware from "../middlewares/validation.middleware";

const rules: Rules = {
    firstName: "required|string",
    lastName: "required|string",
    userName: "required|string|unique:users,userName",
    password: "required|string",
};

export default (req: Request, res: Response, next: NextFunction) =>
    ValidationMiddleware(req, res, next, rules, {});
