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

    splitToken(accessToken: string) {
        return accessToken.split(/ /g);
    },

    isValidBearerToken(accessToken: string) {
        let [bearer, token] = this.splitToken(accessToken);
        if (!bearer.includes("Bearer")) {
            return false;
        }
        if (!token || token === "") {
            return false;
        }
        return true;
    },

    decodeJWTToken(accessToken: string) {
        try {
            let JWTToken = this.splitToken(accessToken)[1];
            return JWT.verify(JWTToken, Environment.SECRET.JWT);
        } catch (e) {
            return e.toString();
        }
    },

    isValidAccessToken(accessToken: string) {
        if (!this.isValidBearerToken(accessToken)) {
            return false;
        }

        return true;
    },

    generateRefreshToken(user: UserInterface) {
        return CryptoJS.AES.encrypt(
            user._id.toString(),
            Environment.SECRET.REFRESH
        ).toString();
    },

    decodeRefreshToken(refreshToken: string) {
        return CryptoJS.AES.decrypt(
            refreshToken,
            Environment.SECRET.REFRESH
        ).toString(CryptoJS.enc.Utf8);
    },

    isValidRefreshToken(refreshToken: string) {
        let message = this.decodeRefreshToken(refreshToken);

        if (!message) {
            return false;
        }

        if (message === "") {
            return false;
        }

        return true;
    },
};

export default AuthenticationHelper;
