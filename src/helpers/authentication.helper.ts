import JWT from "jsonwebtoken";
import CryptoJS from "crypto-js";
import Environment from "../environment";
import { UserInterface } from "../interfaces/user.interface";

const AuthenticationHelper = {
    generateAccessToken(user: UserInterface) {
        return JWT.sign(
            {
                _id: user._id,
            },
            Environment.SECRET.JWT,
            {
                expiresIn: 300,
            }
        );
    },

    generateRefreshToken(user: UserInterface) {
        return CryptoJS.AES.encrypt(
            user._id.toString(),
            Environment.SECRET.REFRESH
        ).toString();
    },
};

export default AuthenticationHelper;
