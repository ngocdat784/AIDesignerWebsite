import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

import type { CartItem } from "./cart-item";

export interface Cart {
  items: CartItem[];

  subtotal: number;

  discount: number;

  total: number;
}

export interface CartContextType {
  // =========================
  // State
  // =========================

  items: CartItem[];

  itemCount: number;

  subtotal: number;

  discount: number;

  total: number;

  // =========================
  // Commands
  // =========================

  add(
    template: MarketplaceTemplate,
    styleId?: string | null,
  ): void;

  remove(
    templateId: string,
  ): void;

  clear(): void;

  increase(
    templateId: string,
  ): void;

  decrease(
    templateId: string,
  ): void;

  // =========================
  // Query
  // =========================

  isInCart(
    templateId: string,
    styleId?: string | null,
  ): boolean;
}