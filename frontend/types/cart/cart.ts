import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

import type { CartItem } from "./cart-item";

// =========================================================
// CART
// =========================================================

export interface Cart {
  items: CartItem[];

  subtotal: number;

  discount: number;

  total: number;
}

// =========================================================
// CART CONTEXT
// =========================================================

export interface CartContextType {
  // =======================================================
  // STATE
  // =======================================================

  items: CartItem[];

  itemCount: number;

  subtotal: number;

  discount: number;

  total: number;

  // =======================================================
  // COMMANDS
  // =======================================================

  /**
   * Thêm Template vào Cart.
   *
   * styleId:
   * - ID style user chọn
   * - null/undefined = dùng style mặc định
   */
  add(
    template: MarketplaceTemplate,
    styleId?: string | null
  ): void;

  /**
   * Xóa Template khỏi Cart.
   *
   * Có styleId:
   * → chỉ xóa Template + Style tương ứng.
   *
   * Không truyền styleId:
   * → xóa toàn bộ Template.
   */
  remove(
    templateId: string,
    styleId?: string | null
  ): void;

  /**
   * Xóa toàn bộ Cart.
   */
  clear(): void;

  /**
   * Tăng quantity của Template + Style.
   */
  increase(
    templateId: string,
    styleId?: string | null
  ): void;

  /**
   * Giảm quantity của Template + Style.
   *
   * Nếu quantity = 1:
   * → xóa item.
   */
  decrease(
    templateId: string,
    styleId?: string | null
  ): void;

  // =======================================================
  // QUERY
  // =======================================================

  /**
   * Kiểm tra Template + Style đã có trong Cart chưa.
   */
  isInCart(
    templateId: string,
    styleId?: string | null
  ): boolean;
}