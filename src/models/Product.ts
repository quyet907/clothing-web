import { BaseModel } from "./BaseModel";

export interface Product extends BaseModel {
    name: string;
    price: number;
    description: string;
    images: string[];
}

