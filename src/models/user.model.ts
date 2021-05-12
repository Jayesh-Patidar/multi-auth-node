import { model, Schema, Model, Document } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";

const UserSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        userName: {
            type: String,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<UserInterface> = model("User", UserSchema);

export default User;
