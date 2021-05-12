import ResponseHelper from "../helpers/response.helper";
import { Request, Response, NextFunction } from "express";
import ResponseConstants from "../constants/response.constant";
import AuthenticationHelper from "../helpers/authentication.helper";

const AuthenticationMiddleware = {
    isAuthorized(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization || req.headers.authorization === "") {
            return ResponseHelper.response(
                res,
                ResponseConstants.UNAUTHORIZED_RESPONSE,
                "Token not found!",
                null
            );
        }

        if (
            !AuthenticationHelper.isValidAccessToken(req.headers.authorization)
        ) {
            return ResponseHelper.response(
                res,
                ResponseConstants.UNAUTHORIZED_RESPONSE,
                "Bearer token not found!",
                null
            );
        }

        let payload = AuthenticationHelper.decodeJWTToken(
            req.headers.authorization
        );
        if (typeof payload !== "object") {
            return ResponseHelper.response(
                res,
                ResponseConstants.UNAUTHORIZED_RESPONSE,
                "Unauthorized!",
                {
                    error: payload,
                }
            );
        }

        next();
    },

    validRefreshToken(req: Request, res: Response, next: NextFunction) {
        if (!AuthenticationHelper.isValidRefreshToken(req.body.refreshToken)) {
            return ResponseHelper.response(
                res,
                ResponseConstants.UNAUTHORIZED_RESPONSE,
                "Invalid refresh token!",
                {
                    accessToken: null,
                }
            );
        }

        return next();
    },
};

export default AuthenticationMiddleware;
