import { BaseModel } from "./BaseModel";
import { Product } from "./Product";

export interface Cart extends BaseModel {
    cardItems: CartItem[];
}

export interface CartItem extends BaseModel {
    quantity: number;
    product_id: string;
    user_id: string;
    product: Product
}