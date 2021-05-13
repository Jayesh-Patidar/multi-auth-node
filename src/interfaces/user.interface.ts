import { Document } from "mongoose";

export interface UserInterface extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    highestEducation: string;
    institute: string;
    passingYear: string;
}
