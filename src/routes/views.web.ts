import Environment from "../environment";
import express, { Request, Response } from "express";

const router = express.Router();

const BASE_URL = `${Environment.APP.SCHEME}://${Environment.APP.HOST}:${Environment.APP.PORT}`;
router.get("/login", (req: Request, res: Response) => {
    return res.render("login", {
        BASE_URL,
    });
});

router.get("/signup", (req: Request, res: Response) => {
    return res.render("signup", {
        BASE_URL,
    });
});

router.get("/dashboard", (req: Request, res: Response) => {
    return res.render("dashboard", {
        BASE_URL,
    });
});

export default router;
