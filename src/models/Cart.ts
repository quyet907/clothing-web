import { BaseModel } from "./BaseModel";

export interface Cart extends BaseModel {
    cardItems: CartItem[];
}

export interface CartItem extends BaseModel {
    quantity: number;
}