import express from "express";
import loginRequest from "../requests/login.request";
import signupRequest from "../requests/signup.request";
import AuthenticationController from "../controllers/authentication.controller";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";

const router = express.Router();

router.post("/login", loginRequest, AuthenticationController.login);
router.post("/signup", signupRequest, AuthenticationController.signup);
router.post(
    "/refresh-token",
    AuthenticationMiddleware.validRefreshToken,
    AuthenticationController.refreshToken
);

export default router;
