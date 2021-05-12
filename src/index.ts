import CORS from "cors";
import "./database.config";
import express from "express";
import auth from "./routes/auth.apis";
import Environment from "./environment";

const app = express();

app.use(CORS())
    .use(express.json())
    .use(express.urlencoded({ extended: true }));
app.use("/auth", auth);

app.listen(Environment.APP.PORT, () => {
    console.log(
        `Node server started ${Environment.APP.SCHEME}://${Environment.APP.HOST}:${Environment.APP.PORT}`
    );
});