import CORS from "cors";
import path from "path";
import "./database.config";
import express from "express";
import auth from "./routes/auth.apis";
import user from "./routes/user.api";
import views from "./routes/views.web";
import Environment from "./environment";

const app = express();

app.use(CORS())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs");

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/views", views);

app.listen(Environment.APP.PORT, () => {
    console.log(
        `Node server started ${Environment.APP.SCHEME}://${Environment.APP.HOST}:${Environment.APP.PORT}`
    );
});
