import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

import type { CartItem } from "./cart-item";

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

  add(template: MarketplaceTemplate): void;

  remove(templateId: string): void;

  clear(): void;

  increase(templateId: string): void;

  decrease(templateId: string): void;

  isInCart(templateId: string): boolean;
}