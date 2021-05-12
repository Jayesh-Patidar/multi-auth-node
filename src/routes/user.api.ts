import express from "express";
import UserController from "../controllers/user.controller";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";
import updateProfileRequest from "../requests/update-profile.request";

const router = express.Router();

router.get(
    "/profile/:id",
    AuthenticationMiddleware.isAuthorized,
    UserController.profile
);
router.patch(
    "/update/:id",
    updateProfileRequest,
    AuthenticationMiddleware.isAuthorized,
    UserController.update
);

export default router;
