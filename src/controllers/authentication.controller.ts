import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { UserInterface } from "../interfaces/user.interface";
import ResponseHelper from "../helpers/response.helper";
import ResponseConstants from "../constants/response.constant";
import AuthenticationHelper from "../helpers/authentication.helper";

const AuthenticationController = {
    async signup(req: Request, res: Response) {
        try {
            let { firstName, lastName, userName, password } = req.body;

            let user: UserInterface = await UserModel.create({
                firstName,
                lastName,
                userName,
                password: bcrypt.hashSync(password, 10),
            });

            user.password = "";
            return ResponseHelper.response(
                res,
                ResponseConstants.CREATED_RESPONSE,
                "Signup successful!",
                {
                    user,
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
                        "Invalid credentials!",
                        {
                            user: null,
                        }
                    );
                }

                user.password = "";
                return ResponseHelper.response(
                    res,
                    ResponseConstants.OK_RESPONSE,
                    "Login successful!",
                    {
                        user,
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
                "User not found!",
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

    async refreshToken(req: Request, res: Response) {
        try {
            let userId = AuthenticationHelper.decodeRefreshToken(
                req.body.refreshToken
            );

            let user: UserInterface | null = await UserModel.findOne({
                _id: userId,
            });

            if (user) {
                return ResponseHelper.response(
                    res,
                    ResponseConstants.OK_RESPONSE,
                    "Access token refreshed successfully!",
                    {
                        accessToken:
                            AuthenticationHelper.generateAccessToken(user),
                    }
                );
            }

            return ResponseHelper.response(
                res,
                ResponseConstants.NOT_FOUND_RESPONSE,
                "User not found!",
                {
                    accessToken: null,
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

export default AuthenticationController;
