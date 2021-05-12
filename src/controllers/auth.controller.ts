import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { UserInterface } from "../interfaces/user.interface";
import ResponseHelper from "../helpers/response.helper";
import ResponseConstants from "../constants/response.constant";
import AuthenticationHelper from "../helpers/authentication.helper";

const controller = {
    async signup(req: Request, res: Response) {
        try {
            let { firstName, lastName, userName, password } = req.body;

            let user: UserInterface = await UserModel.create({
                firstName,
                lastName,
                userName,
                password: bcrypt.hashSync(password, 10),
            });

            return ResponseHelper.response(
                res,
                ResponseConstants.CREATED_RESPONSE,
                "Signup successful",
                {
                    user: {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userName: user.userName,
                    },
                    accessToken: AuthenticationHelper.generateAccessToken(user),
                    refershToken:
                        AuthenticationHelper.generateRefreshToken(user),
                }
            );
        } catch (e) {
            return ResponseHelper.response(
                res,
                ResponseConstants.SERVER_ERROR_RESPONSE,
                ResponseConstants.SERVER_ERROR_MESSAGE,
                {
                    error: e.toString(),
                }
            );
        }
    },

    async login(req: Request, res: Response) {
        try {
            let { userName, password } = req.body;

            let user: UserInterface | null = await UserModel.findOne({
                userName,
            });

            if (user) {
                if (!bcrypt.compareSync(password, user.password)) {
                    return ResponseHelper.response(
                        res,
                        ResponseConstants.UNAUTHORIZED_RESPONSE,
                        "Invalid credentials",
                        {
                            user: null,
                        }
                    );
                }

                return ResponseHelper.response(
                    res,
                    ResponseConstants.OK_RESPONSE,
                    "Login successful",
                    {
                        user: {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userName: user.userName,
                        },
                        accessToken:
                            AuthenticationHelper.generateAccessToken(user),
                        refershToken:
                            AuthenticationHelper.generateRefreshToken(user),
                    }
                );
            }

            return ResponseHelper.response(
                res,
                ResponseConstants.NOT_FOUND_RESPONSE,
                "User not found",
                {
                    user: null,
                }
            );
        } catch (e) {
            return ResponseHelper.response(
                res,
                ResponseConstants.SERVER_ERROR_RESPONSE,
                ResponseConstants.SERVER_ERROR_MESSAGE,
                {
                    error: e.toString(),
                }
            );
        }
    },
};

export default controller;
