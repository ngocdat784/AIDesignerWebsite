import { CartItem } from "./cart-item";

export interface Cart {
  items: CartItem[];

  subtotal: number;

  discount: number;

  total: number;
}