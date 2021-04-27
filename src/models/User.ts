import { BaseModel } from "./BaseModel";

export interface User extends BaseModel {
    username: string;
    password: string;
    email: string;
    phone?: string;
}