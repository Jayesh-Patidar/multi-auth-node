import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import ResponseHelper from "../helpers/response.helper";
import { UserInterface } from "../interfaces/user.interface";
import ResponseConstants from "../constants/response.constant";

const UserController = {
    async profile(req: Request, res: Response) {
        try {
            let user: UserInterface | null = await UserModel.findOne({
                _id: req.params.id,
            }).select({
                password: 0,
            });

            return ResponseHelper.response(
                res,
                ResponseConstants.OK_RESPONSE,
                "Profile fetched successfully!",
                {
                    user,
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

    async update(req: Request, res: Response) {
        try {
            let {
                firstName,
                lastName,
                password,
                newPassword,
                highestEducation,
                institute,
                passingYear,
            } = req.body;
            let user: UserInterface | null = await UserModel.findOne({
                _id: req.params.id,
            });

            if (user) {
                console.log(user);

                if (bcrypt.compareSync(password, user.password)) {
                    user.firstName = firstName;
                    user.lastName = lastName;
                    user.password =
                        newPassword !== ""
                            ? bcrypt.hashSync(password, 10)
                            : user.password;
                    user.highestEducation = highestEducation;
                    user.institute = institute;
                    user.passingYear = passingYear;

                    user.password = "";

                    return ResponseHelper.response(
                        res,
                        ResponseConstants.OK_RESPONSE,
                        "User profile updated!",
                        {
                            user,
                        }
                    );
                }

                user.password = "";

                return ResponseHelper.response(
                    res,
                    ResponseConstants.UNAUTHORIZED_RESPONSE,
                    "Invalid credentials!",
                    {
                        user,
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
};

export default UserController;
