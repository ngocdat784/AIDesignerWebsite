import { Template } from "../template/template";
import { CartItem } from "./cart-item";

export interface Cart {
  items: CartItem[];

  subtotal: number;

  discount: number;

  total: number;
}
export interface CartContextType {
  items: CartItem[];

  itemCount: number;

  subtotal: number;

  discount: number;

  total: number;

  add(template: Template): void;

  remove(templateId: string): void;

  clear(): void;

  increase(templateId: string): void;

  decrease(templateId: string): void;

  isInCart(templateId: string): boolean;
}