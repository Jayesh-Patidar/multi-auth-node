import mongoose, { CallbackError } from "mongoose";
import Environment from "./environment";

const HOST: string = Environment.DB.HOST;
const PORT: number = Environment.DB.PORT;
const AUTH: string = Environment.DB.AUTH;
const DATABASE: string = Environment.DB.DATABASE;
const USERNAME: string = Environment.DB.USERNAME;
const PASSWORD: string = Environment.DB.PASSWORD;

let URI = `${HOST}:${PORT}/${DATABASE}`;
if (USERNAME !== "" && PASSWORD !== "") {
    URI = `${USERNAME}:${encodeURIComponent(PASSWORD)}@${URI}`;
}

mongoose
    .connect(`mongodb://${URI}?authSource=${AUTH}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((e) => {
        console.log(`Database connect at host ${HOST}, port ${PORT}`);
    })
    .catch((e: CallbackError) => {
        if (e) console.log(e.toString());
    });
